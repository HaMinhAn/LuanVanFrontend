import { Button, Table, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { Order, OrderStatus } from "../../types/order";
import { ColumnsType } from "antd/es/table";
import Action from "../Action";
import { useCategory } from "../../contexts/category";
import { ApiGateway } from "../../service/api";
import OrderAction from "./Action";
import moment from "moment";

const columns: ColumnsType<Order> = [
  {
    title: "Tên",
    dataIndex: "receiver",
    key: "key",
    render: (_, text, index) => <p>{text.username}</p>,
  },
  {
    title: "Mã đơn hàng",
    dataIndex: "no",
    key: "no",
    ellipsis: true,
  },
  {
    title: "Hình thức thanh toán",
    dataIndex: "manufacturer",
    key: "paymentMethod",
    render: (value, record, index) => {
      let color = "gray";
      if (record.paymentMethod.id == 2) {
        color = "green";
      }
      return <Tag color={color}>{record.paymentMethod.name}</Tag>;
    },
  },
  {
    title: "Tổng giá trị",
    dataIndex: "totalPrice",
    key: "totalPrice",
    render: (value, record, index) => {
      return record.totalPrice;
    },
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdDate",
    key: "createdDate",
    sorter: (a, b) => {
      return (
        moment.duration(moment().diff(a.createdDate)).asMilliseconds() -
        moment.duration(moment().diff(b.createdDate)).asMilliseconds()
      );
    },
    render: (value, record, index) => {
      return <>{record.createdDate}</>;
    },
  },
  {
    title: "Trạng thái thanh toán",
    dataIndex: "paid",
    key: "paid",
    render: (value, record, index) => {
      let color = record.paid ? "green" : "gray";

      return (
        <Tag color={color}>
          {record.paid ? "Đã thanh toán" : "Chưa thanh toán"}
        </Tag>
      );
    },
  },
  {
    title: "Trạng thái",
    key: "tags",
    dataIndex: "tags",
    render: (_, { status }) => {
      let color = "green";
      let message = "";
      switch (status) {
        case OrderStatus.CANCEL:
          color = "red";
          message = "Đã hủy";
          break;
        case OrderStatus.PENDING:
          color = "gray";
          message = "Đang chờ duyệt";
          break;
        case OrderStatus.SHIPPING:
          color = "yellow";
          message = "Đang giao";
          break;
        case OrderStatus.RECEIVED:
          color = "green";
          message = "Đã giao";
          break;
        default:
          break;
      }
      return (
        <>
          <Tag color={color}>{message}</Tag>
        </>
      );
    },
  },
  {
    title: "Hành động",
    key: "action",
    render: (_, record) => {
      return <OrderAction data={record} />;
    },
  },
];
export const OrderManage = () => {
  const [data, setData] = useState<Order[]>([]);
  const { update } = useCategory();
  useEffect(() => {
    ApiGateway.get({ url: "order" }).then((res) => {
      setData(res.data);
    });
  }, [update]);
  return (
    <Table
      rowKey={(record) => `${record.id}`}
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 5, showSizeChanger: false }}
    />
  );
};
