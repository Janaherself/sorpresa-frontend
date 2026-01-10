import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private BASE_URL = 'https://sorpresa-api.onrender.com/api';

  constructor(private http: HttpClient) {}

  placeOrder(order: Order) {
    return this.http.post(`${this.BASE_URL}/orders`, order);
  }
}
