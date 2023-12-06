import {
  AudioOutlined,
  LaptopOutlined,
  MenuFoldOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Input } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Link, useHistory } from "react-router-dom";
import { ApiGateway } from "../../service/api";
import { AdminElements, AdminItems, HomeElements } from "../../utils/Navbar";
import { useCategory } from "../../contexts/category";

const { Search } = Input;
const { Header, Content } = Layout;
const LayoutDefault = (props: { children: React.ReactNode }) => {
  const history = useHistory();
  const { setCategory, setProducts, setUpdate } = useCategory();
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
  const onChangeSearch = (e: any) => {
    const id = setTimeout(() => {
      ApiGateway.get({
        url: "/book/search",
        configs: { params: { name: e.target.value } },
      })
        .then((res) => {
          setProducts(res.data);
          setUpdate(new Date());
        })
        .finally(() => {
          clearTimeout(id);
          history.push("/");
        });
    }, 2000);
  };
  const onSearch = (value: any, _e: any) => {
    ApiGateway.get({
      url: "/book/search",
      configs: { params: { name: value } },
    }).then((res) => {
      setProducts(res.data);
      setUpdate(new Date());
      history.push("/");
    });
  };
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
            Book Buy
          </div>
        </div>
        {name ? (
          <>
            {name !== "admin" ? (
              <div className={styles.center}>
                <Search
                  placeholder="Tìm tên sách"
                  enterButton="Tìm"
                  size="middle"
                  onChange={onChangeSearch}
                  onSearch={onSearch}
                />
              </div>
            ) : null}
            <Menu mode="horizontal" items={AdminItems(name)} />
          </>
        ) : (
          <>
            <div className={styles.center}>
              <Search
                placeholder="Tìm tên sách"
                enterButton="Tìm"
                size="middle"
                onChange={onChangeSearch}
                onSearch={onSearch}
              />
            </div>
            <Link to={"/login"} style={{ color: "white" }}>
              Đăng nhập
            </Link>
          </>
        )}
      </Header>
      <Layout>
        {/* <Sider> */}
        <Menu
          mode="horizontal"
          overflowedIndicator={<MenuFoldOutlined />}
          defaultSelectedKeys={id == "2" ? ["book"] : ["0"]}
          // style={{ borderRight: 0 }}
          items={
            id == "2"
              ? AdminElements(history)
              : HomeElements(history, setCategory)
          }
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
