import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
<<<<<<< HEAD
=======
    // const isLoading = useAuthStore(state => state.isLoading);
>>>>>>> cdf05956d8435ab223d8392258f27aa070114620
    const navigate = useNavigate();
    
    if (!isAuthenticated) {
        navigate("/login", { replace: true });
    }
    
    return children;
  };