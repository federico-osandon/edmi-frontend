import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { backendUrl } from "../apis";

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
    token: string | null;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginData) => Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    checkAuthStatus: () => Promise<void>;
    clearError: () => void;
}

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
const API_URL = `${backendUrl}/api`;

// Configurar axios para usar el token en todas las peticiones
axios.interceptors.request.use(
    (config) => {
        const state = useAuthStore.getState();
        if (state.token) {
            config.headers.Authorization = `Bearer ${state.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const useAuthStore = create<AuthState>()(persist(
    (set) => ({
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: null,
        
        login: async (credentials: LoginData) => {
            try {
                set({ isLoading: true });
                const { data } = await axios.post(`${API_URL}/sessions/login`, credentials);
                // console.log(data)
                // Extraer el token y la información del usuario
                const token = data.payload.token || data.token;
                const user = data.payload.user || data.payload;
                
                // Guardar el token y actualizar el estado
                set({ 
                    isAuthenticated: true, 
                    user,
                    token,
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
                await axios.post(`${API_URL}/sessions/register`, userData);
                // Opcional: hacer login automático después del registro
                const { data } = await axios.post(`${API_URL}/sessions/login`, {
                    email: userData.email,
                    password: userData.password
                });
                
                // Extraer el token y la información del usuario
                const token = data.payload.token || data.token;
                const user = data.payload.user || data.payload;
                
                set({ 
                    isAuthenticated: true, 
                    user, 
                    token,
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
                // Llamada al endpoint de logout en el backend si es necesario
                // Usando el token actual en los headers gracias al interceptor
                try {
                    await axios.post(`${API_URL}/sessions/logout`, {});
                } catch (logoutError) {
                    console.warn('Error en logout del servidor, continuando con logout local:', logoutError);
                }
                
                // Siempre limpiar el estado local independientemente de la respuesta del servidor
                set({ 
                    isAuthenticated: false, 
                    user: null,
                    token: null,
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
                // Verificar si tenemos un token almacenado
                const state = useAuthStore.getState();
                if (!state.token) {
                    set({ 
                        isAuthenticated: false, 
                        user: null,
                        isLoading: false
                    });
                    return;
                }
                
                set({ isLoading: true });
                // Verificar estado de autenticación con el backend
                // El token se enviará automáticamente gracias al interceptor
                const response = await axios.get(`${API_URL}/sessions/current`);
                
                if (response.data.user || response.data.payload) {
                    const user = response.data.user || response.data.payload;
                    set({ 
                        isAuthenticated: true, 
                        user,
                        isLoading: false,
                        error: null
                    });
                } else {
                    set({ 
                        isAuthenticated: false, 
                        user: null,
                        token: null,
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