import { CustomLogo } from '@/components/custom/CustomLogo';
import React from 'react';

export const CustomFooter = () => {
   return (
      <>
         <footer className='border-t py-12 mt-16 px-4'>
            <CustomLogo />
            <h4 className='font-medium mb-4'>® 2026</h4>
         </footer>
      </>
   );
};
