import React from 'react';
import { Outlet } from 'react-router';
import { CustomHeader } from '../components/CustomHeader';
import { CustomFooter } from '../components/CustomFooter';
import { ScrollToTop } from '@/components/custom/ScrollToTop';

export const ShopLayout = () => {
   return (
      <>
         <CustomHeader />
         <ScrollToTop />
         <Outlet />
         <CustomFooter />
      </>
   );
};
