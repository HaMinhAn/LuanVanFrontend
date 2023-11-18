import { SelectProps } from "antd";
import { Author, Manufacturer, Language } from "../types/Product";
import { ApiGateway } from "./api";

export const getLanguage = (): Promise<SelectProps["options"]> => {
  return ApiGateway.get({ url: "/book/language" }).then((res) => {
    const temp: SelectProps["options"] = [];
    const languageList: Language[] = res.data;
    languageList.forEach((language) => {
      temp.push({ value: language.id, label: language.language });
    });
    return Promise.resolve(temp);
  });
};
