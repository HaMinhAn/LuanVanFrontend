import { Button, Form, Input, Modal } from "antd";
import React from "react";
import { ApiGateway } from "../../service/api";
import { Product } from "../../types/Product";

const convertEnglish = (world: string) => {
  switch (world) {
    case "category":
      return "Loại";

    case "manufacturer":
      return "Nhà xuất bản";

    case "language":
      return "Ngôn ngữ";

    case "author":
      return "Tác giả";

    default:
      return "";
  }
};
const convertName = (world: string) => {
  switch (world) {
    case "language":
      return "language";
    default:
      return world;
  }
};
const AuthorModal = (props: {
  modalShow: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  typeModal?: string;
  values?: Product;
}) => {
  const handleSubmit = (v: { name: string }) => {
    ApiGateway.post({ url: `/book/${props.typeModal}`, data: v });
  };
  return (
    <>
      {props.typeModal && (
        <Modal
          footer={null}
          title={`Thêm ${convertEnglish(props.typeModal)}`}
          open={props.modalShow}
          onCancel={() => props.setModalShow(false)}
        >
          <Form onFinish={handleSubmit}>
            <Form.Item
              name="name"
              label={`Tên ${convertEnglish(props.typeModal)}`}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                {" "}
                Tạo
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default AuthorModal;
