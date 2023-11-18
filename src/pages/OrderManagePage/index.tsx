import React, { useEffect, useState } from "react";
import { ApiGateway } from "../../service/api";
import { useAuth } from "../../contexts/auth";
import { OrderManage } from "../../components/OrderManage/OrderManage";
import LayoutDefault from "../../components/Layout/LayoutDefault";
import { Order } from "../../types/order";
import { useCategory } from "../../contexts/category";

const OrderManagePage = () => {
  const { isAdmin } = useAuth();
  const [data, setData] = useState<Order[]>([]);
  const { setUpdate, update } = useCategory();

  useEffect(() => {
    isAdmin();
    ApiGateway.get({ url: "order" }).then((res) => {
      setData(res.data);
    });
  }, [update]);
  return (
    <LayoutDefault>
      <OrderManage data={data} />
    </LayoutDefault>
  );
};

export default OrderManagePage;
