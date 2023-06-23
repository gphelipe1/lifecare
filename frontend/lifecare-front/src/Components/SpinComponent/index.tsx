import React from 'react';
import { Spin } from 'antd';
import * as Styled from './styles';

const SpinComponent: React.FC = () =>
    <Styled.Container>
        <Spin tip="Loading" size="large">
            <></>
        </Spin>
    </Styled.Container>;

export default SpinComponent;