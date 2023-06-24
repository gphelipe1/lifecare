/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { cpf } from 'cpf-cnpj-validator';

import * as Styled from './styles';
import { UserTypes } from '../../Types';
import { signUp } from '../../Services/auth';
import { useNavigate } from 'react-router-dom';
import { NotificationPopup } from '..';
interface RegistrationFormProps {
    setAuthMode: React.Dispatch<React.SetStateAction<UserTypes.AuthMode>>
}

const RegistrationForm: React.FC<RegistrationFormProps>= ({ setAuthMode }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const navigateTo = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    const response = await signUp(values);

    if(response.has_error){
        NotificationPopup('Registration Failed', 'error');
        setLoading(false);
        return;
    }

    setLoading(false);
    navigateTo('/home');
    NotificationPopup('User Created', 'success');
  }

  const normalizeCPF = (value: string) => {
    const formattedValue = cpf.format(value);
    return formattedValue;
  };

  const validateCPF = (_: any, value: string) => {
    const isValid = cpf.isValid(value);
  
    if (!isValid) {
      return Promise.reject();
    }
  
    return Promise.resolve();
  };

  const validateName = (_: any, value: string) => {
    const regex = /^[A-Za-z\s]+$/;
  
    if (!regex.test(value)) {
      return Promise.reject('Invalid name');
    }
  
    return Promise.resolve();
  };

  return (
    <Styled.FormLogin
      name="normal_login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{
            required: true,
            validator: validateCPF,
            message: 'Please input a valid CPF'
        }]}
        normalize={normalizeCPF}
      >
        <Input  placeholder="CPF" />
      </Form.Item>

      <Form.Item
        name="name"
        rules={[{
            required: true,
            validator: validateName,
            message: 'Please input a valid Name!' }]}
      >
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{
            required: true,
            message: 'Please input your Password' }]}
      >
        <Input
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Styled.FormItem>
        <Styled.FormButton loading={loading} type="primary" htmlType="submit">
            Register
        </Styled.FormButton>
        <>
           <a onClick={() => setAuthMode(UserTypes.AuthMode.SignIn)}> Sign In </a>
        </>
      </Styled.FormItem>
    </Styled.FormLogin>
  );
};

export default RegistrationForm;