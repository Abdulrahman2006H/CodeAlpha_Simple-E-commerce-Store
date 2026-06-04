import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
categories = [
  { name: 'Fiction', icon: 'assets/icons/flask.svg' },
  { name: 'Self Development', icon: 'assets/icons/briefcase.svg' },
  { name: 'Business', icon: 'assets/icons/card.svg' },
  { name: 'Children', icon: 'assets/icons/children.svg' },
  { name: 'History', icon: '../../../assets/icons/return.svg' },
  { name: 'Science', icon: '../../../assets/icons/shield.svg' },
  { name: 'Novels', icon: '../../../assets/icons/leaf.svg' }
];
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading books:', err);
        this.loading = false;
      }
    });
  }
}