import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";
import { useHistory } from "react-router";
import LayoutDefault from "../../components/Layout/LayoutDefault";
import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Product } from "../../types/Product";
import { ApiGateway } from "../../service/api";
import Action from "../../components/Action";
import CustomModal from "../../components/CustomModal";
import { useCategory } from "../../contexts/category";
// import { Product } from "../../types/Product";
// import { product } from "../../components/Main/Mock/mock";

const columns: ColumnsType<Product> = [
  {
    title: "Tên sách",
    dataIndex: "name",
    key: "name",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Nhà sản xuất",
    dataIndex: "manufacturer",
    key: "manufacturer",
    render: (value, record, index) => {
      return record.manufacturer.name;
    },
  },
  {
    title: "Tác giả",
    dataIndex: "manufacturer",
    key: "manufacturer",
    render: (value, record, index) => {
      return record.authors[0].name;
    },
  },
  {
    title: "Phân loại",
    dataIndex: "manufacturer",
    key: "manufacturer",
    render: (value, record, index) => {
      return record.category.name;
    },
  },
  {
    title: "Ngôn ngữ",
    key: "tags",
    dataIndex: "tags",
    render: (_, { language }) => {
      let color = "green";
      switch (language.id) {
        case 1:
          color = "yellow";
          break;
        case 2:
          color = "green";
          break;
        default:
          break;
      }
      return (
        <>
          <Tag color={color}>{language.language}</Tag>
        </>
      );
    },
  },
  {
    title: "Hành động",
    key: "action",
    render: (_, record) => {
      return <Action data={record} />;
    },
  },
];

const AdminRoute = () => {
  const { isAdmin } = useAuth();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [select, setSelect] = useState<number>(0);
  const [data, setData] = useState<Product[]>([]);
  const { update } = useCategory();
  useEffect(() => {
    ApiGateway.get({ url: "/book" }).then((res) => {
      setData(res.data);
    });
    isAdmin();
  }, [update]);
  return (
    <LayoutDefault>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => setIsModalOpen(true)}
          style={{ width: 100 }}
        >
          Thêm mới
        </Button>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      </div>
      <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </LayoutDefault>
  );
};

export default AdminRoute;
