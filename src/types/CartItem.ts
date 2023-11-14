export interface ItemCart {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface CartType {
  username: string;
  totalPrice: number;
  items: ItemCart[];
}

export interface AddCart {
  user: string;
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}
