import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments';

export interface CreateOrderItem {
  bookId: number;
  quantity: number;
}

export interface CreateOrder {
  userId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  items: CreateOrderItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/Orders`;

  constructor(private http: HttpClient) {}

  createOrder(order: CreateOrder): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

  getOrdersByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }
}