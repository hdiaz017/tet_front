/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { devtools } from 'zustand/middleware';
import type { AuthStore } from '@/types/user.interface';

export const useAuthStore = create<AuthStore>()(
   devtools((set) => ({
      user: null,
      authStatus: 'checking',
      error: null,

      login: async (email: string, password: string) => {
         set({ error: null });
         try {
            const { data, error } = await supabase.auth.signInWithPassword({
               email,
               password,
            });

            if (error || !data.user) {
               throw new Error(error?.message || 'Login failed');
            }

            set({
               user: { id: data.user.id, email: data.user.email! },
               authStatus: 'authenticated',
            });

            // Guardar token en localStorage
            if (data.session) {
               localStorage.setItem('authToken', data.session.access_token);
            }
         } catch (error: any) {
            set({ error: error.message, authStatus: 'not-authenticated' });
            throw error;
         }
      },

      logout: async () => {
         try {
            await supabase.auth.signOut();
            localStorage.removeItem('authToken');
            set({ user: null, authStatus: 'not-authenticated' });
         } catch (error: any) {
            set({ error: error.message, authStatus: 'not-authenticated' });
         }
      },

      hydrate: async () => {
         const token = localStorage.getItem('authToken');
         console.log('hola');
         if (!token) {
            set({ authStatus: 'not-authenticated' });
            return;
         }

         try {
            const { data, error } = await supabase.auth.getUser(token);
            if (error || !data.user) {
               console.log('Token inválido o expirado:', error?.message);
               localStorage.removeItem('authToken');
               set({ authStatus: 'not-authenticated' });
               return;
            }
            set({
               user: { id: data.user.id, email: data.user.email! },
               authStatus: 'authenticated',
            });
         } catch (error) {
            console.log(error);

            localStorage.removeItem('authToken');
            set({ authStatus: 'not-authenticated' });
         }
      },
   })),
);
