import { CustomLogo } from '@/components/custom/CustomLogo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart } from 'lucide-react';
import { useRef } from 'react';
import { Link, useSearchParams } from 'react-router';

export const CustomHeader = () => {
   const inputRef = useRef<HTMLInputElement>(null);
   const authStatus: string = 'not-authenticated';
   const itemCount = 2;
   const [searchParams, setSearchParams] = useSearchParams();

   const query = searchParams.get('query') || '';
   const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code !== 'Enter') return;
      const newSearchParams = new URLSearchParams();
      const query = inputRef.current?.value || '';
      if (!query) {
         newSearchParams.delete('query');
      } else {
         newSearchParams.set('query', query);
      }
      setSearchParams(newSearchParams);
   };

   return (
      <header className='sticky top-0 z-50 w-full bg-slate-50 border-b backdrop-blur-lg'>
         <div className='container mx-auto px-4 lg:px-8'>
            <div className='flex h-16 justify-between items-center'>
               {/* Logo */}
               <CustomLogo />

               {/* Nav */}
               <nav className='flex items-center space-x-8'>
                  <Link to='/'>Productos</Link>
                  <Link to='/admin'>Dashboard</Link>
               </nav>
               {/* Search and Cart */}
               <div className='flex items-center space-x-4'>
                  <div className='hidden md:flex items-center space-x-2'>
                     <div className='relative'>
                        <Search className='absolute  left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                        <Input
                           ref={inputRef}
                           placeholder='Buscar productos...'
                           className='pl-9 w-64 h-9 bg-white'
                           onKeyDown={handleSearch}
                           defaultValue={query}
                        />
                     </div>
                  </div>
                  {authStatus === 'not-authenticated' ? (
                     <Link to='/auth/login'>
                        <Button variant='default' size='sm' className='ml-2'>
                           Login
                        </Button>
                     </Link>
                  ) : (
                     <Button
                        variant='default'
                        size='sm'
                        className='ml-2'
                        // onClick={logout}
                     >
                        Logout
                     </Button>
                  )}

                  <Button
                     variant='default'
                     size='sm'
                     className='relative'
                     //   onClick={() => setIsCartOpen(true)}
                  >
                     <ShoppingCart className='w-4 h-4 mr-1' />
                     Cart
                     {itemCount > 0 && (
                        <Badge className='absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-[12px] bg-red-300 text-accent-foreground border-2 border-red-300'>
                           {itemCount}
                        </Badge>
                     )}
                  </Button>
               </div>
            </div>
         </div>
      </header>
   );
};
