import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product = signal<Product | null>(null);
  quantity = signal(1);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(id).subscribe({
      next: (book) => {
        this.product.set(book);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading book details:', err);
        this.product.set(null);
        this.loading.set(false);
      }
    });
  }

  increment(): void {
    this.quantity.update(value => value + 1);
  }

  decrement(): void {
    this.quantity.update(value => value > 1 ? value - 1 : 1);
  }

  addToCart(): void {
    const book = this.product();

    if (!book) return;

    this.cartService.addToCart(book, this.quantity());
  }
}