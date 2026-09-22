import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import type { Session } from '@supabase/supabase-js';

export function TestAuth() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [session, setSession] = useState<Session | null>(null);
   const [response, setResponse] = useState('');

   const login = async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
         email,
         password,
      });
      if (error) {
         console.error('Error:', error.message);
      } else {
         setSession(data.session);
         console.log('✅ Login exitoso:', data.session?.user.email);
      }
   };

   const logout = async () => {
      await supabase.auth.signOut();
      setSession(null);
      console.log('✅ Logout exitoso');
   };

   // Función auxiliar para hacer requests autenticados
   const authenticatedFetch = async (
      url: string,
      options: RequestInit = {},
   ) => {
      if (!session?.access_token) {
         setResponse('❌ No hay sesión activa');
         return;
      }

      const response = await fetch(url, {
         ...options,
         headers: {
            ...options.headers,
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
         },
      });

      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2));
   };

   return (
      <div style={{ padding: '20px', fontFamily: 'monospace' }}>
         <h2>Test Auth + Endpoints</h2>

         <div
            style={{
               marginBottom: '20px',
               padding: '10px',
               background: '#f0f0f0',
            }}
         >
            <h3>Login</h3>
            <input
               placeholder='Email'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               style={{ marginRight: '10px' }}
            />
            <input
               placeholder='Password'
               type='password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               style={{ marginRight: '10px' }}
            />
            <button onClick={login}>Login</button>
         </div>

         {session && (
            <>
               <p>✅ Logueado: {session.user.email}</p>

               <div
                  style={{
                     marginBottom: '20px',
                     padding: '10px',
                     background: '#e8f5e9',
                  }}
               >
                  <h3>Endpoints Protegidos</h3>
                  <button
                     onClick={() =>
                        authenticatedFetch('http://localhost:3000/api/sales')
                     }
                  >
                     GET /reports
                  </button>
                  <button
                     onClick={() =>
                        authenticatedFetch(
                           'http://localhost:3000/api/products/1',
                           {
                              method: 'PATCH',
                              body: JSON.stringify({
                                 name: 'Producto Actualizado',
                                 price: 99.99,
                              }),
                           },
                        )
                     }
                     style={{ marginLeft: '10px' }}
                  >
                     PATCH /products/1
                  </button>
               </div>

               <button onClick={logout} style={{ marginBottom: '20px' }}>
                  Logout
               </button>
            </>
         )}

         {response && (
            <div
               style={{
                  padding: '10px',
                  background: '#fff3e0',
                  whiteSpace: 'pre-wrap',
               }}
            >
               <h3>Respuesta:</h3>
               {response}
            </div>
         )}
      </div>
   );
}
