import { tetApi } from '@/api/tetApi';
import type { SalesResponse } from '@/types/products.response';

export const getSalesAction = async (): Promise<SalesResponse> => {
   const { data } = await tetApi.get('/sales');
   console.log(data);

   return data;
};
