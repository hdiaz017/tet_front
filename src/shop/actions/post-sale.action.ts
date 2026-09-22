import { tetApi } from '@/api/tetApi';
import type { Sale } from '@/types/product.interface';

export const postSaleAction = async (sale: Sale) => {
   const { data } = await tetApi.post('/sales', sale);
   return data;
};
