import { Button, Form, Input, InputNumber, Select, SelectProps } from "antd";
import React, { ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import { useItem } from "../../contexts/Items";
import { RecieveInfo } from "../../types/User";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const paymentMethods: SelectProps["options"] = [
  {
    label: "Thanh toán khi nhận hàng",
    value: 1,
  },
  {
    label: "VNPay",
    value: 2,
  },
];

const Checkout = () => {
  const history = useHistory();
  const { setInfo } = useItem();
  const onFinish = (values: RecieveInfo) => {
    console.log(values);
    setInfo(values);
    history.push("/order");
  };

  return (
    <div>
      <h1 style={{ justifyContent: "center", display: "flex" }}>
        {" "}
        Thông tin nhận hàng
      </h1>
      <Form
        {...layout}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="name" label="Họ và tên" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[{ required: true, len: 12 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="paymentMethod"
          label="Phương thức thanh toán"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Chọn phương thức thanh toán"
            allowClear
            options={paymentMethods}
          />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.gender !== currentValues.gender
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("gender") === "other" ? (
              <Form.Item
                name="customizeGender"
                label="Customize Gender"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
            Thanh toán
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Checkout;
