import { Navigate, Outlet } from 'react-router';

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectTo?: string;
  children?: React.ReactNode;
}

export const ProtectedRoute = ({
  isAllowed,
  redirectTo = '/signin',
  children,
}: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
