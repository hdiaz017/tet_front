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
import { useCartTicket } from '../hooks/useCartTotal';
import { TicketTitle } from './TicketTitle';
import { X } from 'lucide-react';

export const CartTicket = () => {
   const cart = useCartStore((state) => state.cart);
   const removeFromCart = useCartStore((state) => state.removeFromCart);
   const { totalCart, quantityField, checkout } = useCartTicket(cart);

   return (
      <div className='w-110 space-y-6 max-h-125 overflow-y-auto '>
         <TicketTitle checkout={checkout} />

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
