import { cn } from '@/lib/utils';
import { LayoutDashboard, Package, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router';

const menuItems = [
   { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
   { path: '/admin/dashboard/products', label: 'Productos', icon: Package },
];

export const AdminSidebar = () => {
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
                        className={({ isActive }) =>
                           cn(
                              'flex items-center gap-3 px-3 py-3 rounded-md transition-colors font-medium',
                              'hover:bg-slate-200',
                              isActive
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
