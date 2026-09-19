import type { Product } from './product.interface';

export interface ProductsResponse {
   success: boolean;
   data: Product[];
}
export interface ProductResponse {
   success: boolean;
   data: Product;
}
