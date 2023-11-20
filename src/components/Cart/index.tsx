import React, { useEffect, useState } from "react";
import Items from "../Items";
import { Button, message } from "antd";
import { useHistory } from "react-router-dom";
import { useItem } from "../../contexts/Items";
const Cart = () => {
  const { items, setItems } = useItem();
  const [update, setUpdate] = useState(new Date());
  const history = useHistory();

  useEffect(() => {}, [items]);
  const handlePay = () => {
    history.push("/checkout");
  };
  return (
    <div>
      <h1>Giỏ hàng</h1>
      <Items cartItem={items} update={setUpdate} />
      {items?.items ? (
        <Button onClick={handlePay} htmlType="submit" type="primary">
          Thanh toán
        </Button>
      ) : null}
    </div>
  );
};

export default Cart;
