import { backendUrl } from ".";
import { useAuthStore } from '../store/auth';

interface Curse {
    name?: string;
    description?: string;
    is_active?: boolean;
    _id?: string;
    category?: string;
    price?: number;
    duration?: string;
}

export const getCursesApi = async (category?: string) => {
    // Obtener el token del store de autenticación
    const token = useAuthStore.getState().token;
    
    // Preparar los headers
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };
    
    // Añadir el token solo si existe
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${backendUrl}/api/curses${category ? `?category=${category}` : ''}`, {
        method: 'GET',
        headers
    });
    
    return response.json();
}

export const createCurseApi = async (curse: Curse) => {
    // Obtener el token del store de autenticación
    const token = useAuthStore.getState().token;
    
    // Preparar los headers
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };
    
    // Añadir el token solo si existe
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${backendUrl}/api/curses`, {
        method: 'POST',
        headers,
        body: JSON.stringify(curse)
    });
    
    return response.json();
}

export const updateCurseApi = async (curse: Curse) => {
    // Obtener el token del store de autenticación
    const token = useAuthStore.getState().token;
    
    // Preparar los headers
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };
    
    // Añadir el token solo si existe
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${backendUrl}/api/curses/${curse._id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(curse)
    });
    
    return response.json();
}
