import { useSearchParams } from 'react-router';
import { useProducts } from './useProducts';

export const usePaginationMockData = () => {
   const { data } = useProducts();
   const productsData = data || [];
   const [searchParams] = useSearchParams();
   const queryPage = searchParams.get('page') || '1';
   const query = searchParams.get('query') || '';
   const queryCategory = searchParams.get('category') || 'All';
   const page = !isNaN(+queryPage) ? +queryPage : 1;
   const limit = 9;
   const offset = (page - 1) * limit;
   const filteredByCategoryProducts = productsData.filter(
      (product) => product.category === queryCategory,
   );
   const filteredByQueryProducts = productsData.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()),
   );

   const offsetProducts =
      queryCategory !== 'All'
         ? filteredByCategoryProducts.slice(offset, page * limit)
         : query
           ? filteredByQueryProducts.slice(offset, page * limit)
           : productsData.slice(offset, page * limit);
   const totalPages =
      queryCategory !== 'All'
         ? Math.ceil(filteredByCategoryProducts.length / limit)
         : query
           ? Math.ceil(filteredByQueryProducts.length / limit)
           : Math.ceil(productsData.length / limit);
   return { offsetProducts, totalPages };
};
