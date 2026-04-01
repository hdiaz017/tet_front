import type { CartItem } from '@/store/cart.store';

export const useCartTotal = (cart: CartItem[]) => {
   const totalCart = cart
      .reduce((acc, item) => {
         return (acc += item.price * item.quantity);
      }, 0)
      .toLocaleString('mx-Mx', { style: 'currency', currency: 'USD' });

   return {
      totalCart,
   };
};
