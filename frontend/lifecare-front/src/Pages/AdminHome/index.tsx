import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Modal, Popconfirm, Table, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getAllRecords } from '../../Services/recordsService';
import { isAuthenticated } from '../../Services/auth';
import { Role } from '../../Types/Usertypes';
import { RecordType } from '../../Types';
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined } from '@ant-design/icons';
import * as Styled from './styles';
import { NewRecordForm } from '../../Components';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: RecordType.Record;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const AdminHome: React.FC = () => {
    const [form] = Form.useForm();

    const [editingKey, setEditingKey] = useState<number>();
    const [loading, setLoading] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [records, setRecords] = useState<RecordType.Record[]>([]);

    const navigateTo = useNavigate();

    const getData = async () => {
        const response = await getAllRecords();

        if (response)
        {
            setRecords(response);
            setLoading(false);

            return;
        }

        if(response.has_error){
            return;
        }
    }

    const onAddRecord = () => {
        setOpenModal((modalValue) => !modalValue);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    const storeRecord = () => {
        setOpenModal(false);
    };

    const isEditing = (record: RecordType.Record) => record.id === editingKey;

    const edit = (record: Partial<RecordType.Record> & { id: React.Key }) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.id);
    };

    const cancel = () => {
    setEditingKey(undefined);
    };

    const save = async (key: React.Key) => {
    try {
        const row = (await form.validateFields()) as RecordType.Record;

        const newData = [...records];
        const index = newData.findIndex((item) => key === item.id);
        if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
                ...item,
                ...row,
            });
            setRecords(newData);
            setEditingKey(undefined);
        } else {
            newData.push(row);
            setRecords(newData);
            setEditingKey(undefined);
        }
    } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
    }
    };

    const columns = [
    {
        title: 'Picture',
        dataindex: 'imageFile',
        width: '25%',
    },
    {
        title: 'Id',
        dataIndex: 'id',
        width: '25%',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        width: '25%',
        editable: true,
    },
    {
        title: 'CPF',
        dataIndex: 'cpf',
        width: '15%',
        editable: true,
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        width: '25%%',
        editable: true,
    },
    {
        title: 'Address',
        dataIndex: 'Address',
        width: '40%%',
        editable: true,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        width: '40%%',
        editable: true,
    },
    {
        title: 'operation',
        dataIndex: 'operation',
        render: (_: any, record: RecordType.Record) => {
        const editable = isEditing(record);
        return editable ? (
            <Styled.ActionsContainer>
                <Popconfirm title="Do you confirm you want to save?" onConfirm={() => save(record.id)}>
                        <CheckCircleOutlined style={{color: 'green'}} />
                    </Popconfirm>
                <Popconfirm title="Are you sure you want to cancel?" onConfirm={cancel}>
                    <CloseCircleOutlined style={{color: 'red'}}  />
                </Popconfirm>
            </Styled.ActionsContainer>
        ) : (
            <Typography.Link disabled={editingKey !== undefined} onClick={() => edit(record)}>
                <EditOutlined />
            </Typography.Link>
        );
        },
    },
    ];

    const mergedColumns = columns.map((col) => {
    if (!col.editable) {
        return col;
    }
    return {
        ...col,
        onCell: (record: RecordType.Record) => ({
            record,
            inputType: col.dataIndex === 'id' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
        }),
    };
    });

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const { auth, role } = isAuthenticated();

        if (!auth) {
            navigateTo('/login');
        } else if (auth && role !== Role.Admin) {
            navigateTo('/user-home');
        }
    }, [navigateTo]);

    return (
    <>
        <Modal title="Add New Record" width={1000} open={openModal} onCancel={closeModal} onOk={storeRecord}>
            <NewRecordForm />   
        </Modal>
        <Styled.AddButton onClick={onAddRecord} type="primary">
            Add Record
        </Styled.AddButton>
        <Form form={form} component={false}>
            <Table
            components={{
                body: {
                cell: EditableCell,
                },
            }}
            loading={loading}
            dataSource={records}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
                onChange: cancel,
            }}
            />
        </Form>
    </>
    );
};

export default AdminHome;