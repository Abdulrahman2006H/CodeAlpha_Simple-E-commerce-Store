import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  readonly cartService = inject(CartService);
  readonly delivery = 0;
  readonly Math = Math;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  total(): number {
    return this.cartService.total() + this.delivery;
  }

   proceedToCheckout(): void {
    const user = this.authService.getUser();

    if (!user) {
      alert('Please login first before checkout.');
      this.router.navigateByUrl('/login');
      return;
    }

    this.router.navigateByUrl('/checkout');
  }
}
