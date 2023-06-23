import { Form, Input, Upload, UploadFile, UploadProps } from 'antd';
import * as Styled from './styles';
import { useState } from 'react';

const NewRecordForm: React.FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        console.log(fileList);
        setFileList(newFileList);
    };

    return(
        <>
            <Upload
                listType="picture-circle"
                fileList={fileList}
                onChange={onChange}
                accept='image/*'
            >
                {fileList.length < 1 && '+ Picture'}
            </Upload>
            <Form>
                <Styled.Container>
                    <Form.Item>
                        <Input type='text' placeholder='Name' />
                    </Form.Item>
                    <Form.Item>
                        <Input type='text' placeholder='CPF' />
                    </Form.Item>
                    <Form.Item>
                        <Input type='text' placeholder='Phone' />
                    </Form.Item>
                    <Form.Item>
                        <Input.TextArea maxLength={200} autoSize={{ minRows: 3, maxRows: 5 }} placeholder='Description' />
                    </Form.Item>
                    <Form.Item>
                        <Input type='text' placeholder='Address' />
                    </Form.Item>
                </Styled.Container>
            </Form>
        </>
    );
};

export default NewRecordForm;