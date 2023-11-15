import {
  LaptopOutlined,
  MenuFoldOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import Main from "../../components/Main/Main";
import styles from "./style.module.css";
import { Link, useHistory } from "react-router-dom";
import { ApiGateway, UserService } from "../../service/api";
import { AdminElements, AdminItems, HomeElements } from "../../utils/Navbar";
import { Product } from "../../types/Product";
import { useCategory } from "../../contexts/category";
import { useAuth } from "../../contexts/auth";
const { Header, Content, Sider, Footer } = Layout;

const LayoutDefault = (props: { children: React.ReactNode }) => {
  const history = useHistory();
  const { setCategory } = useCategory();
  // const { user } = useAuth();
  const [name, setName] = useState(window.localStorage.getItem("user") || "");
  const id = localStorage.getItem("id");
  useEffect(() => {
    if (id) {
      ApiGateway.get({ url: `/v1/users/${id}` }).then((res) => {
        const name = res.data.name;
        setName(name);
        window.localStorage.setItem("user", name);
        if (id === "2" && window.location.pathname === "/") {
          history.push("/admin/book");
        }
      });
    }
  }, []);
  return (
    <Layout style={{ height: "98vh" }}>
      <Header className={styles.header} style={{ backgroundColor: "blue" }}>
        <div>
          <div
            className={styles.logo}
            onClick={() => {
              history.push("/");
            }}
          >
            Logo
          </div>
        </div>
        <div
          style={{
            width: 200,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {name ? (
            <>
              <Menu
                mode="horizontal"
                items={AdminItems(name)}
                onClick={(e) => {
                  if (e.key === "orderDetail") {
                    history.push("/order/detail");
                  }
                }}
              />
            </>
          ) : (
            <>
              <Link to={"/login"} style={{ color: "white" }}>
                Log in
              </Link>
              <div style={{ width: 40 }}></div>
            </>
          )}
        </div>
      </Header>
      <Layout>
        {/* <Sider> */}
        <Menu
          onClick={(e) => {
            if (e.key === "book") {
              history.push("/admin/book");
            } else if (e.key === "order") {
              history.push("/admin/order");
            } else {
              history.push("/");
              setCategory(parseInt(e.key));
            }
          }}
          mode="horizontal"
          overflowedIndicator={<MenuFoldOutlined />}
          defaultSelectedKeys={id == "2" ? ["book"] : ["0"]}
          // style={{ borderRight: 0 }}
          items={id == "2" ? AdminElements : HomeElements}
        />
        {/* </Sider> */}
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              margin: 0,
              minHeight: 630,
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
      {/* <Layout>
        <Footer>@2023</Footer>
      </Layout> */}
    </Layout>
  );
};

export default LayoutDefault;
