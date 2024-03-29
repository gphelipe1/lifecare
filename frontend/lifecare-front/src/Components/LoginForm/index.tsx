import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

import * as Styled from './styles';
import { UserTypes } from '../../Types';
import { isAuthenticated, signIn } from '../../Services/auth';
import { useNavigate } from 'react-router-dom';
import { Role } from '../../Types/Usertypes';
import { NotificationPopup } from '..';

interface LoginFormProps {
    setAuthMode: React.Dispatch<React.SetStateAction<UserTypes.AuthMode>>
}

const LoginForm: React.FC<LoginFormProps>= ({ setAuthMode }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const navigateTo = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    setLoading(true);

    const data =
    {
        'username': values.cpf,
        'password': values.password
    };
    const response = await signIn(data);

    if(response.has_error){
        NotificationPopup('Login Failed', 'error');
        setLoading(false);
        return;
    }
    setLoading(false);
    navigateTo('/home');
  }

  useEffect(() => {
    const { auth, role } = isAuthenticated();
      if (auth) {
          role === Role.Admin ? navigateTo('/home') : navigateTo('/userHome') ;
          window.location.reload();
      }
  }, [navigateTo]);

  return (
    <Styled.FormLogin
      name="normal_login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="cpf"
        rules={[{ required: true, message: 'Please input your CPF!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="CPF" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Styled.FormItem>
        <div>
           Don't Have an account ? <a onClick={() => setAuthMode(UserTypes.AuthMode.SignUp)}> Sign Up </a>
        </div>
        <Styled.FormButton loading={loading} type="primary" htmlType="submit">
          Sign in
        </Styled.FormButton>
        <>
        </>
      </Styled.FormItem>
    </Styled.FormLogin>
  );
};

export default LoginForm;