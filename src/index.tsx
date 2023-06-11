import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import Routes from './app/Routes/Routes';
import './assets/main.scss';
import Spinner from './ui/Spinner/Spinner';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Suspense fallback={<Spinner size={20} />}>
      <Routes />
    </Suspense>
  </StrictMode>
);