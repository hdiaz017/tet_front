import { useCartStore } from '@/store/cart.store';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import type { CartItem, Item, Sale } from '@/types/product.interface';

import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { postSaleAction } from '../actions/post-sale.action';
import { useState } from 'react';

export const useCartTicket = (cart: CartItem[]) => {
   const queryClient = useQueryClient();
   const [amountPaid, setAmountPaid] = useState<number>(0);
   const totalCart = cart.reduce((acc, item) => {
      return (acc += item.price * item.quantity);
   }, 0);
   const change = amountPaid - totalCart;
   const isPaymentSufficient = amountPaid >= totalCart && totalCart > 0;

   const updateQuantity = useCartStore((state) => state.updateQuantity);

   const clearCart = useCartStore((state) => state.clearCart);

   const quantityField = (id: string, quantity: number, stock: number) => (
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

   const { mutate: checkout, isPending } = useMutation({
      mutationFn: async (cartItems: CartItem[]) => {
         // 1. MAPEAMOS el CartItem[] al formato Item[] que pide tu interfaz
         const saleItems: Item[] = cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            priceAtSale: item.price,
         }));

         // 2. CONSTRUIMOS la venta según tu interfaz Sale
         const sale: Sale = {
            id: '', // Generalmente el backend lo genera
            externalSaleId: uuidv4(),
            items: saleItems,
            totalAmount: Number(totalCart),
            soldAt: new Date(), // Objeto Date como pide tu interfaz
         };

         return await postSaleAction(sale);
      },
      onSuccess: () => {
         clearCart();
         toast.success('Venta realizada con éxito');
         queryClient.invalidateQueries({ queryKey: ['products'] });
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
         const message =
            error.response?.data?.message || 'Error al procesar la venta';
         toast.error(message);
      },
   });

   return {
      amountPaid,
      change,
      isPaymentSufficient,
      isPending,
      totalCart,
      checkout,
      quantityField,
      setAmountPaid,
   };
};
