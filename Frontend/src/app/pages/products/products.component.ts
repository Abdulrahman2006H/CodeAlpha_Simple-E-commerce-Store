import { Component, OnInit, signal , computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = ['All', 'Fiction', 'Self Development', 'Business', 'Children', 'History', 'Science', 'Novels'];

  search = signal('');
  selectedCategory = signal('All');

  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.loading = false;
      }
    });
  }
  filteredProducts = computed(() => {
  const searchValue = this.search().toLowerCase().trim();
  const category = this.selectedCategory();

  return this.products.filter(product => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchValue) ||
      product.author.toLowerCase().includes(searchValue);

    const matchesCategory =
      category === 'All' || product.category === category;

    return matchesSearch && matchesCategory;
  });
});
}