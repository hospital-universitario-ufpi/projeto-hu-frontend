import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/AuthStore";
import axios from "axios";


const BASE_URL = "http://localhost:8095"

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;

        if (status === 401 || status == 403) {
            useAuth().logout();
        }
    }
)

export default api;