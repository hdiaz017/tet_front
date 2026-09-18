import { Outlet } from 'react-router';
import { AdminHeader } from '../custom/AdminHeader';
import { AdminSidebar } from '../custom/AdminSidebar';

export const AdminLayout = () => {
   return (
      // h-screen asegura que el layout ocupe toda la pantalla y no más
      <div className='flex flex-col h-screen bg-background text-foreground'>
         {/* 1. HEADER: Siempre arriba y a ancho completo */}
         <AdminHeader />

         {/* 2. CONTENEDOR INFERIOR: Divide Sidebar y Contenido */}
         <div className='flex flex-1 overflow-hidden'>
            {/* --- SIDEBAR: Debajo del header --- */}
            <AdminSidebar />
            {/* --- MAIN CONTENT: Al lado del sidebar --- */}
            <main className='flex-1 overflow-y-auto '>
               <Outlet />
            </main>
         </div>
      </div>
   );
};
