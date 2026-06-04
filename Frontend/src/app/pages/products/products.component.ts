import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  private readonly productService = inject(ProductService);
  readonly products = this.productService.getProducts();
  readonly categories = ['All Categories', ...this.productService.getCategories()];
  readonly selectedCategory = signal('All Categories');
  readonly search = signal('');

  readonly filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const term = this.search().trim().toLowerCase();

    return this.products.filter(product => {
      const matchesCategory = category === 'All Categories' || product.category === category;
      const matchesSearch = !term || product.title.toLowerCase().includes(term) || product.author.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  });
}
