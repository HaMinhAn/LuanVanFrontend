import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Col, Image, InputNumber, Modal, Popconfirm, Row } from "antd";
import React, { useState } from "react";
import { Order, OrderStatus } from "../../types/order";
import Cart from "../Cart";
import Items from "../Items";
import { ApiGateway } from "../../service/api";
import { useCategory } from "../../contexts/category";
import { useAuth } from "../../contexts/auth";

const OrderDetail = (props: {
  data: Order;
  isShow: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleCancel = () => {
    props.setShow(false);
  };
  return (
    <Modal open={props.isShow} footer={null} onCancel={handleCancel}>
      {props.data.items.map((v, i) => {
        return (
          <Col
            style={{
              marginTop: 10,
              backgroundColor: "white",
              width: 400,
            }}
            key={`Testvvv+${i}`}
          >
            <Row
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              key={`Test+${i}`}
            >
              <Image src={v.image} height={70} width={70} />
              <div style={{ width: 250 }}>
                <div style={{ maxHeight: 40, overflow: "hiden" }}>{v.name}</div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  x{v.price}
                </div>
                <div>{v.quantity}</div>
              </div>
            </Row>
          </Col>
        );
      })}
    </Modal>
  );
};

const OrderAction = (props: { data: Order }) => {
  const [show, setShow] = useState(false);
  const { setUpdate } = useCategory();
  const { user } = useAuth();
  const handShow = () => {
    setShow(!show);
  };
  const handleConfirm = () => {
    if (user === "admin") {
      ApiGateway.put({ url: `/order/${props.data.id}/1` }).then(() => {
        setUpdate(new Date());
      });
    } else {
      ApiGateway.put({ url: `/order/${props.data.id}/2` }).then(() => {
        setUpdate(new Date());
      });
    }
  };
  const handleCancle = () => {
    ApiGateway.put({ url: `/order/${props.data.id}/0` }).then(() => {
      setUpdate(new Date());
    });
  };
  const showPopconfirm = () => {
    const isReceived = props.data.status !== OrderStatus.RECEIVED;
    const isAdmin = user === "admin";
    const isCancel = props.data.status !== OrderStatus.CANCEL;

    return (!isAdmin && isCancel) || (isAdmin && isReceived);
  };
  return (
    <div>
      <Row gutter={4}>
        <Col>
          <Button onClick={handShow}>Xem thêm</Button>
        </Col>
        {showPopconfirm() ? (
          <Col>
            <Popconfirm
              title="Cập nhật trạng thái đơn hàng"
              okButtonProps={{
                disabled:
                  (user !== "admin" &&
                    props.data.status === OrderStatus.PENDING) ||
                  (user === "admin" &&
                    props.data.status === OrderStatus.CANCEL),
              }}
              onConfirm={handleConfirm}
              onCancel={handleCancle}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button>Cập nhật</Button>
            </Popconfirm>
          </Col>
        ) : null}
      </Row>
      <OrderDetail data={props.data} isShow={show} setShow={setShow} />
    </div>
  );
};

export default OrderAction;
