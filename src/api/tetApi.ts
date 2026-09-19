import axios from 'axios';

const tetApi = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
});
//todo interceptores

export { tetApi };
