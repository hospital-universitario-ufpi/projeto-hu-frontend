import api from ".."

export const validateToken = async(): Promise<boolean> => {
    try {
        const response = await api.get("/auth/validate")
        console.log(response)
        return response.status === 200;
    } catch {
        return false;
    }
}