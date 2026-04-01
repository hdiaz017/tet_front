import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useSearchParams } from 'react-router';

interface Props {
   totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
   const [searchParams, setSearchParams] = useSearchParams();
   const queryPage = searchParams.get('page') || '1';
   const page = !isNaN(+queryPage) ? +queryPage : 1;

   const handlePageChange = (page: number) => {
      if (page < 1 || page > 3) return;

      searchParams.set('page', page.toString());
      setSearchParams(searchParams);
   };
   return (
      <div
         className='flex
      justify-center space-x-2 items-center'
      >
         <Button
            variant={'outline'}
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            size='sm'
         >
            <ChevronLeft className={'h-4 w-4'} />
            Anterior
         </Button>
         {Array.from({ length: totalPages }).map((_, i) => {
            return (
               <Button
                  variant={page === i + 1 ? 'default' : 'outline'}
                  onClick={() => handlePageChange(i + 1)}
                  size={'sm'}
                  key={i + 1}
               >
                  {i + 1}
               </Button>
            );
         })}
         <Button
            variant={'outline'}
            disabled={page === 3}
            onClick={() => handlePageChange(page + 1)}
            size={'sm'}
         >
            Siguiente
            <ChevronRight className={'h-4 w-4'} />
         </Button>
      </div>
   );
};
