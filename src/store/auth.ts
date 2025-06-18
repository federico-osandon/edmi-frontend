import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    // Agrega aquí más campos según tu modelo de usuario
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginData) => Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    checkAuthStatus: () => Promise<void>;
    clearError: () => void;
}

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
const API_URL = "http://localhost:3001/api";

export const useAuthStore = create<AuthState>()(persist(
    (set) => ({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
        
        login: async (credentials: LoginData) => {
            try {
                set({ isLoading: true });
                const { data } = await axios.post(`${API_URL}/auth/login`, credentials, {
                    withCredentials: true
                });
                set({ 
                    isAuthenticated: true, 
                    user: data.user,
                    isLoading: false,
                    error: null
                });
            } catch (error: any) {
                set({ 
                    error: error.response?.data?.message || "Error al iniciar sesión",
                    isLoading: false 
                });
                throw error;
            }
        },

        register: async (userData: RegisterData) => {
            try {
                set({ isLoading: true });
                await axios.post(`${API_URL}/auth/register`, userData);
                // Opcional: hacer login automático después del registro
                const { data } = await axios.post(`${API_URL}/auth/login`, {
                    email: userData.email,
                    password: userData.password
                }, { withCredentials: true });
                set({ 
                    isAuthenticated: true, 
                    user: data.user, 
                    isLoading: false,
                    error: null
                });
            } catch (error: any) {
                set({ 
                    error: error.response?.data?.message || "Error en el registro",
                    isLoading: false 
                });
                throw error;
            }
        },
        
        logout: async () => {
            try {
                set({ isLoading: true });
                // Llamada al endpoint de logout en el backend
                await axios.post(`${API_URL}/auth/logout`, {}, { 
                    withCredentials: true 
                });
                set({ 
                    isAuthenticated: false, 
                    user: null, 
                    isLoading: false 
                });
            } catch (error) {
                set({ 
                    error: "Error al cerrar sesión", 
                    isLoading: false 
                });
                console.error("Error al cerrar sesión:", error);
            }
        },
        
        checkAuthStatus: async () => {
            try {
                set({ isLoading: true });
                // Verificar estado de autenticación con el backend
                const response = await axios.get(`${API_URL}/auth/me`, { 
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
                    isLoading: false
                });
                // No establecemos error aquí para evitar mostrar errores en la carga inicial
            }
        },

        clearError: () => set({ error: null })
    }),
    {
        name: "auth-storage",
        storage: {
            getItem: (name) => {
                const str = sessionStorage.getItem(name);
                return str ? JSON.parse(str) : null;
            },
            setItem: (name, value) => {
                sessionStorage.setItem(name, JSON.stringify(value));
            },
            removeItem: (name) => {
                sessionStorage.removeItem(name);
            }
        }
    }
));