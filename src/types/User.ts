export interface RegisterRequest {
  username: string;
  password: string;
  name: string;
  age: number;
  phoneNumber: string;
  sex: boolean;
  adress: string;
  dateTime: string;
}

export interface RecieveInfo {
  name: string;
  phoneNumber: number;
  address: string;
  paymentMethod: number;
  email: string;
}

export interface UpdateUser {
  name: string;
  age: number;
  phoneNumber: number;
  sex: boolean;
  address: string;
  dateTime: Date;
}

export interface InforUser {
  name: string;
  age: number;
  phoneNumber: number;
  sex: boolean;
  address: string;
  dateTime: string;
}
