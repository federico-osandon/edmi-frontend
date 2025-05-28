import { create } from "zustand";
import axios from "axios";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    // Agrega aquí más campos según tu modelo de usuario
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (user: User) => void;
    logout: () => Promise<void>;
    checkAuthStatus: () => Promise<void>;
}

// Asumiendo que tienes una API en /api/auth/current
// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
const API_URL = "http://localhost:3001/api";

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
    
    login: (user) => set({ isAuthenticated: true, user }),
    
    logout: async () => {
        try {
            set({ isLoading: true });
            // Llamada al endpoint de logout en el backend
            await axios.post(`${API_URL}/session/logout`, {}, { withCredentials: true });
            set({ isAuthenticated: false, user: null, isLoading: false });
        } catch (error) {
            set({ error: "Error al cerrar sesión", isLoading: false });
            console.error("Error al cerrar sesión:", error);
        }
    },
    
    checkAuthStatus: async () => {
        try {
            set({ isLoading: true });
            // Verificar estado de autenticación con el backend
            const response = await axios.get(`${API_URL}/sessions/current`, { 
                withCredentials: true // Importante para enviar cookies
            });
            
            if (response.data.user) {
                set({ 
                    isAuthenticated: true, 
                    user: response.data.user,
                    isLoading: false,
                    error: null
                });
            } else {
                set({ 
                    isAuthenticated: false, 
                    user: null,
                    isLoading: false
                });
            }
        } catch (error) {
            set({ 
                isAuthenticated: false, 
                user: null, 
                isLoading: false,
                error: "Error al verificar autenticación"
            });
            console.error("Error al verificar autenticación:", error);
        }
    }
}));