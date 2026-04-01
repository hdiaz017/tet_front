import { createBrowserRouter, Navigate } from 'react-router';
import { ShopLayout } from './shop/layouts/ShopLayout';
import { HomePage } from './shop/pages/Home/HomePage';
import { AdminLayout } from './admin/layout/AdminLayout';
import { DashboardPage } from './admin/pages/dashboard/DashboardPage';
import { AdminProductsPage } from './admin/pages/products/AdminProductsPage';

export const appRouter = createBrowserRouter([
   // Main routes
   {
      path: '/',
      element: <ShopLayout />,
      children: [
         {
            index: true,
            element: <HomePage />,
         },
         {
            path: '*',
            element: <Navigate to='/' />,
         },
      ],
   },

   // Admin route
   {
      path: '/admin',
      element: <AdminLayout />,
      children: [
         {
            index: true,
            element: <DashboardPage />,
         },
         {
            path: '/admin/products',
            element: <AdminProductsPage />,
         },
      ],
   },
]);
