import React from "react";
import Items from "../Items";
import { Button, Col, Row, message } from "antd";
import { ApiGateway } from "../../service/api";
import { useCategory } from "../../contexts/category";
import { useItem } from "../../contexts/Items";
import { useHistory } from "react-router-dom";

const Pay = () => {
  const { items, info, setItems } = useItem();
  const { setUpdate } = useCategory();
  const history = useHistory();
  const handlePay = () => {
    if (info?.paymentMethod === 2) {
      ApiGateway.get({ url: `/order/payment/VNPay/${items?.totalPrice}` })
        .then((res) => {
          localStorage.setItem("order", JSON.stringify({ ...items, ...info }));
          window.location.href = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      ApiGateway.post({
        url: `/order`,
        data: { ...items, ...info },
      })
        .then(() => {
          message.info("Thanh toán thành công");
          setUpdate(new Date());
          history.push("/");
        })
        .catch((e) => {
          message.error(e);
        })
        .finally(() => {
          setUpdate(new Date());
        });
    }
  };
  return (
    <div>
      <Items cartItem={items} update={setUpdate} />
      <div>
        <Col>
          <Row>
            <Col span={10}>Họ tên người nhận hàng:</Col>
            <Col>{info?.name}</Col>
          </Row>
          <Row>
            <Col span={10}>Địa chỉ:</Col>
            <Col>{info?.address}</Col>
          </Row>
          <Row>
            <Col span={10}>Số điện thoại:</Col>
            <Col>{info?.phoneNumber}</Col>
          </Row>
          <Row>
            <Col span={10}>Phương thức thanh toán:</Col>
            <Col>
              {info?.paymentMethod === 1 ? "Thanh toán khi nhận hàng" : "VNPay"}
            </Col>
          </Row>
        </Col>
      </div>
      <Row gutter={10}>
        <Col>
          <Button htmlType="submit" type="primary" onClick={handlePay}>
            {" "}
            Thanh toán
          </Button>
        </Col>
        <Col>
          <Button
            htmlType="submit"
            type="default"
            onClick={() => history.push("/checkout")}
          >
            {" "}
            Quay lại
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Pay;
