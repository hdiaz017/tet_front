import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { TetShopApp } from './TetShopApp.tsx';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <TetShopApp />
   </StrictMode>,
);
