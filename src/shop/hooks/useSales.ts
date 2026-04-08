import { getSales } from '@/service/sale.service';

export const useSales = () => {
   const sales = getSales();

   const salesByDay = sales.reduce(
      (acc, sale) => {
         const date = new Date(sale.createdAt).toDateString();

         if (!acc[date]) acc[date] = 0;
         acc[date] += sale.total;
         return acc;
      },
      {} as Record<string, number>,
   );

   const totalRevenue = sales.reduce((acc, sale) => {
      acc += sale.total;
      return acc;
   }, 0);

   return {
      salesByDay,
      totalRevenue,
   };
};
