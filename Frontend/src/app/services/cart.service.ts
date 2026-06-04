import { Injectable, signal } from '@angular/core';
import { CartItem, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'bookmuse-cart';
  readonly items = signal<CartItem[]>(this.loadCart());

  addToCart(product: Product, quantity = 1): void {
    const current = [...this.items()];
    const found = current.find(item => item.product.id === product.id);

    if (found) {
      found.quantity += quantity;
    } else {
      current.push({ product, quantity });
    }

    this.save(current);
  }

  increase(productId: number): void {
    const current = this.items().map(item =>
      item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    this.save(current);
  }

  decrease(productId: number): void {
    const current = this.items()
      .map(item => item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item)
      .filter(item => item.quantity > 0);
    this.save(current);
  }

  remove(productId: number): void {
    this.save(this.items().filter(item => item.product.id !== productId));
  }

  total(): number {
    return this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  count(): number {
    return this.items().reduce((sum, item) => sum + item.quantity, 0);
  }

  private save(items: CartItem[]): void {
    this.items.set(items);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  private loadCart(): CartItem[] {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) as CartItem[] : [];
  }
}
