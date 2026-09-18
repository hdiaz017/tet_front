import { cn } from '@/lib/utils';
import { LayoutDashboard, Package, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavLink, useLocation } from 'react-router';

const menuItems = [
   { path: '/admin/', label: 'Dashboard', icon: LayoutDashboard },
   { path: '/admin/products', label: 'Productos', icon: Package },
];

export const AdminSidebar = () => {
   const { pathname } = useLocation();

   const isActiveRoute = (path: string) => {
      if (pathname.includes('/admin/products/') && path === '/admin/products') {
         return true;
      }
      return pathname === path;
   };
   return (
      <>
         <aside className='w-64 border-r bg-slate-50/50 flex flex-col'>
            <nav className='flex-1 px-4 py-6 space-y-2'>
               {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                     <NavLink
                        key={item.path}
                        to={item.path}
                        end
                        className={() =>
                           cn(
                              'flex items-center gap-3 px-3 py-3 rounded-md transition-colors font-medium',
                              'hover:bg-slate-200',
                              isActiveRoute(item.path)
                                 ? 'bg-white shadow-sm text-primary'
                                 : 'text-muted-foreground hover:text-foreground',
                           )
                        }
                     >
                        <Icon className='h-5 w-5' />
                        {item.label}
                     </NavLink>
                  );
               })}
            </nav>

            {/* Botones inferiores del sidebar */}
            <div className='p-4 border-t space-y-2'>
               <Button
                  variant='ghost'
                  className='w-full justify-start gap-3 px-3'
               >
                  <Settings className='h-5 w-5' /> Configuración
               </Button>
               <Button
                  variant='ghost'
                  className='w-full justify-start gap-3 px-3 text-red-500 hover:text-red-600 hover:bg-red-50'
               >
                  <LogOut className='h-5 w-5' /> Cerrar Sesión
               </Button>
            </div>
         </aside>
      </>
   );
};
