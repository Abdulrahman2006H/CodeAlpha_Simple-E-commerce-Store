import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  customerName = '';
  customerEmail = '';
  customerPhone = '';
  address = '';

  loading = false;
  errorMessage = '';

constructor(
  public cartService: CartService,
  private authService: AuthService,
  private orderService: OrderService,
  private router: Router
) {}

  submitOrder(): void {
    this.errorMessage = '';

    const userId = this.authService.getUserId();
    console.log(userId);
    if (!userId) {
      this.errorMessage = 'Please login first.';
      this.router.navigateByUrl('/login');
      return;
    }

    if (!this.customerName || !this.customerEmail || !this.customerPhone || !this.address) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    const cartItems = this.cartService.getCart();

    if (cartItems.length === 0) {
      this.errorMessage = 'Your cart is empty.';
      return;
    }

    const order = {
      userId: userId,
      customerName: this.customerName,
      customerEmail: this.customerEmail,
      customerPhone: this.customerPhone,
      address: this.address,
      items: cartItems.map((item: any) => ({
        bookId: item.product.id,
        quantity: item.quantity
      }))
    };

    this.loading = true;

    this.orderService.createOrder(order).subscribe({
      next: () => {
        this.cartService.clearCart();
        alert('Order placed successfully!');
        this.router.navigateByUrl('/my-orders');
      },
      error: (err) => {
        console.error('Order error:', err);
        this.errorMessage = err?.error || 'Failed to place order.';
        this.loading = false;
      }
    });
  }
}