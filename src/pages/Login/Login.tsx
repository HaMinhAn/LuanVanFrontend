import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Tabs } from "antd";
import LoginForm from "../../components/Login/LoginForm";
import RegisterForm from "../../components/Register/Register";
const Login = () => {
  const [selected, setSelected] = useState("login");
  return (
    <div className={styles.outline}>
      <div className={styles.container}>
        <div className={styles.title}>Title</div>
        <Tabs
          defaultActiveKey="login"
          activeKey={selected}
          onChange={(e) => setSelected(e)}
          centered
        >
          <Tabs.TabPane tab="Đăng nhập" key="login">
            <LoginForm />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đăng ký" key="register">
            <RegisterForm />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
