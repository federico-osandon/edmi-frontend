import { useAuthStore } from '../store/auth';

interface Student {
    first_name?: string;
    last_name?: string;
    email?: string;
    is_active?: boolean;
    role?: string;
    enrollment?: boolean;
    _id?: string;
    activity?: string;
}

export const getStudentsApi = async (activity: string | undefined) => {
    // Obtener el token del store de autenticación
    const token = useAuthStore.getState().token;
    // console.log(token)
    // Preparar los headers
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };
    
    // Añadir el token solo si existe
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/users${activity ? `?activity=${activity}` : ''}`, {
        method: 'GET',
        headers
    });
    
    return response.json();
}

export const createStudentApi = async (student: Student) => {
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
    
    const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/users`, {
        method: 'POST',
        headers,
        body: JSON.stringify(student)
    });
    
    return response.json();
}


export const updateStudentApi = async (studentUpdate: Student) => {
    // Obtener el token del store de autenticación
    const token = useAuthStore.getState().token;
    console.log(studentUpdate)
    // Preparar los headers
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };
    
    // Añadir el token solo si existe
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/users/${studentUpdate._id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(studentUpdate)
    });
    
    return response.json();
}
