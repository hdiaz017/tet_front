import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart.store';

export const TicketTitle = () => {
   const clearCart = useCartStore((state) => state.clearCart);
   return (
      <div className='flex justify-between'>
         <h3 className='font-semibold text-lg mb-4'>Ticket de Compra</h3>
         <div className='flex justify-between space-x-3'>
            <Button variant={'outline'} className={''} onClick={clearCart}>
               Limpiar Ticket
            </Button>
            <Button variant={'outline'}>Venta</Button>
         </div>
      </div>
   );
};
