import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthState from './context/AuthState';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthState>
      <App />
    </AuthState>
  </QueryClientProvider>
);
