import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen font-sans antialiased">
          <AppRoutes />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#0f172a',
              color: '#f1f5f9',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            },
            success: {
              iconTheme: { primary: '#22d3ee', secondary: '#0f172a' },
            },
            error: {
              iconTheme: { primary: '#f87171', secondary: '#0f172a' },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}
