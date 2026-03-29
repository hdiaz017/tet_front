import { mockData } from '@/mock/mockData';
import { ProductCard } from './ProductCard';
import { FilterSideBar } from './FilterSideBar';

export const ProductsGrid = () => {
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
                        {mockData.map((product) => (
                           <ProductCard product={product} />
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};
