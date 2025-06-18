import { BrowserRouter as Router, Routes, Route } from "react-router";
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

export default function App() {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    
    
    return (
        <>
            <ToastContainer position="bottom-right" autoClose={3000} />
            <Router>
                <ScrollToTop />
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/signup" element={<StudentFormRegisterPage />} />
                    <Route path="/signin" element={<SignIn />} />
                    
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