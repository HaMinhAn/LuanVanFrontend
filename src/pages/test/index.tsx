import { Button, Image } from "antd";
import React from "react";
import { ApiGateway, BookService } from "../../service/api";
import { OrderManage } from "../../components/OrderManage/OrderManage";

const TestComponent = () => {
  // BookService.get({ url: "api/book/service01" }).then((res) => {
  //   console.log(res.data);
  // });
  const handleCLick = () => {
    // ApiGateway.get({ url: "/order/payment//VNPay/10000" })
    //   .then((res) => {
    //     window.location.href = res.data;
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };
  return (
    <div>
      <Button onClick={handleCLick}>Pay</Button>
      <OrderManage />
    </div>
  );
};

export default TestComponent;
