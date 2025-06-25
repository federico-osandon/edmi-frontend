import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    // const isLoading = useAuthStore(state => state.isLoading);
    const navigate = useNavigate();
    
    // if (isLoading) return <LoadingSpinner />;
    
    if (!isAuthenticated) {
    //   return <Navigate to="/login" />;
        navigate("/login", { replace: true });
    }
    
    return children;
  };