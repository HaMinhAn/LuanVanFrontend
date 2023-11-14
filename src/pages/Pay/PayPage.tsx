import React from "react";
import LayoutDefault from "../../components/Layout/LayoutDefault";
import Items from "../../components/Items";
import { useItem } from "../../contexts/Items";
import { useCategory } from "../../contexts/category";
import { Button, message } from "antd";
import { ApiGateway } from "../../service/api";
import Pay from "../../components/Pay";

const PayPage = () => {
  return (
    <LayoutDefault>
      <Pay />
    </LayoutDefault>
  );
};

export default PayPage;
