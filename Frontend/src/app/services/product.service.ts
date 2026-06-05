import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/Books`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(books => books.map(book => this.mapBookToProduct(book)))
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(book => this.mapBookToProduct(book))
    );
  }

  addBook(book: any): Observable<any> {
    return this.http.post(this.apiUrl, book);
  }

  updateBook(id: number, book: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

private mapBookToProduct(book: any): Product {
  const coverPath =
    book.imageUrl ||
    book.ImageUrl ||
    book.cover ||
    book.image ||
    '/images/books/book-placeholder.jpg';

  const image = coverPath.startsWith('http')
    ? coverPath
    : `${environment.serverUrl}${coverPath}`;

  return {
    id: book.id,
    title: book.title || book.name,
    author: book.author || 'Unknown Author',
    category: book.category || 'Books',
    price: book.price,
    oldPrice: book.oldPrice,
    rating: book.rating || 4.5,

    image: image,
    cover: image,

    description: book.description || 'No description available.',
    format: book.format || 'Paperback'
  };
}
}