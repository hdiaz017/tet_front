import {
   // DollarSign,
   TrendingUp,
   CalendarDays,
   ShoppingBag,
   ArrowUpRight,
   // ArrowDownRight,
   Loader2,
   Package,
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

import {
   isSameDay,
   subDays,
   startOfDay,
   isAfter,
   subMonths,
   format,
   isSameMonth,
} from 'date-fns';
import { useSales } from '@/admin/hooks/useSales';
import { useProducts } from '@/shop/hooks/useProducts';

export const DashboardPage = () => {
   const { data: sales, isPending } = useSales();
   const { data: products, isPending: productsPending } = useProducts();

   // --- PROCESAMIENTO DE DATOS ---

   // 1. Calcular métricas globales
   const today = startOfDay(new Date());

   const stats = {
      ventasDia:
         sales?.data
            ?.filter((s) => isSameDay(new Date(s.soldAt), new Date()))
            .reduce((acc, s) => acc + s.totalAmount, 0) || 0,

      gananciasDia:
         sales?.data
            ?.filter((s) => isSameDay(new Date(s.soldAt), new Date()))
            .reduce((acc, s) => acc + s.totalAmount, 0) || 0, // Asumiendo que totalAmount es la ganancia

      gananciasSemana:
         sales?.data
            ?.filter((s) => isAfter(new Date(s.soldAt), subDays(today, 7)))
            .reduce((acc, s) => acc + s.totalAmount, 0) || 0,

      gananciasMes:
         sales?.data
            ?.filter((s) => isAfter(new Date(s.soldAt), subDays(today, 30)))
            .reduce((acc, s) => acc + s.totalAmount, 0) || 0,
   };

   // 2. Transformar datos para las gráficas (Últimos 7 días)
   const chartData = Array.from({ length: 7 }).map((_, i) => {
      const date = subDays(new Date(), 6 - i);
      const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });

      // Sumar ventas de ese día específico
      const dayTotal =
         sales?.data
            ?.filter((s) => isSameDay(new Date(s.soldAt), date))
            .reduce((acc, s) => acc + s.totalAmount, 0) || 0;

      return {
         name: dayName,
         ventas: dayTotal,
         ganancias: dayTotal * 0.7, // Ejemplo: simulando que la ganancia es el 70% de la venta
      };
   });
   const monthlyData = Array.from({ length: 6 }).map((_, i) => {
      const date = subMonths(new Date(), 5 - i);
      const monthName = format(date, 'MMM', { locale: undefined }); // Ej: "ene", "feb"

      const monthTotal =
         sales?.data
            ?.filter((s) => isSameMonth(new Date(s.soldAt), date))
            .reduce((acc, s) => acc + s.totalAmount, 0) || 0;

      return { name: monthName, total: monthTotal };
   });

   const getTopProducts = () => {
      if (!sales || !products) return [];

      const productCounts: Record<string, number> = {};

      sales.data.forEach((sale) => {
         sale.items.forEach((item) => {
            productCounts[item.productId] =
               (productCounts[item.productId] || 0) + item.quantity;
         });
      });

      return Object.entries(productCounts)
         .map(([id, qty]) => ({
            name:
               products.find((p) => p.id === id)?.name ||
               'Producto desconocido',
            qty,
         }))
         .sort((a, b) => b.qty - a.qty)
         .slice(0, 5);
   };

   const topProductsData = getTopProducts();

   if (isPending || productsPending) {
      return (
         <div className='flex h-screen w-full items-center justify-center'>
            <Loader2 className='h-10 w-10 animate-spin text-primary' />
         </div>
      );
   }

   return (
      <div className='p-6 space-y-6 min-h-screen '>
         <AdminTitle
            title='Dashboard de Ventas'
            subtitle='Bienvenido de vuelta, aquí tienes el resumen de tu tienda.'
         />

         {/* Grid de Tarjetas de Métricas */}
         <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
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
                     <ArrowUpRight className='h-3 w-3' /> Actualizado en tiempo
                     real
                  </p>
               </CardContent>
            </Card>

            {/* <Card>
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
                     <ArrowUpRight className='h-3 w-3' /> Hoy
                  </p>
               </CardContent>
            </Card> */}

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
                     <TrendingUp className='h-3 w-3' /> Últimos 7 días
                  </p>
               </CardContent>
            </Card>

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
                  <p className='text-xs text-gray-500 flex items-center gap-1 mt-1'>
                     Últimos 30 días
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
                        <AreaChart data={chartData}>
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

            {/* <Card className='col-span-3'>
               <CardHeader>
                  <CardTitle>Distribución de Ganancias</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className='h-[300px] w-full'>
                     <ResponsiveContainer width='100%' height='100%'>
                        <BarChart data={chartData}>
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
            </Card> */}
            <Card className='col-span-3'>
               <CardHeader>
                  <CardTitle>Ventas por Mes</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className='h-[300px] w-full'>
                     <ResponsiveContainer width='100%' height='100%'>
                        <BarChart data={monthlyData}>
                           <CartesianGrid
                              strokeDasharray='3 3'
                              vertical={false}
                           />
                           <XAxis dataKey='name' />
                           <YAxis />
                           <Tooltip />
                           <Bar
                              dataKey='total'
                              fill='#3b82f6'
                              radius={[4, 4, 0, 0]}
                           />
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </CardContent>
            </Card>
            {/* Gráfica de Productos Más Vendidos */}
            <div className='grid gap-4 md:grid-cols-1 w-100'>
               <Card>
                  <CardHeader className='flex flex-row items-center justify-between '>
                     <CardTitle>Productos Más Vendidos</CardTitle>
                     <Package className='h-5 w-5 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                     <div className='h-[300px] w-full'>
                        <ResponsiveContainer width='100%' height='100%'>
                           <BarChart
                              layout='vertical'
                              data={topProductsData}
                              margin={{ left: 40 }}
                           >
                              <CartesianGrid
                                 strokeDasharray='3 3'
                                 horizontal={false}
                              />
                              <XAxis type='number' />
                              <YAxis
                                 dataKey='name'
                                 type='category'
                                 width={150}
                                 tick={{ fontSize: 12 }}
                              />
                              <Tooltip />
                              <Bar
                                 dataKey='qty'
                                 fill='#10b981'
                                 radius={[0, 4, 4, 0]}
                                 barSize={30}
                              />
                           </BarChart>
                        </ResponsiveContainer>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
};
