import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';
import { TransactionsProvider } from 'services/context/budget/transactionsContext';
import { CategoriesProvider } from 'services/context/budget/CategoriesContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TransactionsProvider>
      <CategoriesProvider>
        <App />
      </CategoriesProvider>
    </TransactionsProvider>
  </React.StrictMode>
);

