export interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  offer_price: string;
  bar_code: number;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}
