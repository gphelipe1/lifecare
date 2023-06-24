import { Avatar, Descriptions } from "antd";
import { RecordType } from "../../Types";
import { useEffect, useState } from "react";
import { getUserFile, getUserRecordDetail } from "../../Services/userService";

interface RecordDetailProps 
{
    recordId: number
}

const RecordDetail: React.FC<RecordDetailProps> = ({ recordId }) => {
    const [recordDetail, setRecordDetail] = useState<RecordType.Record>();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          const response = await getUserRecordDetail(recordId);
          setRecordDetail(response);
    
          const url = await getUserFile();
          setImageUrl(url);
        };
    
        fetchData();
    }, [recordId]);

    return (
        <div style={{
            display: 'grid',
            gridTemplateRows: 'auto auto',
            gap: '1rem',
        }}>
            {imageUrl && <Avatar style={{ alignSelf: 'center' }} src={<img src={imageUrl} alt="Profile" />} size={80}/>}
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