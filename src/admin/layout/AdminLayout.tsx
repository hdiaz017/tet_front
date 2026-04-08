import { CustomHeader } from '@/shop/components/CustomHeader';

import { Outlet } from 'react-router';

export const AdminLayout = () => {
   return (
      <div>
         <CustomHeader />
         <Outlet />
      </div>
   );
};
