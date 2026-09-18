import {
   DollarSign,
   TrendingUp,
   CalendarDays,
   ShoppingBag,
   ArrowUpRight,
   ArrowDownRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   AreaChart,
   Area,
} from 'recharts';
import { AdminTitle } from '@/admin/custom/AdminTitle';

// Datos simulados para la gráfica de ventas
const data = [
   { name: 'Lun', ventas: 4000, ganancias: 2400 },
   { name: 'Mar', ventas: 3000, ganancias: 1398 },
   { name: 'Mie', ventas: 2000, ganancias: 9800 },
   { name: 'Jue', ventas: 2780, ganancias: 3908 },
   { name: 'Vie', ventas: 1890, ganancias: 4800 },
   { name: 'Sab', ventas: 2390, ganancias: 3800 },
   { name: 'Dom', ventas: 3490, ganancias: 4300 },
];

export const DashboardPage = () => {
   // Datos simulados de la tienda
   const stats = {
      ventasDia: 1250.5,
      gananciasDia: 450.2,
      gananciasSemana: 3200.0,
      gananciasMes: 12800.0,
   };

   return (
      <div className='p-6 space-y-6  min-h-screen '>
         <AdminTitle
            title='Dashboard de Ventas'
            subtitle='Bienvenido de vuelta, aquí tienes el resumen de tu tienda.'
         />

         {/* Grid de Tarjetas de Métricas */}
         <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {/* Ventas del Día */}
            <Card>
               <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                  <CardTitle className='text-sm font-medium'>
                     Ventas Hoy
                  </CardTitle>
                  <ShoppingBag className='h-4 w-4 text-muted-foreground' />
               </CardHeader>
               <CardContent>
                  <div className='text-2xl font-bold'>
                     ${stats.ventasDia.toLocaleString()}
                  </div>
                  <p className='text-xs text-green-500 flex items-center gap-1 mt-1'>
                     <ArrowUpRight className='h-3 w-3' /> +12% vs ayer
                  </p>
               </CardContent>
            </Card>

            {/* Ganancias del Día */}
            <Card>
               <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                  <CardTitle className='text-sm font-medium'>
                     Ganancia Hoy
                  </CardTitle>
                  <DollarSign className='h-4 w-4 text-muted-foreground' />
               </CardHeader>
               <CardContent>
                  <div className='text-2xl font-bold'>
                     ${stats.gananciasDia.toLocaleString()}
                  </div>
                  <p className='text-xs text-green-500 flex items-center gap-1 mt-1'>
                     <ArrowUpRight className='h-3 w-3' /> +5% vs ayer
                  </p>
               </CardContent>
            </Card>

            {/* Ganancias de la Semana */}
            <Card>
               <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                  <CardTitle className='text-sm font-medium'>
                     Ganancia Semanal
                  </CardTitle>
                  <CalendarDays className='h-4 w-4 text-muted-foreground' />
               </CardHeader>
               <CardContent>
                  <div className='text-2xl font-bold'>
                     ${stats.gananciasSemana.toLocaleString()}
                  </div>
                  <p className='text-xs text-blue-500 flex items-center gap-1 mt-1'>
                     <TrendingUp className='h-3 w-3' /> Estable
                  </p>
               </CardContent>
            </Card>

            {/* Ganancias del Mes */}
            <Card>
               <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                  <CardTitle className='text-sm font-medium'>
                     Ganancia Mensual
                  </CardTitle>
                  <TrendingUp className='h-4 w-4 text-muted-foreground' />
               </CardHeader>
               <CardContent>
                  <div className='text-2xl font-bold'>
                     ${stats.gananciasMes.toLocaleString()}
                  </div>
                  <p className='text-xs text-red-500 flex items-center gap-1 mt-1'>
                     <ArrowDownRight className='h-3 w-3' /> -2% vs mes ant.
                  </p>
               </CardContent>
            </Card>
         </div>

         {/* Sección de Gráficas */}
         <div className='grid gap-4 md:grid-cols-7'>
            <Card className='col-span-4'>
               <CardHeader>
                  <CardTitle>Análisis de Ventas Semanales</CardTitle>
               </CardHeader>
               <CardContent className='pl-2'>
                  <div className='h-[300px] w-full'>
                     <ResponsiveContainer width='100%' height='100%'>
                        <AreaChart data={data}>
                           <defs>
                              <linearGradient
                                 id='colorVentas'
                                 x1='0'
                                 y1='0'
                                 x2='0'
                                 y2='1'
                              >
                                 <stop
                                    offset='5%'
                                    stopColor='#3b82f6'
                                    stopOpacity={0.8}
                                 />
                                 <stop
                                    offset='95%'
                                    stopColor='#3b82f6'
                                    stopOpacity={0}
                                 />
                              </linearGradient>
                           </defs>
                           <CartesianGrid
                              strokeDasharray='3 3'
                              vertical={false}
                           />
                           <XAxis dataKey='name' />
                           <YAxis />
                           <Tooltip />
                           <Area
                              type='monotone'
                              dataKey='ventas'
                              stroke='#3b82f6'
                              fillOpacity={1}
                              fill='url(#colorVentas)'
                           />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </CardContent>
            </Card>

            <Card className='col-span-3'>
               <CardHeader>
                  <CardTitle>Distribución de Ganancias</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className='h-[300px] w-full'>
                     <ResponsiveContainer width='100%' height='100%'>
                        <BarChart data={data}>
                           <CartesianGrid
                              strokeDasharray='3 3'
                              vertical={false}
                           />
                           <XAxis dataKey='name' />
                           <YAxis />
                           <Tooltip />
                           <Bar
                              dataKey='ganancias'
                              fill='#10b981'
                              radius={[4, 4, 0, 0]}
                           />
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};
