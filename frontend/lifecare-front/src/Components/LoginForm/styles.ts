import { Button, Card, Form } from 'antd';
import Title from 'antd/es/typography/Title';
import styled from 'styled-components';

export const FormLogin = styled(Form)`
    max-width: 300px;
    margin: auto;
    padding-top: 1rem;
`;

export const FormItem = styled(Form.Item)`
    .ant-form-item-control-input-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`;

export const FormButton = styled(Button)`
    width: 80px;
`;

export const Container = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;    
    height: 100%;
`;

export const TemplateContainer = styled.div`
    width: 100%;
    height: 100%;
    background: -moz-linear-gradient(90deg, rgba(2,1,13,1) 0%, rgba(12,41,47,1) 100%);
    background: -webkit-linear-gradient(90deg, rgba(2,1,13,1) 0%, rgba(12,41,47,1) 100%);
    background: linear-gradient(90deg, rgba(2,1,13,1) 0%, rgba(12,41,47,1) 100%);
`;

export const FormContainer = styled.div`
    margin-top: 40%;
    margin: auto;
`;

export const CustomTitle = styled(Title)`
    color: #273547 !important;
    text-align: center;
    margin-top: 50%;
`

export const CustomCard = styled(Card)`
    margin-top: 30%;
`;

export const OutlinedButton = styled(Button)`
`;