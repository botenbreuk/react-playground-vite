import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { nl } from 'date-fns/locale/nl';
import { StrictMode, Suspense } from 'react';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { createRoot } from 'react-dom/client';
import { App } from './app/Routes/App';
import './assets/main.scss';
import { UserSettingsProvider } from './context/SettingsContext';
import { Spinner } from './ui';
import Firework from './ui/easter-eggs/Firework/Firework';
import Pika from './ui/easter-eggs/Pika/Pika';

// React datepicker config
registerLocale('nl', nl);
setDefaultLocale('nl');

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Suspense fallback={<Spinner size={20} />}>
      <QueryClientProvider client={queryClient}>
        <UserSettingsProvider>
          <App />
          <Firework />
          <Pika />
        </UserSettingsProvider>
      </QueryClientProvider>
    </Suspense>
  </StrictMode>
);
