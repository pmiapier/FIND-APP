import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RedirectIfAuthenticated({ children }) {
  const { authUser } = useAuth();

  if (authUser) {
    return <Navigate to="/mydashboard" />;
  }
  return children;
}
