import { backendUrl } from ".";
import { User } from "../types/User.type";



export const createUserApi = async (user: User) => {
    const response = await fetch(`${backendUrl}/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    return response.json()
}

export const postLoginApi = async (data: User) => {
    const response = await fetch(`${backendUrl}/api/sessions/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

