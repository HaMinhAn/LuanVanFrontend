import { Button, Col, Row, message } from "antd";
import { Product } from "../../types/Product";
import { useAuth } from "../../contexts/auth";
import { AddCart } from "../../types/CartItem";
import { ApiGateway } from "../../service/api";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useCategory } from "../../contexts/category";

const Payment = (props: { data: Product }) => {
  const { user } = useAuth();
  const { setUpdate, update } = useCategory();
  const history = useHistory();
  useEffect(() => {
    console.log(user);
  }, [user, update]);
  const AddToCart = (data: Product) => {
    if (user) {
      const body: AddCart = {
        id: data.id,
        image: data.pictureList[0].path,
        name: data.name,
        price: data.price,
        quantity: 1,
        user: user || "test",
      };
      ApiGateway.post({ url: "/basket/add", data: body })
        .then(() => {
          message.info(`Sản phẩm ${body.name} đã thêm vào giỏ hàng`);
        })
        .finally(() => {
          setUpdate(new Date());
        });
    } else {
      history.replace("/login");
    }
  };
  return (
    <div>
      <Col>
        <Row>
          <Col
            style={{
              color: "red",
              fontSize: 36,
              height: 40,
              fontWeight: "bold",
            }}
          >
            {props.data.price}
          </Col>
          {props.data.sale ? <Col>{props.data.sale}</Col> : null}
        </Row>
        <Row>
          <Col>
            <Button type="primary" onClick={() => AddToCart(props.data)}>
              Thêm vào giỏ hàng
            </Button>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default Payment;
