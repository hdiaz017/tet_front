import { AdminTitle } from '@/admin/custom/AdminTitle';

import { Pencil, Plus } from 'lucide-react';
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

import { useNavigate, Link } from 'react-router'; // Importante
import { cn } from '@/lib/utils';

import { usePaginationMockData } from '@/shop/hooks/usePaginationMockData';
import { CustomPagination } from '@/components/custom/CustomPagination';

export const AdminProductsPage = () => {
   // 1. Obtenemos el término de búsqueda directamente de la URL
   // const [searchParams] = useSearchParams();
   const navigate = useNavigate();
   // const searchQuery = searchParams.get('q') || '';
   const { offsetProducts, totalPages } = usePaginationMockData();

   return (
      <div className='p-6 space-y-6'>
         <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <AdminTitle
               title='Productos'
               subtitle='Aquí puedes ver y administrar tu prodcutos'
            />

            <Link to='/admin/products/new'>
               <Button className='flex gap-2'>
                  <Plus className='h-4 w-4' /> Agregar Producto
               </Button>
            </Link>
         </div>

         <div className='border rounded-md bg-white shadow-sm'>
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead className='w-100'>ID</TableHead>
                     <TableHead className='w-50'>Imagen</TableHead>
                     <TableHead>Producto</TableHead>
                     <TableHead>Categoría</TableHead>
                     <TableHead>Precio</TableHead>
                     <TableHead>Stock</TableHead>
                     <TableHead className='text-right'>Acciones</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {offsetProducts.length > 0 ? (
                     offsetProducts.map((product) => (
                        <TableRow key={product.id}>
                           <TableCell>{product.id}</TableCell>
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
                                    navigate(`/admin/products/${product.id}`)
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
         <CustomPagination totalPages={totalPages} />
      </div>
   );
};
