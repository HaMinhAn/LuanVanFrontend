import { OrderManage } from "../../components/OrderManage/OrderManage";
import LayoutDefault from "../../components/Layout/LayoutDefault";
import { useEffect, useState } from "react";
import { ApiGateway } from "../../service/api";
import { Order } from "../../types/order";
import { useCategory } from "../../contexts/category";
import { useAuth } from "../../contexts/auth";

const OrderDetailPage = () => {
  const [data, setData] = useState<Order[]>([]);
  const { user } = useAuth();
  const { setUpdate, update } = useCategory();
  useEffect(() => {
    ApiGateway.get({ url: `order/private/${user}` }).then((res) => {
      setData(res.data);
    });
  }, [update]);
  return (
    <LayoutDefault>
      <OrderManage data={data} />
    </LayoutDefault>
  );
};

export default OrderDetailPage;
