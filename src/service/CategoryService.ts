import { SelectProps } from "antd";
import { Author, Category, Manufacturer } from "../types/Product";
import { ApiGateway } from "./api";

export const getCategory = (): Promise<SelectProps["options"]> => {
  return ApiGateway.get({ url: "/book/category" }).then((res) => {
    const temp: SelectProps["options"] = [];
    const CategoryList: Category[] = res.data;
    CategoryList.forEach((Category) => {
      temp.push({ value: Category.id, label: Category.name });
    });
    return Promise.resolve(temp);
  });
};
