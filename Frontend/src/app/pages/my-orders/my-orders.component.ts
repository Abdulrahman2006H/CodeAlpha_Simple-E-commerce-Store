import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (!userId) {
      this.router.navigateByUrl('/login');
      return;
    }

this.orderService.getOrdersByUser(Number(userId)).subscribe({
  next: (data: any) => {
    console.log('My orders:', data);

    if (Array.isArray(data)) {
      this.orders = data;
    } else {
      this.orders = [data];
    }

    this.loading = false;
  },
  error: (err) => {
    console.error('Orders error:', err);
    this.errorMessage = 'You have no orders yet.';
    this.loading = false;
  }
});
  }
}