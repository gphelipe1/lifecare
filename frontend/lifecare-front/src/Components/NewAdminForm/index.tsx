import { Form, Input, Modal } from 'antd';
import * as Styled from './styles';
import { RecordType } from '../../Types';

interface NewAdminFormProps {
    openModal: boolean;
    onCreate: (values: RecordType.Record) => void;
    onCancel: () => void;
}

const NewAdminForm: React.FC<NewAdminFormProps> = ({ openModal, onCancel, onCreate }) => {

    const ruleMessage = (field: string): string => {
        return `The ${field} field is required`
    }

    const [form] = Form.useForm();

    return( 
      <Modal
        title="Add New Record"
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
                </Form.Item>
                <Styled.Container>
                    <Form.Item
                        name="Name"
                        label="Name"
                        rules={[{ required: true, message: ruleMessage('Name') }]}
                    >
                            <Input type='text' placeholder='Name' />
                    </Form.Item>
                    <Form.Item
                        name="CPF"
                        label="CPF"
                        rules={[{ required: true, message: ruleMessage('CPF') }]}>
                            <Input type='text' placeholder='CPF' />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: ruleMessage('Password') }]}>
                            <Input type='text' placeholder='Phone' />
                    </Form.Item>
                </Styled.Container>
            </Form>
        </Modal>
    );
};

export default NewAdminForm;