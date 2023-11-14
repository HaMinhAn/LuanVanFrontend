import React, { useEffect } from "react";
import { ApiGateway } from "../../service/api";
import { useItem } from "../../contexts/Items";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import { useCategory } from "../../contexts/category";

const Paid = () => {
  const { setUpdate } = useCategory();
  const history = useHistory();
  useEffect(() => {
    const data = localStorage.getItem("order") || "";
    const codereturn = window.location.search;
    if (codereturn && codereturn.includes("vnp_ResponseCode=00")) {
      ApiGateway.post({
        url: "/order",
        data: { ...JSON.parse(data), paid: true },
      }).then((res) => {
        message.info("Bạn đã thanh toán thành công");
        setUpdate(new Date());
        history.push("/");
      });
    } else {
      message.error("Xảy ra lỗi khi thanh toán");
      setUpdate(new Date());
      history.push("/");
    }
  }, []);
  return <div> Paid</div>;
};

export default Paid;
