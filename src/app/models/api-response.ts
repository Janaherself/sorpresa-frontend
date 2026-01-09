import { Product } from "./product";

export interface APIResponse {
  success: boolean;
  data: Product[];
}