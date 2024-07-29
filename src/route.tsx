import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@store/useAuthStore';

interface PrivateRouteProps {
  authentication?: boolean;
}

const PrivateRoute = ({ authentication = true }: PrivateRouteProps): React.ReactElement | null => {
  const { isAuthenticated } = useAuthStore();

  if (
    process.env.REACT_APP_PROFILE !== 'prod' &&
    process.env.REACT_APP_AUTH_MODE_DISABLED === 'true'
  ) {
    return <Outlet />;
  }

  if (authentication) {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  }

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoute;
