import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Product } from '@/types/product.interface';

// import { Plus } from 'lucide-react';

interface Props {
   product: Product;
}

export const ProductCard = ({ product }: Props) => {
   const addItem = (product: Product) => {
      console.log(product);
   };

   //    const isLowStock = false;
   return (
      //   <button
      //      onClick={() => addItem(product)}
      //      className='group relative flex flex-col items-center rounded-xl border bg-card p-4 text-left transition-all hover:shadow-lg hover:border-primary/40 hover:-translate-y-0.5 active:scale-[0.98]'
      //   >
      //      {isLowStock && (
      //         <span className='absolute top-2 right-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-destructive/10 text-destructive'>
      //            Low
      //         </span>
      //      )}
      //      <span className='text-4xl mb-3'>{product.imageUrl}</span>
      //    <span className='text-sm font-medium text-card-foreground line-clamp-2 text-center w-full'>
      //       {product.name}
      //    </span>
      //      <span className='text-lg font-bold text-primary mt-1'>
      //         ${product.price.toFixed(2)}
      //      </span>
      //    <span className='text-xs text-muted-foreground mt-0.5'>
      //       {product.stock} in stock
      //    </span>
      //      <div className='absolute inset-0 rounded-xl flex items-center justify-center bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity'>
      //         <div className='w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md'>
      //            <Plus className='w-4 h-4' />
      //         </div>
      //      </div>
      //   </button>
      <Card className='group border-0 shadow-none product-card-hover cursor-pointer'>
         <CardContent className='p-0'>
            <div className='relative aspect-square overflow-hidden bg-muted rounded-lg'>
               <img
                  src={product.imageUrl}
                  alt={product.name}
                  className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
               />

               <div className='image-overlay' />
            </div>

            <div className='pt-6 px-4 pb-4 space-y-3'>
               <div className='space-y-1'>
                  <h3 className='font-medium text-sm tracking-tight'>
                     {product.name}
                  </h3>
                  <p className='text-xs text-muted-foreground uppercase'>
                     {product.category}
                     {/* <span className='font-bold'>{sizes.join(' - ')}</span> */}
                  </p>
                  <span className='text-xs text-muted-foreground mt-0.5'>
                     {product.stock} in stock
                  </span>
               </div>

               <div className='flex items-center justify-between'>
                  <p className='font-semibold text-lg'>${product.price}</p>
                  <Button
                     size='sm'
                     variant='outline'
                     className='opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground border-primary/20 text-xs px-4 py-2 h-8'
                     onClick={() => addItem(product)}
                  >
                     Agregar al carrito
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
   );
};
