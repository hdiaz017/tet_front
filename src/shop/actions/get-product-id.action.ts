import { tetApi } from '@/api/tetApi';
import type { Product } from '@/types/product.interface';
import type { ProductResponse } from '@/types/products.response';

export const getProductByIdAction = async (id: string): Promise<Product> => {
   if (!id) throw new Error('Id is required');
   if (id === 'new') {
      return {
         name: '',
         description: '',
         price: 0,
         stockQuantity: 0,
         category: '',
         image: '',
      } as unknown as Product;
   }
   const { data } = await tetApi.get<ProductResponse>(`products/${id}`);

   return data.data;
};
