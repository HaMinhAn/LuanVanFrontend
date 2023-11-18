import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Product } from "../../types/Product";
import { Col, Image, Row } from "antd";
import { useHistory } from "react-router-dom";
import { useCategory } from "../../contexts/category";
const mockA = (amount: number, product1: Product[]) => {
  const goods: Product[] = [];
  for (let index = 0; index < amount; index++) {
    goods.push(...product1);
  }
  return goods;
};
const checkLogin = (login: string | null) => {
  return login ? console.log("aHI") : null;
};
const Main = () => {
  const { products } = useCategory();
  const history = useHistory();
  const login = localStorage.getItem("id");
  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <Row gutter={[12, 12]} className={styles.container}>
      <div
        onClick={() => {
          checkLogin(login);
        }}
      ></div>
      {products ? (
        products.map((mock) => {
          return (
            <Col
              className={styles.goods}
              key={`Product-${mock.id}`}
              xl={6}
              sm={12}
              onClick={() => {
                history.push(`/infor/${mock.id}`);
              }}
            >
              <Image
                src={mock.pictureList[0].path}
                className={styles.picture}
                preview={false}
                key={`Image-${mock.id}`}
                // width="70%"
                height="80%"
              />
              <div className={styles.infor} key={`Infor-${mock.id}`}>
                <div
                  key={`Name-${mock.id}`}
                  style={{ overflow: "hidden", height: 35 }}
                >
                  {mock.name}
                </div>
                <div
                  key={`Price-${mock.id}`}
                  style={{ color: "red", fontSize: 24 }}
                >
                  {mock.price} Đ
                </div>
              </div>
            </Col>
          );
        })
      ) : (
        <div className={styles.content} key={`de-${2}`}>
          Hiện tại không có sản phẩm
        </div>
      )}
    </Row>
  );
};

export default Main;
