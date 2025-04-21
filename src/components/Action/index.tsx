import { Button, Col, Row, message } from "antd";
import React, { useState } from "react";
import { Product } from "../../types/Product";
import { ApiGateway } from "../../service/api";
import { useCategory } from "../../contexts/category";
import ModelEditBook from "./modelEditBook";

const Action = (props: { data: Product }) => {
  const { setUpdate } = useCategory();
  const [show, setShow] = useState(false);
  const handleRemove = () => {
    ApiGateway.delete({ url: `/book/${props.data.id}` })
      .then(() => {
        message.info(`Xóa ${props.data.name} thành công`);
        setUpdate(new Date());
      })
      .catch((e) => {
        message.error(e);
      });
  };
  return (
    <div>
      <Row gutter={4}>
        <Col>
          <Button
            onClick={() => {
              setShow(true);
            }}
          >
            Cập nhật
          </Button>
        </Col>
        <Col>
          <Button onClick={handleRemove} danger>
            Xóa
          </Button>
        </Col>
      </Row>
      <ModelEditBook
        data={props.data}
        isModalOpen={show}
        setIsModalOpen={setShow}
      />
    </div>
  );
};

export default Action;
