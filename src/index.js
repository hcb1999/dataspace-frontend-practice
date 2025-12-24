import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './routes/Routes';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SocketProvider } from './context/SocketContext';
import { NotificationProvider } from './context/NotificationContext';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NotificationProvider>
    <SocketProvider>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </SocketProvider>
  </NotificationProvider>
);

reportWebVitals();


