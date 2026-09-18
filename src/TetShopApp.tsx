import { RouterProvider } from 'react-router';
import { appRouter } from './app.router';
import { Toaster } from '@/components/ui/sonner';
import { useEffect, type PropsWithChildren } from 'react';
import { useAuthStore } from './store/auth.store';
// import { TestAuth } from './auth/TestAuth';

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
   const { hydrate } = useAuthStore();
   useEffect(() => {
      hydrate();
   }, [hydrate]);

   return children;
};

export const TetShopApp = () => {
   console.log('raaa');

   return (
      <>
         <Toaster richColors theme='light' position='top-center' />

         <CheckAuthProvider>
            <RouterProvider router={appRouter} />
         </CheckAuthProvider>
         {/* <TestAuth /> */}
      </>
   );
};
