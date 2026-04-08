import { useCartStore } from '@/store/cart.store';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import type { CartItem, Sale } from '@/types/product.interface';
import { saveSale } from '@/service/sale.service';
import { toast } from 'sonner';

export const useCartTicket = (cart: CartItem[]) => {
   const updateQuantity = useCartStore((state) => state.updateQuantity);

   const clearCart = useCartStore((state) => state.clearCart);
   const totalCart = cart.reduce((acc, item) => {
      return (acc += item.price * item.quantity);
   }, 0);

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

   const checkout = (cart: CartItem[]) => {
      if (!cart.length) return;
      const sale: Sale = {
         id: Date.now(),
         items: cart,
         total: Number(totalCart),
         createdAt: new Date(),
      };
      saveSale(sale);
      clearCart();
      toast.success('Venta realizada!');
   };

   return {
      totalCart,
      checkout,
      quantityField,
   };
};
