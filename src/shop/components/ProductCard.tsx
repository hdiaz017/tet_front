import { Badge } from '@/components/ui/badge';
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

   const isLowStock = true;
   return (
      <Card
         className='group border-0 shadow-none product-card-hover cursor-pointer relative'
         onClick={() => addItem(product)}
      >
         {isLowStock && (
            <Badge className='absolute top-2 right-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 z-100 rounded-full bg-destructive/10 text-destructive'>
               Low
            </Badge>
         )}
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
