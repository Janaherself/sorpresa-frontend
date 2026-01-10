import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductItemResponse, ProductListResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private BASE_URL = 'https://sorpresa-api.onrender.com/api';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<ProductListResponse>(`${this.BASE_URL}/products`);
  }

  getProductById(id: string) {
    return this.http.get<ProductItemResponse>(`${this.BASE_URL}/products/${id}`);
  }
}
