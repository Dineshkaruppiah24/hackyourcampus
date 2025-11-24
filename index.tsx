import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App';

const container = document.getElementById('root');
if (!container) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <AppProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AppProvider>
  </React.StrictMode>
);
