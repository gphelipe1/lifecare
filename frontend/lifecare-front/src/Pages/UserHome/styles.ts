import styled from 'styled-components';
import Meta from 'antd/es/card/Meta';

export const CustomMeta = styled(Meta)`
    .ant-card-meta-title span {
        color: #0043a1;
    }
    .ant-card-meta-title span:hover {
        opacity: 0.8;
        cursor: pointer;
    }
`;