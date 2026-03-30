import { CustomPagination } from '@/components/custom/CustomPagination';
import { ProductsGrid } from '@/shop/components/ProductsGrid';
import { usePaginationMockData } from '@/shop/hooks/usePaginationMockData';

export const HomePage = () => {
   const { totalPages } = usePaginationMockData();
   return (
      <>
         <ProductsGrid />
         <CustomPagination totalPages={totalPages} />
      </>
   );
};
