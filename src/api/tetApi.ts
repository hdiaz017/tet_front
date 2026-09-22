import axios from 'axios';

const tetApi = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
});
//todo interceptores
tetApi.interceptors.request.use(
   (config) => {
      // 1. Obtener el token del localStorage (o de donde lo guardes al hacer login)
      const token = localStorage.getItem('authToken');

      // 2. Si el token existe, añadirlo a los headers
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);

export { tetApi };
