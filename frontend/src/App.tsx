import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
