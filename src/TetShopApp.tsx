import { RouterProvider } from 'react-router';
import { appRouter } from './app.router';
import { Toaster } from '@/components/ui/sonner';
import { useEffect, type PropsWithChildren } from 'react';
import { useAuthStore } from './store/auth.store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { TestAuth } from './auth/TestAuth';

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
   const { hydrate } = useAuthStore();
   useEffect(() => {
      hydrate();
   }, [hydrate]);

   return children;
};

const queryClient = new QueryClient();

export const TetShopApp = () => {
   return (
      <QueryClientProvider client={queryClient}>
         {/* The rest of your application */}
         <ReactQueryDevtools initialIsOpen={false} />
         <Toaster richColors theme='light' position='top-center' />

         <CheckAuthProvider>
            <RouterProvider router={appRouter} />
         </CheckAuthProvider>
         {/* <TestAuth /> */}
      </QueryClientProvider>
   );
};
