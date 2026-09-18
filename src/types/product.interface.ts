// export interface Product {
//    id: number;
//    name: string;
//    price: number;
//    category: Category;
//    stock: number;
//    imageUrl: string;
// }

export type Category = 'All' | 'Bebidas' | 'Dulces' | 'Galletas' | 'Impresión';

// export interface Sale {
//    id: number;
//    total: number;
//    items: CartItem[];
//    createdAt: Date;
// }

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
