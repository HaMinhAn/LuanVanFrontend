import React from "react";
import styles from "./style.module.css";
import { Tabs } from "antd";
import LoginForm from "../../components/Login/LoginForm";
import RegisterForm from "../../components/Register/Register";
const Login = () => {
  return (
    <div className={styles.outline}>
      <div className={styles.container}>
        <div className={styles.title}>Title</div>
        <Tabs defaultActiveKey="1" centered>
          <Tabs.TabPane tab="Đăng nhập" key="1">
            <LoginForm />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đăng ký" key="2">
            <RegisterForm />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
