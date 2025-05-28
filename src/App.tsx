import { HashRouter as Router, Routes, Route } from "react-router";
// import SignIn from "./pages/AuthPages/SignIn";
// import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";

import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { 
  StudentCreate,
  // StudentCreate,
   Students 
} from "./pages";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { StudentFormRegisterPage } from "./pages/Students/StudentFormRegister/StudentFormRegister";
import { useEffect } from "react";
import { useAuthStore } from "./store/auth";
import SignIn from "./pages/AuthPages/SignIn";


export default function App() {

    const { checkAuthStatus } = useAuthStore();

    useEffect(() => {
        checkAuthStatus();
    }, []);
      
    return (
        <>
            <ToastContainer position="bottom-right" autoClose={3000} />
            <Router>
                <ScrollToTop />
                <Routes>
                    {/* Dashboard Layout */}
                    <Route element={<AppLayout />}>
                        <Route index path="/" element={<Home />} />
                        <Route path="/estudiantes" element={<Students />} />      
                        <Route path="/crear-estudiante" element={<StudentCreate />} />      
                    </Route>
                    {/* Auth Layout */}
                    {/* <Route path="/registrar-estudiante" element={<StudentFormRegisterPage />} /> */}
                    <Route path="/signup" element={<StudentFormRegisterPage />} />
                    <Route path="/signin" element={<SignIn />} />
                    {/* Fallback Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}
// isActive, 
// isConfirmed,