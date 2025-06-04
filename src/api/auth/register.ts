import { RegisterDto } from "@/app/interface/dto/auth/RegisterDto";
import api from "..";

export const register = async(data: RegisterDto): Promise<void> => {
    await api.post("/auth/register", data)
}