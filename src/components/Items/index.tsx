import React, { useEffect, useState } from "react";
import { CartType, ItemCart } from "../../types/CartItem";
import { Col, Image, InputNumber, Row } from "antd";
import { ApiGateway } from "../../service/api";
import { useCategory } from "../../contexts/category";
import { DeleteFilled } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
type ValueType = number | string;
const Items = (props: {
  cartItem: CartType | undefined;
  update: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const history = useHistory();
  const { setUpdate } = useCategory();
  const handleRemove = (name: number) => {
    ApiGateway.delete({
      url: `/basket/remove/item/${name}`,
      configs: { params: { name: props.cartItem?.username } },
    }).then(() => {
      setUpdate(new Date());
    });
  };
  const handleStep = (
    value: number,
    info: {
      offset: ValueType;
      type: "up" | "down";
    },
    entity: ItemCart
  ) => {
    const body = {
      user: props.cartItem?.username,
      name: entity.name,
      image: entity.name,
      price: entity.price,
    };
    if (info.type == "up") {
      ApiGateway.post({ url: "/basket/add", data: body }).then(() => {
        setUpdate(new Date());
      });
    } else {
      ApiGateway.put({ url: "/basket/remove", data: body }).then(() => {
        setUpdate(new Date());
      });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.cartItem && props.cartItem!.items != null ? (
        <div>
          {props.cartItem.items.map((v, i) => {
            return (
              <Col
                style={{
                  marginTop: 10,
                  backgroundColor: "white",
                  width: 400,
                }}
              >
                <Row
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  key={i}
                >
                  <Image src={v.image} height={70} width={70} />
                  <div style={{ width: 250 }}>
                    <div style={{ maxHeight: 40, overflow: "hiden" }}>
                      {v.name}
                    </div>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      x{v.price}
                    </div>
                    <InputNumber
                      defaultValue={v.quantity}
                      onStep={(v2, e) => handleStep(v2, e, v)}
                    />
                  </div>
                  <DeleteFilled
                    style={{ color: "red", fontSize: 40 }}
                    onClick={() => {
                      handleRemove(v.id);
                    }}
                  />
                </Row>
              </Col>
            );
          })}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>Tổng giá trị:</div>
            <h1 style={{ color: "red" }}>{props.cartItem?.totalPrice}</h1>
          </div>
        </div>
      ) : (
        <div>Không có trong giỏ hàng</div>
      )}
    </div>
  );
};

export default Items;
