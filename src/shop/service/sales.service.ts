import type { Sale } from '@/types/product.interface';

export const saveSale = (sale: Sale) => {
   const sales: Sale[] = JSON.parse(localStorage.getItem('sales') || '[]');
   sales.push(sale);
   localStorage.setItem('sales', JSON.stringify(sales));
};
