import { createBrowserRouter, Navigate } from 'react-router';
import { ShopLayout } from './shop/layouts/ShopLayout';
import { HomePage } from './shop/pages/Home/HomePage';
import { AdminLayout } from './admin/layout/AdminLayout';
import { DashboardPage } from './admin/pages/dashboard/DashboardPage';
import { AdminProductsPage } from './admin/pages/products/AdminProductsPage';
import { AdminProductPage } from './admin/pages/products/AdminProductPage';
import { LoginForm } from './auth/LoginfForm';
import {
   AuthenticadedRoute,
   NotAuthenticadedRoute,
} from './auth/ProtectedRoutes';

export const appRouter = createBrowserRouter([
   // Main routes
   {
      path: '/',
      element: (
         <AuthenticadedRoute>
            <ShopLayout />
         </AuthenticadedRoute>
      ),
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
      element: (
         <AuthenticadedRoute>
            <AdminLayout />
         </AuthenticadedRoute>
      ),
      children: [
         {
            index: true,
            element: <DashboardPage />,
         },
         {
            path: 'products',
            element: <AdminProductsPage />,
         },
         {
            path: 'products/:id',
            element: <AdminProductPage />,
         },
      ],
   },

   // Login
   {
      path: '/auth/login',
      element: (
         <NotAuthenticadedRoute>
            <LoginForm />
         </NotAuthenticadedRoute>
      ),
   },
]);
