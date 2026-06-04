export interface Product {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  format: 'Paperback' | 'Hardcover' | 'eBook';
  image: string;
  cover: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
