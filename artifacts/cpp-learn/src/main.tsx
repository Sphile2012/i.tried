import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastProvider } from './hooks/use-toast';
import { LanguageProvider } from './hooks/use-language';
import { AuthProvider } from './hooks/use-auth';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

console.log('Infinity Code - App Starting...');
console.log('Environment:', import.meta.env.MODE);
console.log('Base URL:', window.location.origin);

// Service worker disabled to prevent caching issues during development
// Unregister any existing service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister().then(() => {
        console.log('ServiceWorker unregistered');
      });
    }
  });
}

// Error boundary for catching render errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found!');
  }
  
  console.log('Root element found, mounting React app...');
  
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <LanguageProvider>
          <ToastProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ToastProvider>
        </LanguageProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
  
  console.log('React app mounted successfully');
} catch (error) {
  console.error('Failed to mount React app:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: system-ui; max-width: 600px; margin: 50px auto; background: #0f172a; color: #e2e8f0; min-height: 100vh;">
      <h1 style="color: #ef4444;">Application Failed to Load</h1>
      <p>There was an error starting the application. Please check the browser console for details.</p>
      <pre style="background: #1e293b; color: #f87171; padding: 15px; border-radius: 8px; overflow: auto;">${error}</pre>
      <p style="margin-top: 20px; color: #94a3b8;">If you're an administrator, check that all environment variables are properly configured in Netlify.</p>
      <button onclick="window.location.reload()" style="background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; margin-top: 16px;">
        Reload Page
      </button>
    </div>
  `;
}
