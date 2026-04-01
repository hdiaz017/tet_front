import { RouterProvider } from 'react-router';
import { appRouter } from './app.router';

export const TetShopApp = () => {
   return (
      <>
         <RouterProvider router={appRouter} />
      </>
   );
};
