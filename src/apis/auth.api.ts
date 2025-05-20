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
