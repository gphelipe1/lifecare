import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Popconfirm, Space, Table, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getAllRecords, removeRecord, saveRecord, updateRecord } from '../../Services/recordsService';
import { isAuthenticated } from '../../Services/auth';
import { Role } from '../../Types/Usertypes';
import { RecordType } from '../../Types';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons';
import * as Styled from './styles';
import { NewAdminForm, NewRecordForm } from '../../Components';
import { DynamicObject } from '../../Types/Generic';
import { ColumnType } from 'antd/es/table';
import { createAdminUser } from '../../Services/userService';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
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
              required: !(title === 'Address' || title === 'Description')  ,
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
    const [openAdminModal, setOpenAdminModal] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const [searchedColumn, setSearchedColumn] = useState<string>();
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

    const updateData = async (record: RecordType.Record) => {
        const response = await updateRecord(record);

        console.log(response);
        if (response)
        {
            setRecords([]);
            getData();
        }
    }

    const onCancel = () => {
        setOpenModal(false);
    };

    const onCancelAddAdmin = () => {
      setOpenAdminModal(false);
    }

    const storeRecord = async (values: RecordType.Record) => {
        setLoading(true);
        setOpenModal(false);

        const response = await saveRecord(values.name, values.cpf, values.phone,values.address, values.description);

        setRecords(data => [...data, response]);
        setLoading(false);
    };

    const createAdmin = async (acc: DynamicObject) => {
      const response = await createAdminUser(acc);
      
      setOpenAdminModal(false);
      setLoading(false);
  };

    const isEditing = (record: RecordType.Record) => record.id === editingKey;

    const edit = (record: Partial<RecordType.Record> & { id: React.Key }) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.id);
    };

    const remove = async (recordId: number) => {
      setLoading(true);
      const removed = await removeRecord(recordId);

      if (removed)
      {
        setRecords([]);
        getData();
      }
  };

    const cancel = () => {
    setEditingKey(undefined);
    };

    const save = async (key: React.Key) => {
        setLoading(true);
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
                setEditingKey(undefined);
                updateData(newData[index]);

            } else {
                newData.push(row);
                setRecords(newData);
                setEditingKey(undefined);
            }
        } catch (errInfo) {
            setLoading(false);
            return errInfo;
        }
    };

    const getColumnSearchProps = (dataIndex: string) => {
      
        const handleSearch = (
            selectedKeys: React.Key[],
            confirm: () => void
          ) => {
            confirm();
            setSearchText(selectedKeys[0].toString());
          };
        
          const handleReset = (clearFilters: () => void) => {
            clearFilters();
            setSearchText('');
            setRecords(records);
          };
        
          return {
            filterDropdown: ({
              setSelectedKeys,
              selectedKeys,
              confirm,
              clearFilters,
            }: {
              setSelectedKeys: (selectedKeys: React.Key[]) => void;
              selectedKeys: React.Key[];
              confirm: () => void;
              clearFilters: () => void;
            }) => (
              <div style={{ padding: 8 }}>
                <Input
                  placeholder={`Search ${dataIndex}`}
                  value={selectedKeys[0]}
                  onChange={(e) =>
                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                  }
                  onPressEnter={() => handleSearch(selectedKeys, confirm)}
                  style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                  <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                  >
                    Search
                  </Button>
                  <Button
                    onClick={() => handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                  >
                    Reset
                  </Button>
                </Space>
              </div>
            ),
            filterIcon: (filtered: boolean) => (
              <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ),
            onFilter: (value: string | number | boolean, record: DynamicObject) =>
              record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toString().toLowerCase())
                : '',
            onFilterDropdownVisibleChange: (visible: boolean) => {
              if (visible) {
                setSearchedColumn(dataIndex);
              }
            },
            filteredValue: searchedColumn === dataIndex ? [searchText] : undefined,
            render: (text: string) =>
            searchedColumn === dataIndex ? text : text,
          };
    };

    const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        width: '10%',
        sorter: (a: DynamicObject, b: DynamicObject) => a.id - b.id,
        ...getColumnSearchProps('id'),

    },
    {
        title: 'Name',
        dataIndex: 'name',
        width: '25%',
        editable: true,
        
        ...getColumnSearchProps('name'),
    },
    {
        title: 'CPF',
        dataIndex: 'cpf',
        width: '15%',
        editable: true,
        ...getColumnSearchProps('cpf'),
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        width: '15%%',
        editable: true,
        ...getColumnSearchProps('phone'),
    },
    {
        title: 'Address',
        dataIndex: 'address',
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
        title: 'Actions',
        dataIndex: 'actions',
        render: (_: DynamicObject, record: RecordType.Record) => {
            const editable = isEditing(record);

            return editable ? (
                <Styled.ActionsContainer>
                    <Popconfirm title="Do you confirm you want to save?" onConfirm={() => save(record.id)}>
                            <CheckCircleOutlined style={{color: 'green'}} />
                        </Popconfirm>
                    <Popconfirm title="Do you confirm you want to cancel?" onConfirm={cancel}>
                        <CloseCircleOutlined style={{color: 'red'}}  />
                    </Popconfirm>
                </Styled.ActionsContainer>
            ) : (
                <Styled.ActionsTableContainer>
                  <Typography.Link disabled={editingKey !== undefined} onClick={() => edit(record)}>
                    <EditOutlined />
                  </Typography.Link>
                    <Popconfirm  icon={<ExclamationCircleFilled style={{color: "#ff4d4f"}} />} title="Do you confirm you want to delete?" disabled={editingKey !== undefined} onConfirm={() => remove(record.id)}>
                      <Typography.Link disabled={editingKey !== undefined} >
                        <DeleteOutlined />
                      </Typography.Link>
                    </Popconfirm>
                </Styled.ActionsTableContainer>

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

        <NewAdminForm onCancel={onCancelAddAdmin} onCreate={createAdmin} openModal={openAdminModal} /> 
        <NewRecordForm onCancel={onCancel} onCreate={storeRecord} openModal={openModal} /> 
        <Styled.AddButton onClick={() => setOpenModal(true)} type="primary">
            Add Record
        </Styled.AddButton>
        <Styled.NewAdminButton onClick={() => setOpenAdminModal(true)} type="primary">
            Create Administrator
        </Styled.NewAdminButton>
        <Form form={form} component={false}>
            <Table
            components={{
                body: {
                    cell: EditableCell,
                },
            }}
            loading={loading}
            dataSource={records}
            sortDirections={['descend']}
            columns={mergedColumns as ColumnType<RecordType.Record>[]}
            rowClassName="editable-row"
            pagination={{
                pageSize: 6,
                onChange: cancel,
            }}
            />
        </Form>
    </>
    );
};

export default AdminHome;