import { getCookie } from '@services/cookie';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  authentication?: boolean;
}

const PrivateRoute = ({ authentication = true }: PrivateRouteProps): React.ReactElement | null => {
  const isAuthenticated = Boolean(getCookie('refreshToken'));

  if (authentication) {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  }

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoute;
