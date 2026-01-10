import { Product } from "./product";

export interface ProductListResponse {
  success: boolean;
  data: Product[];
}

export interface ProductItemResponse {
  success: boolean;
  data: Product;
}