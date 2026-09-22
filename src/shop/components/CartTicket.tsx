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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export const CartTicket = () => {
   const cart = useCartStore((state) => state.cart);
   const removeFromCart = useCartStore((state) => state.removeFromCart);
   const {
      totalCart,
      quantityField,
      checkout,
      isPending,
      change,
      setAmountPaid,
      isPaymentSufficient,
      amountPaid,
   } = useCartTicket(cart);

   return (
      <div className='w-150 space-y-6 max-h-125 overflow-y-auto '>
         <div className='border rounded-lg p-4'>
            <TicketTitle
               checkout={() => checkout(cart)}
               isPending={isPending}
               disabled={isPaymentSufficient}
            />

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
                        <TableCell className='font-medium'>
                           {item.name}
                        </TableCell>
                        <TableCell className='flex items-center gap-2'>
                           {quantityField(
                              item.id,
                              item.quantity,
                              item.stockQuantity,
                           )}
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
                     <TableCell className='text-right'>
                        {totalCart.toLocaleString('mx-Mx', {
                           style: 'currency',
                           currency: 'MXN',
                        })}
                     </TableCell>
                  </TableRow>
               </TableFooter>
            </Table>
         </div>

         {/* SECCIÓN DE PAGO Y CAMBIO */}
         <div className='grid grid-cols-2 gap-4 p-4 bg-white rounded-lg border'>
            <div className='space-y-2'>
               <Label htmlFor='amount'>Dinero Recibido</Label>
               <Input
                  id='amount'
                  type='number'
                  placeholder='0.00'
                  value={amountPaid || ''}
                  onChange={(e) => setAmountPaid(Number(e.target.value))}
                  className='text-right'
               />
            </div>
            <div className='flex flex-col justify-end text-right space-y-1'>
               <span className='text-sm text-muted-foreground'>
                  Cambio a entregar:
               </span>
               <span
                  className={`text-2xl font-bold ${change < 0 ? 'text-red-500' : 'text-green-600'}`}
               >
                  {change < 0 ? 'Insuficiente' : `$${change.toFixed(2)}`}
               </span>
            </div>
         </div>
      </div>
   );
};
