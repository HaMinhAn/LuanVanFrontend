import { Button, Form, Input, message } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

const LoginForm = () => {
  const { login } = useAuth();
  const onFinish = (values: any) => {
    // if (values.username === "user" && values.password === "pass") {
    //   setAuthHeader(btoa(values.username + values.password));
    //   localStorage.setItem("user", values.username);
    //   history.push("/");
    // } else {
    //   message.error("Nhập sai thông tin đăng nhập");
    // }
    login(values.username, values.password);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{
        padding: "10px",
      }}
    >
      <Form.Item
        label="Email"
        name="username"
        rules={[{ required: true, message: "Nhập email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Nhập mật khẩu!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
