import React from 'react';
import { Form, Input, Button, message } from 'antd';

const LogInPage = ({ setIsLogedIn, setUsername }) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
  };

  const onFinish = ({ username, password }) => {
    if (username === 'admin' && password === 'admin') {
      setIsLogedIn(true);
      setUsername(username);
    } else if (username === 'user' && password === 'user') {
      setIsLogedIn(true);
      setUsername(username);
    } else {
      message.error('帳號或密碼錯誤');
      window.location.reload(true);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.05)'
      }}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={err => message.error('表單驗證錯誤，請重新確認')}
        style={{
          padding: '20px 20px 0 20px',
          border: '1px solid #444',
          borderRadius: 5,
          backgroundColor: '#fff'
        }}
      >
        <Form.Item
          label="帳號"
          name="username"
          rules={[{ required: true, message: '帳號為必填欄位' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密碼"
          name="password"
          rules={[{ required: true, message: '密碼為必填欄位' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登入
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LogInPage;
