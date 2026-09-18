import { AdminTitle } from '@/admin/custom/AdminTitle';

import { Pencil, Plus, MoreHorizontal } from 'lucide-react';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import {
//    DropdownMenu,
//    DropdownMenuContent,
//    DropdownMenuItem,
//    DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
import { useSearchParams } from 'react-router'; // Importante
import { cn } from '@/lib/utils';

export interface Product {
   id: string;
   name: string;
   description: string;
   price: number;
   stockQuantity: number;
   category: string;
   image: string;
   createdAt: Date;
   updatedAt: Date;
}

const MOCK_PRODUCTS: Product[] = [
   {
      id: '1',
      name: 'Camiseta Oversize Blanca',
      description: 'Algodón 100% orgánico, corte holgado',
      price: 29.99,
      stockQuantity: 45,
      category: 'Ropa',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100',
      createdAt: new Date(),
      updatedAt: new Date(),
   },
];

export const AdminProductsPage = () => {
   // 1. Obtenemos el término de búsqueda directamente de la URL
   const [searchParams] = useSearchParams();
   const searchQuery = searchParams.get('q') || '';

   // 2. Filtramos los productos basándonos en ese término
   const filteredProducts = MOCK_PRODUCTS.filter(
      (product) =>
         product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         product.category.toLowerCase().includes(searchQuery.toLowerCase()),
   );

   return (
      <div className='p-6 space-y-6'>
         <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <AdminTitle
               title='Productos'
               subtitle='Aquí puedes ver y administrar tu prodcutos'
            />
            <Button className='flex gap-2'>
               <Plus className='h-4 w-4' /> Agregar Producto
            </Button>
         </div>

         <div className='border rounded-md bg-white shadow-sm'>
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead className='w-[80px]'>Imagen</TableHead>
                     <TableHead>Producto</TableHead>
                     <TableHead>Categoría</TableHead>
                     <TableHead>Precio</TableHead>
                     <TableHead>Stock</TableHead>
                     <TableHead className='text-right'>Acciones</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {filteredProducts.length > 0 ? (
                     filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                           <TableCell>
                              <img
                                 src={product.image}
                                 alt={product.name}
                                 className='w-10 h-10 rounded-md object-cover border'
                              />
                           </TableCell>
                           <TableCell>
                              <div className='flex flex-col'>
                                 <span className='font-medium'>
                                    {product.name}
                                 </span>
                                 <span className='text-xs text-muted-foreground truncate max-w-[200px]'>
                                    {product.description}
                                 </span>
                              </div>
                           </TableCell>
                           <TableCell>
                              <Badge
                                 variant='secondary'
                                 className='font-normal'
                              >
                                 {product.category}
                              </Badge>
                           </TableCell>
                           <TableCell className='font-medium'>
                              ${product.price.toFixed(2)}
                           </TableCell>
                           <TableCell>
                              <div className='flex items-center gap-2'>
                                 <span
                                    className={cn(
                                       'text-sm',
                                       product.stockQuantity < 10
                                          ? 'text-red-500 font-bold'
                                          : 'text-muted-foreground',
                                    )}
                                 >
                                    {product.stockQuantity} uds
                                 </span>
                              </div>
                           </TableCell>
                           <TableCell className='text-right'>
                              <Button
                                 variant='ghost'
                                 size='sm'
                                 className='gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                                 onClick={() =>
                                    console.log(
                                       `Editando producto ${product.id}`,
                                    )
                                 }
                              >
                                 <Pencil className='h-4 w-4' />
                                 Editar
                              </Button>
                           </TableCell>
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell
                           colSpan={6}
                           className='h-32 text-center text-muted-foreground'
                        >
                           No se encontraron productos que coincidan con la
                           búsqueda.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
      </div>
   );
};
