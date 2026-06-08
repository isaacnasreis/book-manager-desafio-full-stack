import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { BookList } from '../pages/BookList';
import { BookForm } from '../pages/BookForm';
import { PrivateRoute } from './PrivateRoute';
import { Layout } from '../components/Layout';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Navigate to="/books" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rotas Privadas (Protegidas) */}
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/books" element={<BookList />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/:id/edit" element={<BookForm />} />
        </Route>
      </Route>

      {/* Rota Fallback */}
      <Route path="*" element={<Navigate to="/books" replace />} />
    </Routes>
  );
}