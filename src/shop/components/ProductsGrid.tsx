import { ProductCard } from './ProductCard';
import { FilterSideBar } from './FilterSideBar';
import { usePaginationMockData } from '../hooks/usePaginationMockData';

export const ProductsGrid = () => {
   const { offsetProducts } = usePaginationMockData();
   return (
      <section className='py-12 px-8'>
         <div className='container mx-auto'>
            <div className='flex items-center justify-between mb-8'>
               <div className='flex gap-8'>
                  <div>
                     <FilterSideBar />
                  </div>

                  <div className='flex-1'>
                     <div className='grid grid-cols-3 gap-5'>
                        {offsetProducts.map((product) => (
                           <ProductCard product={product} key={product.id} />
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};
