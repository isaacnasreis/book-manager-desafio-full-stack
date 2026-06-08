import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen font-sans antialiased">
          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
