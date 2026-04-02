import { useCartStore, type CartItem } from '@/store/cart.store';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

export const useCartTicket = (cart: CartItem[]) => {
   const updateQuantity = useCartStore((state) => state.updateQuantity);
   const clearCart = useCartStore((state) => state.clearCart);
   const totalCart = cart
      .reduce((acc, item) => {
         return (acc += item.price * item.quantity);
      }, 0)
      .toLocaleString('mx-Mx', { style: 'currency', currency: 'USD' });

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

   const checkout = () => {
      if (!cart.length) return;
      console.log('Venta realizada', totalCart);
      clearCart();
   };

   return {
      totalCart,
      checkout,
      quantityField,
   };
};
