import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { StudentCreate } from "./pages/Students/StudentCreate";
import { Students } from "./pages/Students";
import { CursesPages } from "./pages/CursesPages";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { StudentFormRegisterPage } from "./pages/Students/StudentFormRegister/StudentFormRegister";
import SignIn from "./pages/AuthPages/SignIn";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import { useAuthStore } from "./store/auth";

// Componente para redirigir usuarios autenticados lejos de las páginas de autenticación
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
//   console.log(isAuthenticated);
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
                            {/* Home accesible para cualquier rol */}
                            <Route index path="/" element={
                                <ProtectedRoute 
                                    isAllowed={isAuthenticated} 
                                    roles={['USER','STUDENT', 'ADMIN', 'SUPERADMIN']}
                                >
                                    <Home />
                                </ProtectedRoute>
                            } />
                        
                            {/* Rutas solo para admin y superadmin */}
                            <Route element={<ProtectedRoute isAllowed={isAuthenticated} roles={[ 'SUPERADMIN']} />}>
                                <Route path="/crear-estudiante" element={<StudentCreate />} />      
                            </Route>
                            <Route element={<ProtectedRoute isAllowed={isAuthenticated} roles={[ 'ADMIN', 'SUPERADMIN']} />}>
                                <Route path="/estudiantes" element={<Students />} />  
                                <Route path="/cursos" element={<CursesPages />} />      
                                <Route path="/curso-detalle/:id" element={<h1>Curso Detalle</h1>} />      
                            </Route>
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