import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

const navigate = useNavigate();
    
    if (!isAuthenticated) {
        navigate("/login", { replace: true });
    }
    
    return children;
  };