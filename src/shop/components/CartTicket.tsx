import {
   Table,
   TableBody,
   TableCell,
   TableFooter,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { useCartStore } from '@/store/cart.store';
import { useCartTotal } from '../hooks/useCartTotal';
import { TicketTitle } from './TicketTitle';

import { Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CartTicket = () => {
   const cart = useCartStore((state) => state.cart);
   const updateQuantity = useCartStore((state) => state.updateQuantity);
   const removeFromCart = useCartStore((state) => state.removeFromCart);
   const { totalCart } = useCartTotal(cart);

   const quantityField = (id: number, quantity: number, stock: number) => (
      <>
         <Button
            variant={'secondary'}
            size={'sm'}
            className={'h-4 w-4 hover:bg-primary hover:text-white'}
            onClick={() => updateQuantity(id, -1)}
            disabled={quantity === 1}
         >
            <Minus />
         </Button>
         {quantity}
         <Button
            variant={'secondary'}
            size={'sm'}
            className={'h-4 w-4 hover:bg-primary hover:text-white'}
            onClick={() => updateQuantity(id, +1)}
            disabled={quantity === stock}
         >
            <Plus />
         </Button>
      </>
   );
   return (
      <div className='w-110 space-y-6 max-h-125 overflow-y-auto '>
         <TicketTitle />

         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead className='w-25'>Producto</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead className='text-right'>Subtotal</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {cart.map((item) => (
                  <TableRow key={item.id}>
                     <TableCell className='font-medium'>{item.name}</TableCell>
                     <TableCell className='flex items-center gap-2'>
                        {quantityField(item.id, item.quantity, item.stock)}
                     </TableCell>
                     <TableCell>${item.price.toFixed(2)}</TableCell>
                     <TableCell className='text-right'>
                        ${(item.price * item.quantity).toFixed(2)}
                     </TableCell>
                     <TableCell
                        className='text-red-800 cursor-pointer'
                        onClick={() => removeFromCart(item.id)}
                     >
                        <X size={15} />
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
            <TableFooter>
               <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className='text-right'>{totalCart}</TableCell>
               </TableRow>
            </TableFooter>
         </Table>
      </div>
   );
};
