import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../store/auth';

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectTo?: string;
  children?: React.ReactNode;
  roles?: string[];
}

export const ProtectedRoute = ({
  isAllowed,
  redirectTo = '/signin',
  children,
  roles = [],
}: ProtectedRouteProps) => {
  // Obtenemos el usuario del store de autenticación
  const user = useAuthStore(state => state.user);
  
  // Si el usuario no está autenticado, redirigimos al login
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // Si hay roles definidos, verificamos si el usuario tiene alguno de esos roles
  if (roles.length > 0) {
    // Si no hay usuario o no tiene rol, no permitimos el acceso
    if (!user || !user.role) {
      return <Navigate to="/" replace />;
    }
    
    // Verificamos si el rol del usuario está en la lista de roles permitidos
    const hasAllowedRole = roles.includes(user.role);
    
    if (!hasAllowedRole) {
      return <Navigate to="/" replace />;
    }
  }

  return children ? <>{children}</> : <Outlet />;
};
