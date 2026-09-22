import { useAuthStore } from '@/store/auth.store';
import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

export const AuthenticadedRoute = ({ children }: PropsWithChildren) => {
   const { authStatus } = useAuthStore();
   if (authStatus === 'checking') return null;
   if (authStatus === 'not-authenticated') return <Navigate to='/auth/login' />;
   return children;
};
export const NotAuthenticadedRoute = ({ children }: PropsWithChildren) => {
   const { authStatus } = useAuthStore();
   if (authStatus === 'checking') return null;
   if (authStatus === 'authenticated') return <Navigate to='/' />;
   return children;
};
