import { RouterProvider } from 'react-router';
import { appRouter } from './app.router';
import { Toaster } from '@/components/ui/sonner';

export const TetShopApp = () => {
   return (
      <>
         <Toaster richColors theme='light' position='top-center' />
         <RouterProvider router={appRouter} />
      </>
   );
};
