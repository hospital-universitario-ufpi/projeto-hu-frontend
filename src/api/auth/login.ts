import { AuthResponse } from "@/app/interface/dto/auth/AuthResponseDto";
import { LoginDto } from "@/app/interface/dto/auth/LoginDto";
import api from "..";

export const loginService = async(login: LoginDto): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", login)
    return response.data;
}