import { getSalesAction } from '@/shop/actions/get-sales.action';
import { useQuery } from '@tanstack/react-query';

export const useSales = () => {
   return useQuery({
      queryKey: ['sales'], // Llave única para el caché
      queryFn: getSalesAction, // Función del servicio
      staleTime: 1000 * 60 * 60,
   });
};
