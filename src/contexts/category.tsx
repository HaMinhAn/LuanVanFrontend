import { message } from "antd";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ApiGateway } from "../service/api";
import { Product } from "../types/Product";
interface ContextProps {
  products: Product[];
  setCategory: React.Dispatch<React.SetStateAction<number>>;
  setUpdate: React.Dispatch<React.SetStateAction<Date>>;
  update: Date;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}
const CategoryContext = createContext({} as ContextProps);
const CategoryProvider = (props: { children: React.ReactNode }) => {
  const [category, setCategory] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [update, setUpdate] = useState(new Date());
  useEffect(() => {
    if (category === 0) {
      ApiGateway.get({ url: "/book" })
        .then((res) => {
          setProducts(res.data);
        })
        .catch((e) => console.log(e));
    } else
      ApiGateway.get({
        url: `/book/category/all/${category}`,
      })
        .then((res) => {
          setProducts(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [category]);
  return (
    <CategoryContext.Provider
      value={{ products, setCategory, setUpdate, update, setProducts }}
    >
      <>{props.children}</>
    </CategoryContext.Provider>
  );
};
const useCategory = () => {
  return useContext(CategoryContext);
};
export { CategoryProvider, useCategory, CategoryContext };
