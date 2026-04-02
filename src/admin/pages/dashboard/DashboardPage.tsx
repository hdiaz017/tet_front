import { useSales } from '@/shop/hooks/useSales';

export const DashboardPage = () => {
   const { salesByDay, totalRevenue } = useSales();

   return (
      <div>
         <h3>DashBoard</h3>
         <h3>Ventas por dia:</h3>
         <ul>
            {Object.entries(salesByDay).map(([date, total]) => (
               <li key={date}>
                  {date}: ${total.toFixed(2)}
               </li>
            ))}
         </ul>
         <h3>Total Vendido: ${totalRevenue.toFixed()}</h3>
      </div>
   );
};
