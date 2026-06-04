import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  readonly quantity = signal(1);
  readonly product = computed(() => this.productService.getProduct(Number(this.route.snapshot.paramMap.get('id'))));

  increment(): void { this.quantity.update(value => value + 1); }
  decrement(): void { this.quantity.update(value => Math.max(1, value - 1)); }

  addToCart(): void {
    const product = this.product();
    if (product) this.cartService.addToCart(product, this.quantity());
  }
}
