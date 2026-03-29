import { Button } from '@/components/ui/button';
import type { Category } from '@/types/product.interface';

export const FilterSideBar = () => {
   const categories: Category[] = [
      'All',
      'Bebidas',
      'Dulces',
      'Galletas',
      'Impresión',
   ];
   return (
      <div className='w-64 space-y-6'>
         <div>
            <h3 className='font-semibold text-lg mb-4'>Filtros</h3>
         </div>

         {/* Sizes */}
         <div className='space-y-4'>
            <h4 className='font-medium'>Tallas</h4>
            <div className='grid grid-cols-3 gap-2'>
               {categories.map((category) => (
                  <Button
                     key={category}
                     //  variant='outline'
                     variant={
                        // currentSizes.includes(category) ? 'default' : 'outline'
                        'default'
                     }
                     size='sm'
                     className='h-8'
                     //  onClick={() => handleSizesChange(category)}
                  >
                     {category}
                  </Button>
               ))}
            </div>
         </div>
      </div>
   );
};
