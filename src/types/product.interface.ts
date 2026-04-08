export interface Product {
   id: number;
   name: string;
   price: number;
   category: Category;
   stock: number;
   imageUrl: string;
}

export type Category = 'All' | 'Bebidas' | 'Dulces' | 'Galletas' | 'Impresión';

export interface Sale {
   id: number;
   total: number;
   items: CartItem[];
   createdAt: Date;
}

export type CartItem = Product & {
   quantity: number;
};

export interface CartState {
   cart: CartItem[];
   isLowStock: (id: number) => boolean;
   addToCart: (product: CartItem) => void;
   removeFromCart: (id: number) => void;
   updateQuantity: (id: number, quantity: number) => void;
   clearCart: () => void;
}
