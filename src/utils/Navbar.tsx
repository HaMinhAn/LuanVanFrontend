import {
  BookFilled,
  BookOutlined,
  FileFilled,
  HomeOutlined,
  NotificationOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";

const category = [
  {
    key: 1,
    icon: <UserOutlined />,
    label: "IT",
  },
  {
    key: 2,
    icon: <UserOutlined />,
    label: "Kinh Tế",
  },
  {
    key: 3,
    icon: <UserOutlined />,
    label: "Chính trị",
  },
  {
    key: 4,
    icon: <UserOutlined />,
    label: "Sách cho bé",
  },
];
export const HomeElements: MenuProps["items"] = [
  {
    key: 0,
    icon: <HomeOutlined />,
    label: "Trang chủ",
  },
  {
    key: "test",
    icon: <NotificationOutlined />,
    label: `Danh mục`,
    children: category,
  },
];

export const AdminElements: MenuProps["items"] = [
  {
    key: "book",
    icon: <BookOutlined />,
    label: "Quản lý sách",
  },
  {
    key: "order",
    icon: <FileFilled />,
    label: "Quản lý giao dịch",
  },
];

export const AdminItems = (name: string) => {
  const history = useHistory();
  const item: MenuProps["items"] = [
    {
      key: "hi",
      label: `Hi, ${name}`,
      children:
        name === "admin"
          ? [
              {
                key: "infor",
                icon: <UserOutlined />,
                label: `Đăng xuất`,
                onClick: () => {
                  localStorage.clear();
                  window.location.href = "/login";
                },
              },
            ]
          : [
              {
                key: "infor",
                icon: <UserOutlined />,
                label: `Thông tin cá nhân`,
              },
              {
                key: "orderDetail",
                icon: <ShoppingCartOutlined />,
                label: `Đơn hàng của tôi`,
              },
              {
                key: "basket",
                icon: <UserOutlined />,
                label: `Giỏ hàng`,
                onClick: () => {
                  history.push("/cart");
                },
              },
              {
                key: "logout",
                icon: <UserOutlined />,
                label: `Đăng xuất`,
                onClick: () => {
                  localStorage.clear();
                  window.location.href = "/login";
                },
              },
            ],
    },
  ];
  return item;
};
