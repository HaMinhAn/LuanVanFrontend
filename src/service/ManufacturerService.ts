import { SelectProps } from "antd";
import { Author, Manufacturer } from "../types/Product";
import { ApiGateway } from "./api";

export const getManufacturer = (): Promise<SelectProps["options"]> => {
  return ApiGateway.get({ url: "/book/manufacturer" }).then((res) => {
    const temp: SelectProps["options"] = [];
    const manufacturerList: Manufacturer[] = res.data;
    manufacturerList.forEach((manufacturer) => {
      temp.push({ value: manufacturer.id, label: manufacturer.name });
    });
    return Promise.resolve(temp);
  });
};
