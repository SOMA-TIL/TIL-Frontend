import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@store/useAuthStore';

interface PrivateRouteProps {
  authentication?: boolean;
}

const PrivateRoute = ({ authentication = true }: PrivateRouteProps): React.ReactElement | null => {
  const { isAuthenticated } = useAuthStore();
  if (authentication) {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  }

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoute;
