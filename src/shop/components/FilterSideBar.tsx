import { Button } from '@/components/ui/button';
import type { Category } from '@/types/product.interface';
import { useSearchParams } from 'react-router';

export const FilterSideBar = () => {
   const [searchParams, setSearchParams] = useSearchParams();

   const categoryParam = searchParams.get('category') || 'All';
   const handleCategoryChange = (category: string) => {
      searchParams.set('page', '1');
      searchParams.set('category', category);
      setSearchParams(searchParams);
   };

   const categories: Category[] = [
      'All',
      'Bebidas',
      'Dulces',
      'Galletas',
      'Impresión',
   ];
   return (
      <div className='w-64 space-y-6 '>
         <div>
            <h3 className='font-semibold text-lg mb-4'>Categorías</h3>
         </div>

         {/* Categories */}
         <div className='space-y-4'>
            <div className='grid grid-cols-3 gap-2'>
               {categories.map((category) => (
                  <Button
                     key={category}
                     variant={
                        categoryParam === category ? 'default' : 'outline'
                     }
                     size='sm'
                     className='h-8'
                     onClick={() => handleCategoryChange(category)}
                  >
                     {category}
                  </Button>
               ))}
            </div>
         </div>
      </div>
   );
};
