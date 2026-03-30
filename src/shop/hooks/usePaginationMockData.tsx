import { mockData } from '@/mock/mockData';
import { useSearchParams } from 'react-router';

export const usePaginationMockData = () => {
   const [searchParams] = useSearchParams();
   const queryPage = searchParams.get('page') || '1';
   const query = searchParams.get('query') || '';
   const queryCategory = searchParams.get('category') || 'All';
   const page = !isNaN(+queryPage) ? +queryPage : 1;
   const limit = 9;
   const offset = (page - 1) * limit;
   const filteredByCategoryProducts = mockData.filter(
      (product) => product.category === queryCategory,
   );
   const filteredByQueryProducts = mockData.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()),
   );
   console.log(filteredByQueryProducts);

   const offsetProducts =
      queryCategory !== 'All'
         ? filteredByCategoryProducts.slice(offset, page * limit)
         : query
           ? filteredByQueryProducts.slice(offset, page * limit)
           : mockData.slice(offset, page * limit);
   const totalPages =
      queryCategory !== 'All'
         ? Math.ceil(filteredByCategoryProducts.length / limit)
         : query
           ? Math.ceil(filteredByQueryProducts.length / limit)
           : Math.ceil(mockData.length / limit);
   return { offsetProducts, totalPages };
};
