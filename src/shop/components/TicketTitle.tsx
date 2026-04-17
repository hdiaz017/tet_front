import { Button } from '@/components/ui/button';

interface Props {
   checkout: () => void;
}

export const TicketTitle = ({ checkout }: Props) => {
   return (
      <div className='flex justify-between'>
         <h3 className='font-semibold text-lg mb-4'>Ticket de Compra</h3>
         <div className='flex justify-between space-x-3'>
            {/* <Button variant={'outline'} className={''} onClick={clearCartAlert}>
               Limpiar Ticket
            </Button> */}
            <Button
               className=' bg-green-600 text-white py-3 text-lg font-bold'
               onClick={checkout}
            >
               Cobrar
            </Button>
         </div>
      </div>
   );
};
