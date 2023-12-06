import {
  BarChartOutlined,
  BookFilled,
  BookOutlined,
  CloseOutlined,
  DesktopOutlined,
  FileFilled,
  HomeOutlined,
  MoneyCollectFilled,
  NotificationOutlined,
  ShoppingCartOutlined,
  TrophyFilled,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";

export const HomeElements: (
  history: any,
  setCategory: React.Dispatch<React.SetStateAction<number>>
) => MenuProps["items"] = (
  history: any,
  setCategory: React.Dispatch<React.SetStateAction<number>>
) => {
  return [
    {
      key: 0,
      icon: <HomeOutlined />,
      label: "Trang chủ",
      onClick: () => {
        setCategory(0);
        history.push("/");
      },
    },
    {
      key: "test",
      icon: <NotificationOutlined />,
      label: `Danh mục`,
      children: [
        {
          key: 1,
          icon: <DesktopOutlined />,
          label: "IT",
          onClick: () => {
            setCategory(1);
            history.push("/");
          },
        },
        {
          key: 2,
          icon: <MoneyCollectFilled />,
          label: "Kinh Tế",
          onClick: () => {
            setCategory(2);
            history.push("/");
          },
        },
        {
          key: 3,
          icon: <BookFilled />,
          label: "Chính trị",
          onClick: () => {
            setCategory(3);
            history.push("/");
          },
        },
        {
          key: 4,
          icon: <TrophyFilled />,
          label: "Sách cho bé",
          onClick: () => {
            setCategory(4);
            history.push("/");
          },
        },
      ],
    },
  ];
};

export const AdminElements: (history: any) => MenuProps["items"] = (
  history: any
) => {
  return [
    {
      key: "book",
      icon: <BookOutlined />,
      label: "Quản lý sách",
      onClick: () => {
        history.push("/admin/book");
      },
    },
    {
      key: "order",
      icon: <FileFilled />,
      label: "Quản lý giao dịch",
      onClick: () => {
        history.push("/admin/order");
      },
    },
    {
      key: "chart",
      icon: <BarChartOutlined />,
      label: "Biểu đồ thống kê",
      onClick: () => {
        history.push("/admin/chart");
      },
    },
  ];
};

export const AdminItems = (name: string) => {
  const history = useHistory();
  const item: MenuProps["items"] = [
    {
      key: "hi",
      label: `Chào, ${name}`,
      style: { width: 100 },
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
                onClick: () => {
                  history.push("/user");
                },
              },
              {
                key: "basket",
                icon: <BookOutlined />,
                label: `Giỏ hàng`,
                onClick: () => {
                  history.push("/cart");
                },
              },
              {
                key: "orderDetail",
                icon: <ShoppingCartOutlined />,
                label: `Đơn hàng của tôi`,
                onClick: () => {
                  history.push("/order/detail");
                },
              },
              {
                key: "logout",
                icon: <CloseOutlined />,
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
