import React, { useEffect } from "react";
import { ApiGateway } from "../../service/api";
import { useAuth } from "../../contexts/auth";
import { OrderManage } from "../../components/OrderManage/OrderManage";
import LayoutDefault from "../../components/Layout/LayoutDefault";

const OrderManagePage = () => {
  const { isAdmin } = useAuth();

  useEffect(() => {
    isAdmin();
  }, []);
  return (
    <LayoutDefault>
      <OrderManage />
    </LayoutDefault>
  );
};

export default OrderManagePage;
