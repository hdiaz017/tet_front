import React from 'react';
import { ProductCard } from './ProductCard';

export const ProductsGrid = () => {
   const products: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
   return (
      <section className='py-12 px-4'>
         <div className='container mx-auto'>
            <div className='flex items-center justify-between mb-8'>
               <div className='flex-1'>
                  <div className='grid grid-cols-3 gap-6'>
                     {products.map(
                        (product) =>
                           // <ProductCard />
                           product,
                     )}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};
