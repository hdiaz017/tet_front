import type { Product } from '@/types/product.interface';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type CartItem = Product & {
   quantity: number;
};

interface CartState {
   cart: CartItem[];
   addToCart: (product: CartItem) => void;
   removeFromCart: (id: number) => void;
   updateQuantity: (id: number, quantity: number) => void;
   clearCart: () => void;
}

export const useCartStore = create<CartState>()(
   devtools((set) => ({
      cart: [],

      addToCart: (product) => {
         set((state) => {
            const existing = state.cart.find((p) => p.id === product.id);

            if (existing) {
               return {
                  cart: state.cart.map((p) =>
                     p.id === product.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p,
                  ),
               };
            }

            return {
               cart: [...state.cart, { ...product, quantity: 1 }],
            };
         });
      },

      removeFromCart(id: number) {
         set((state) => {
            return { cart: state.cart.filter((product) => product.id === id) };
         });
      },

      updateQuantity(id: number, quantity: number) {
         set((state) => {
            return {
               cart: state.cart.map((product) => {
                  return product.id === id
                     ? { ...product, quantity: product.quantity + quantity }
                     : product;
               }),
            };
         });
      },

      clearCart() {
         set({ cart: [] });
      },
   })),
);
