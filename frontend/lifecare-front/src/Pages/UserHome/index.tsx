import { Avatar, Card, List, Modal } from "antd"
import { RecordType } from "../../Types"
import { UserOutlined } from "@ant-design/icons"
import Text from 'antd/es/typography/Text';

import * as Styled from './styles';
import { RecordDetail } from "..";
import { getUserRecords } from "../../Services/userService";
import { useEffect, useState } from "react";
import { Role } from "../../Types/Usertypes";

const UserHome: React.FC = () => {
 
    const [records, setRecords] = useState<RecordType.Record[]>([]);

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
    
    useEffect(() => {
        getData();
    }, [])

    return (
        <div style={{
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <List
                itemLayout="horizontal"
                dataSource={records}
                pagination={{
                    onChange: (page) => {
                      console.log(page);
                    },
                    pageSize: 3,
                  }}
                renderItem={(item) => (
                <List.Item>
                    <Card style={{ width: '100%', marginTop: 16 }}>
                        <Styled.CustomMeta
                            avatar={<Avatar size={64} icon={<UserOutlined />}/>}
                            title={<Text onClick={() => {
                                    Modal.info({
                                            width: 1000,
                                            title:'Record Information',
                                            content: (
                                                <RecordDetail />
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