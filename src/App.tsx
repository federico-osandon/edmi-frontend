import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { 
  StudentCreate,
  Students 
} from "./pages";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { StudentFormRegisterPage } from "./pages/Students/StudentFormRegister/StudentFormRegister";
import SignIn from "./pages/AuthPages/SignIn";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import { useAuthStore } from "./store/auth";

// Componente para redirigir usuarios autenticados lejos de las páginas de autenticación
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
};

export default function App() {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    
    
    return (
        <>
            <ToastContainer position="bottom-right" autoClose={3000} />
            <Router>
                <ScrollToTop />
                <Routes>
                    {/* Rutas públicas con redirección si ya está autenticado */}
                    <Route path="/signup" element={
                        <AuthRoute>
                            <StudentFormRegisterPage />
                        </AuthRoute>
                    } />
                    <Route path="/signin" element={
                        <AuthRoute>
                            <SignIn />
                        </AuthRoute>
                    } />
                    
                    {/* Rutas protegidas - Dashboard Layout */}
                    <Route element={<ProtectedRoute isAllowed={isAuthenticated} />}>
                        <Route element={<AppLayout />}>
                            <Route index path="/" element={<Home />} />
                            <Route path="/estudiantes" element={<Students />} />      
                            <Route path="/crear-estudiante" element={<StudentCreate />} />      
                        </Route>
                    </Route>
                    
                    {/* Fallback Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}
// isConfirmed,