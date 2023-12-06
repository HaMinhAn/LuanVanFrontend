import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  SelectProps,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { ApiGateway } from "../../service/api";
import { InforUser, UpdateUser } from "../../types/User";
import moment from "moment";
import locale from "antd/es/date-picker/locale/zh_CN";

import "dayjs/locale/zh-cn";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const UserEdit = () => {
  const [form] = Form.useForm();
  const id = localStorage.getItem("id") || "";
  const [userInfor, setuserInfor] = useState<InforUser>();
  const [update, setUpdate] = useState(new Date());
  useEffect(() => {
    ApiGateway.get({ url: `/v1/users/all/${id}` }).then((res) => {
      setuserInfor(res.data);
    });
  }, [update]);
  // const [infor, setInfor] = useState<RegisterRequest>();
  const onFinish = (values: UpdateUser) => {
    const infor = {
      name: values.name,
      age: 20,
      phoneNumber: values.phoneNumber,
      sex: userInfor?.sex,
      address: values.address,
      dateTime: moment(`${values.dateTime}`).format(),
    };
    ApiGateway.put({ url: `/v1/users/${id}`, data: infor }).then((res) => {
      message.info("Cập nhật thành công");
      setUpdate(new Date());
    });
  };

  return userInfor ? (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Cập nhật thông tin</h1>
      <Form
        {...formItemLayout}
        form={form}
        title="Cập nhật thông tin"
        onFinish={onFinish}
        style={{
          padding: "10px",
        }}
      >
        <Form.Item
          name="name"
          label="Tên"
          tooltip="Nhập họ và tên?"
          initialValue={userInfor?.name}
          rules={[
            {
              required: true,
              message: "Nhập họ và tên!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ"
          initialValue={userInfor?.address}
          rules={[
            {
              required: true,
              message: "Nhập địa chỉ!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="dateTime"
          label="Ngày sinh"
          initialValue={moment(`${userInfor?.dateTime}`)}
          rules={[
            {
              required: true,
              message: "Nhập ngày sinh của bạn!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          initialValue={userInfor?.phoneNumber}
          rules={[{ required: true, message: "Nhập số điện thoại!" }]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="gender" label="Giới tính">
          {userInfor.sex ? "Nam" : "Nữ"}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            style={{ backgroundColor: "antiquewhite", color: "black" }}
            type="primary"
            htmlType="submit"
          >
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  ) : null;
};

export default UserEdit;
