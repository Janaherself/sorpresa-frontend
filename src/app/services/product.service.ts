import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private BASE_URL = 'https://sorpresa-api.onrender.com/api';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(`${this.BASE_URL}/products`);
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.BASE_URL}/products/${id}`);
  }
}
