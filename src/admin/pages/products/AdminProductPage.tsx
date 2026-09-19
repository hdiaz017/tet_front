import { Navigate, useParams } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { ProductForm } from './components/ProductForm';

export const AdminProductPage = () => {
   const { id } = useParams();
   const { data: product, isLoading, isError } = useProduct(id || '');
   console.log({ product, isLoading });

   const productTitle = id === 'new' ? 'Nuevo producto' : 'Editar producto';
   const productSubtitle =
      id === 'new'
         ? 'Aquí puedes crear un nuevo producto.'
         : 'Aquí puedes editar el producto.';

   if (isError) {
      return <Navigate to='/admin/products' />;
   }
   if (!product) {
      return <Navigate to='/admin/products' />;
   }

   return (
      <ProductForm
         product={product}
         title={productTitle}
         subtitle={productSubtitle}
      />
   );
};
