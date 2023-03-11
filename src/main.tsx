import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './app/Routes/Routes';
import './assets/main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
