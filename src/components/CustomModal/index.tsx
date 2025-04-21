import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  SelectProps,
  Space,
  message,
} from "antd";
import { BookRequest, Manufacturer } from "../../types/Product";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { getAuthor } from "../../service/AuthorService";
import { getLanguage } from "../../service/LanguageService";
import { getManufacturer } from "../../service/ManufacturerService";
import { getCategory } from "../../service/CategoryService";
import AuthorModal from "./AuthorModal";
import { ApiGateway } from "../../service/api";
import { useCategory } from "../../contexts/category";
const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const CustomModal = (props: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [author, setAuthor] = useState<SelectProps["options"]>([]);
  const [manufacturer, setManufacturer] = useState<SelectProps["options"]>([]);
  const [category, setCategory] = useState<SelectProps["options"]>([]);
  const [language, setLanguage] = useState<SelectProps["options"]>([]);
  const [modalshow, setModalShow] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>();
  const { setUpdate } = useCategory();
  useEffect(() => {
    getAuthor().then((res) => setAuthor(res));
    getLanguage().then((res) => setLanguage(res));
    getManufacturer().then((res) => setManufacturer(res));
    getCategory().then((res) => setCategory(res));
  }, []);
  const onFinish = (values: BookRequest) => {
    ApiGateway.post({ url: "/book", data: values })
      .then(() => {
        setUpdate(new Date());
      })
      .catch(() => {
        message.error("Sách đã tồn tại!");
      });
    props.setIsModalOpen(false);
  };

  const setModalCustom = (v: string) => {
    setModalType(v);
    setModalShow(true);
  };
  return (
    <>
      <Modal
        title="Thêm sách"
        open={props.isModalOpen}
        width={1000}
        footer={null}
        onCancel={() => props.setIsModalOpen(false)}
      >
        <Form
          {...layout}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 900 }}
        >
          <Row>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên sách"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Mô tả"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Row>
                <Col span={10} offset={2}>
                  <Form.Item
                    name="price"
                    label="Giá"
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={1000} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="quantity"
                    label="Số lượng"
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="idManufacturer"
                label="Nhà xuất bản"
                rules={[{ required: true }]}
              >
                <Select
                  options={manufacturer}
                  onSelect={(v) => console.log(v)}
                />
              </Form.Item>
              <PlusOutlined onClick={() => setModalCustom("manufacturer")} />
              <Form.Item
                name="idCategory"
                label="Phân loại"
                rules={[{ required: true }]}
              >
                <Select options={category} onSelect={(v) => console.log(v)} />
              </Form.Item>
              <PlusOutlined onClick={() => setModalCustom("category")} />
              <Form.Item
                name="idLanguage"
                label="Ngôn ngữ"
                rules={[{ required: true }]}
              >
                <Select options={language} onSelect={(v) => console.log(v)} />
              </Form.Item>
              <PlusOutlined onClick={() => setModalCustom("language")} />
              <Form.Item
                name="idAuthor"
                label="Tác giả"
                rules={[{ required: true }]}
              >
                <Select options={author} onSelect={(v) => console.log(v)} />
              </Form.Item>
              <PlusOutlined onClick={() => setModalCustom("author")} />
            </Col>
            <Col span={10} offset={2}>
              <Form.List name="list">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <div>Hình ảnh {key + 1}: </div>
                        <Form.Item
                          {...restField}
                          name={[name, "caption"]}
                          rules={[
                            {
                              required: true,
                              message: `Thiếu miêu tả hình ảnh`,
                            },
                          ]}
                        >
                          <Input placeholder={`Miêu tả hình ảnh`} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "path"]}
                          rules={[
                            {
                              required: true,
                              message: `Thiếu đường dẫn hình ảnh`,
                            },
                          ]}
                        >
                          <Input placeholder={`Đường dẫn hình ảnh`} />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Thêm Hình ảnh
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
          </Row>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Thêm sách
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <AuthorModal
        modalShow={modalshow}
        setModalShow={setModalShow}
        typeModal={modalType}
      />
    </>
  );
};

export default CustomModal;
