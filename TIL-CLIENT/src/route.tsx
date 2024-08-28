import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@store/useAuthStore';
import { PROD_PROFILE } from '@constants/env';

interface PrivateRouteProps {
  authentication?: boolean;
}

const PrivateRoute = ({ authentication = true }: PrivateRouteProps): React.ReactElement | null => {
  const { isAuthenticated } = useAuthStore();

  if (
    import.meta.env.VITE_PROFILE !== PROD_PROFILE &&
    import.meta.env.VITE_AUTH_MODE_DISABLED === 'true'
  ) {
    return <Outlet />;
  }

  if (authentication) {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  }

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoute;
