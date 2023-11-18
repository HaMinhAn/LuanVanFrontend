import { Button, Col, Row, message } from "antd";
import React from "react";
import { Product } from "../../types/Product";
import { ApiGateway } from "../../service/api";
import { useCategory } from "../../contexts/category";

const Action = (props: { data: Product }) => {
  const { setUpdate } = useCategory();
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
          <Button>Edit</Button>
        </Col>
        <Col>
          <Button onClick={handleRemove} danger>
            Remove
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Action;
