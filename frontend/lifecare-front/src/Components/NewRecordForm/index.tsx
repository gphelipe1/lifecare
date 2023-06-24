import { Form, Input, Modal } from 'antd';
import * as Styled from './styles';
import { RecordType } from '../../Types';

interface NewRecordFormProps {
    openModal: boolean;
    onCreate: (values: RecordType.Record) => void;
    onCancel: () => void;
}

const NewRecordForm: React.FC<NewRecordFormProps> = ({ openModal, onCancel, onCreate }) => {

    const ruleMessage = (field: string): string => {
        return `The ${field} field is required`
    }

    const [form] = Form.useForm();

    return( 
      <Modal
        title="Add New Record"
        width={1000}
        open={openModal}
        onCancel={() => {
            form.resetFields();
            onCancel();
        }}
        okButtonProps={{htmlType: 'submit'}}
        onOk={() => form.validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch(() => {
              return;
            })}>

            <Form
                form={form}
                name="new_record_form"
                initialValues={{ modifier: 'public' }}
            >
                <Form.Item name="imageFile">
                    {/* <Upload
                        listType="picture-circle"
                        fileList={fileList}
                        onChange={onChange}
                        accept='image/*'
                    >
                        {fileList.length < 1 && '+ Picture'}
                    </Upload> */}
                </Form.Item>
                <Styled.Container>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: ruleMessage('Name') }]}
                    >
                            <Input type='text' placeholder='Name' />
                    </Form.Item>
                    <Form.Item
                        name="cpf"
                        label="CPF"
                        rules={[{ required: true, message: ruleMessage('CPF') }]}>
                            <Input type='text' placeholder='CPF' />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ required: true, message: ruleMessage('Phone') }]}>
                            <Input type='text' placeholder='Phone' />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description">
                            <Input.TextArea maxLength={200} autoSize={{ minRows: 3, maxRows: 5 }} placeholder='Description (Optional)' />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address">
                            <Input type='text' placeholder='Address (Optional)' />
                    </Form.Item>
                </Styled.Container>
            </Form>
        </Modal>
    );
};

export default NewRecordForm;