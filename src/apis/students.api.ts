console.log(import.meta.env.VITE_API_BACKEND_URL)

console.log(import.meta.env.VITE_API_BACKEND_URL)

interface Student {
    first_name?: string;
    last_name?: string;
    email?: string;
    is_active?: boolean;
    role?: string;
    enrollment?: boolean;
    _id?: string;
}

export const getStudentsApi = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/users?role=estudiantes`)
    return response.json()
}

export const createStudentApi = async (student: Student) => {
    const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
    return response.json()
}


export const updateStudentApi = async (student: Student) => {
    const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/users/${student._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
    return response.json()
}
