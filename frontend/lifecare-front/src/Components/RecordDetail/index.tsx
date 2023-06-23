import { Avatar, Descriptions } from "antd";
import { RecordType } from "../../Types";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getUserRecordDetail } from "../../Services/userService";

interface RecordDetailProps 
{
    recordId: number
}

const RecordDetail: React.FC<RecordDetailProps> = ({ recordId }) => {

    const [recordDetail, setRecordDetail] = useState<RecordType.Record>();

    const getRecord = async (recordId: number) => {
        const response = await getUserRecordDetail(recordId);

        if(response.has_error){
            return;
        }
        
        setRecordDetail(response);
        return;

    
    }

    useEffect(() => {
        getRecord(recordId);
    }, []);

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            columnGap: '1rem',
        }}>
            <Avatar style={{ alignSelf: 'center' }} size={64} icon={<UserOutlined />}/>
            <Descriptions>
                <Descriptions.Item label="Record Id ">{recordDetail?.id}</Descriptions.Item>
                <Descriptions.Item label="Name">{recordDetail?.name}</Descriptions.Item>
                <Descriptions.Item label="CPF">{recordDetail?.cpf}</Descriptions.Item>
                <Descriptions.Item label="Phone">{recordDetail?.phone}</Descriptions.Item>
                <Descriptions.Item label="Address">{recordDetail?.address ?? '------'}</Descriptions.Item>
                <Descriptions.Item label="Description">{recordDetail?.description ?? '------'}</Descriptions.Item>
            </Descriptions>
        </div>
    );
}

export default RecordDetail;