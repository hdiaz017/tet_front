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
   itemsCount: number;
   createdAt: Date;
}
