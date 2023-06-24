import { Avatar, Button, Card, List, Modal, Upload, UploadProps } from "antd"
import { RecordType } from "../../Types"
import { UploadOutlined, UserOutlined } from "@ant-design/icons"
import Text from 'antd/es/typography/Text';

import * as Styled from './styles';
import { RecordDetail } from "..";
import { getUserFile, getUserRecords, uploadFile } from "../../Services/userService";
import { useCallback, useEffect, useMemo, useState } from "react";
import { isAuthenticated } from "../../Services/auth";
import { Role } from "../../Types/Usertypes";
import { useNavigate } from "react-router-dom";
import { ServerResponse } from "../../Types/Generic";

const UserHome: React.FC = () => {
    const [records, setRecords] = useState<RecordType.Record[]>([]);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const navigateTo = useNavigate();

    const getData = async () => {
        const response = await getUserRecords();

        if (response)
        {
            setRecords(response);
            return;
        }

        if(response.has_error){
            return;
        }
    }

    const getUserImage = async () => {
        const url = await getUserFile();
        setImageUrl(url);
        setLoading(false);
    }

    const handleUpload = useCallback(async (file: File): Promise<ServerResponse | null> => {
        const formData = new FormData();
        formData.append('file', file);
    
        try
        {
            const response: ServerResponse = await uploadFile(formData);
            getUserImage();

            return response;
        } catch (error)
        {
            return null;
        }
    }, []);
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange: UploadProps['onChange'] = useCallback(async (info: { file: any; }) => {
        const { file } = info;
        setLoading(true);

        if (file.status === 'uploading') {
            handleUpload(file.originFileObj as File);
            file.status = 'done';
        }
    }, [handleUpload]);

    const AvatarControl = useMemo(() => {
        return(
            <Avatar
                style={{ alignSelf: 'center', marginBottom: '0.4rem' }}
                src={imageUrl ? (<img src={imageUrl}/>) : null}
                icon={!imageUrl ? <UserOutlined /> : null}
                alt={"Profile"}
                size={80}
                />
            );
    }, [imageUrl])

    useEffect(() => {
        getData();
        getUserImage();
    }, []);

    useEffect(() => {
        const { auth, role } = isAuthenticated();

        if (!auth) {
            navigateTo('/login');
        } else if (auth && role !== Role.User) {
            navigateTo('/home');
        }
    }, [navigateTo]);

    return (
        <div style={{
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Upload accept="image/*" onChange={handleChange} customRequest={() => {return;}} >
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            <List
                itemLayout="horizontal"
                dataSource={records}
                pagination={{
                    pageSize: 2,
                  }}
                renderItem={(item) => (
                <List.Item>
                    <Card loading={loading} style={{ width: '100%', marginTop: 16 }}>
                        {AvatarControl}
                            <Styled.CustomMeta
                                title={<Text onClick={() => {
                                        Modal.info({
                                                width: 1000,
                                                title:'Record Information',
                                                content: (
                                                    <RecordDetail recordId={item.id} />
                                                ),
                                            });
                                        }}>
                                            {item.name}
                                        </Text>
                                    }
                                description={
                                    <div>
                                        <div>
                                            Record: {item.id}
                                        </div>
                                        {item.description && `Description: ${item.description}`}
                                    </div>
                                }
                            />
                    </Card>
                </List.Item>
                )}
            />
        </div>
    )
}

export default UserHome;