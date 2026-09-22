export type Category = 'All' | 'Bebidas' | 'Dulces' | 'Galletas' | 'Papeleria';

export type CartItem = Product & {
   quantity: number;
};

export interface CartState {
   cart: CartItem[];
   isLowStock: (id: number) => boolean;
   addToCart: (product: CartItem) => void;
   removeFromCart: (id: string) => void;
   updateQuantity: (id: string, quantity: number) => void;
   clearCart: () => void;
}

export interface Sale {
   id: string;
   externalSaleId: string;
   items: Item[];
   totalAmount: number;
   soldAt: Date;
}

export interface Item {
   productId: string;
   quantity: number;
   priceAtSale: number;
}

export interface Product {
   id: string;
   name: string;
   description: string;
   price: number;
   stockQuantity: number;
   category: string;
   image: string;
   createdAt?: Date;
   updatedAt?: Date;
}
