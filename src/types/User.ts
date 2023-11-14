export interface RegisterRequest {
  username: string;
  password: string;
  name: string;
  age: number;
  phoneNumber: string;
  sex: boolean;
  adress: string;
}

export interface RecieveInfo {
  name: string;
  phoneNumber: number;
  address: string;
  paymentMethod: number;
  email: string;
}
