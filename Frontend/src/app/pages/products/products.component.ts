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
products = signal<Product[]>([]);
  categories: string[] = ['All', 'Finance', 'Self Development', 'Business', 'Children', 'History', 'Science', 'Novels'];

  search = signal('');
  selectedCategory = signal('All');

  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        //console.log(this.products);
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

  return this.products().filter(product => {
    const title = product.title?.toLowerCase() || '';
    const author = product.author?.toLowerCase() || '';
    const productCategory = product.category?.trim().toLowerCase() || '';

    const matchesSearch =
      title.includes(searchValue) ||
      author.includes(searchValue);

    const matchesCategory =
      category === 'All' ||
      productCategory === category.trim().toLowerCase();

    return matchesSearch && matchesCategory;
  });
});
}