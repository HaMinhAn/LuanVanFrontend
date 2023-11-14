import { ItemCart } from "./CartItem";

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: number | null;
  email: string;
  no: string;
  username: string;
  receiver: string;
  createdDate: Date; // You can use the Date type for LocalDateTime
  items: ItemCart[];
  address: string;
  phoneNumber: number;
  totalPrice: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paid: boolean;
}

export interface PaymentMethod {
  id: number | null;
  name: string;
}

export enum OrderStatus {
  CANCEL = "CANCEL",
  PENDING = "PENDING",
  SHIPPING = "SHIPPING",
  RECEIVED = "RECEIVED",
}
