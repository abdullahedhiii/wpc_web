import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import Store from './Store.js';

import { ModuleProvider } from './contexts/ModuleContext.jsx';
import { CompanyProvider } from './contexts/CompanyContext.jsx';
import { SidebarProvider } from './contexts/SidebarContext.jsx';

createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
      <CompanyProvider>
        <ModuleProvider>
        <SidebarProvider>
          <App />
          </SidebarProvider>
        </ModuleProvider>
      </CompanyProvider>
    </Provider>
);
