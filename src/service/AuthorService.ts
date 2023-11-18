import { SelectProps } from "antd";
import { Author, Manufacturer } from "../types/Product";
import { ApiGateway } from "./api";

export const getAuthor = (): Promise<SelectProps["options"]> => {
  return ApiGateway.get({ url: "/book/author" }).then((res) => {
    const temp: SelectProps["options"] = [];
    const authorList: Author[] = res.data;
    authorList.forEach((author) => {
      temp.push({ value: author.id, label: author.name });
    });
    return Promise.resolve(temp);
  });
};
