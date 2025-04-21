import { message } from "antd";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ApiGateway } from "../service/api";
import { Product } from "../types/Product";
import { CartType } from "../types/CartItem";
import { RecieveInfo } from "../types/User";
import { useAuth } from "./auth";
import { useCategory } from "./category";
interface ContextProps {
  items: CartType | undefined;
  setItems: React.Dispatch<React.SetStateAction<CartType | undefined>>;
  info: RecieveInfo | undefined;
  setInfo: React.Dispatch<React.SetStateAction<RecieveInfo | undefined>>;
}
const ItemContext = createContext({} as ContextProps);
const ItemProvider = (props: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartType>();
  const [info, setInfo] = useState<RecieveInfo>();
  const { user } = useAuth();
  const { update } = useCategory();

  useEffect(() => {
    if (user !== "") {
      ApiGateway.get({ url: `/basket/${user}` })
        .then((res) => {
          setItems(res.data);
        })
        .catch(() => {
          setItems(undefined);
        });
    }
  }, [update, JSON.stringify(items), user]);
  return (
    <ItemContext.Provider value={{ items, setItems, info, setInfo }}>
      <>{props.children}</>
    </ItemContext.Provider>
  );
};
const useItem = () => {
  return useContext(ItemContext);
};
export { ItemProvider, useItem, ItemContext };
