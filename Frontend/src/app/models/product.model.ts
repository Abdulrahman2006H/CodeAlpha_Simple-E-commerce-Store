export interface Product {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  cover: string;
  description: string;
  format: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
