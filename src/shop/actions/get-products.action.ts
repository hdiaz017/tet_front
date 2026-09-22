import { tetApi } from '@/api/tetApi';
import type { ProductsResponse } from '@/types/products.response';

export const getProductsAction = async () => {
   const { data } = await tetApi.get<ProductsResponse>('products');
   console.log(data);

   return data.data;
};
