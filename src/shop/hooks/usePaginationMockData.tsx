import { mockData } from '@/mock/mockData';
import { useSearchParams } from 'react-router';

export const usePaginationMockData = () => {
   const [searchParams] = useSearchParams();
   const queryPage = searchParams.get('page') || '1';
   const page = !isNaN(+queryPage) ? +queryPage : 1;
   const limit = 9;
   const totalPages = Math.ceil(mockData.length / limit);
   const offset = (page - 1) * limit;
   const offsetProducts = mockData.slice(offset, page * limit);
   return { offsetProducts, totalPages };
};
