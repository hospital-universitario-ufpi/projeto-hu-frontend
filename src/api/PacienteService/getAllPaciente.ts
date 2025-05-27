import { PacienteDto } from "@/app/interface/dto/paciente/PacienteDto";
import api from "..";

export const getAllPaciente = async ():Promise<PacienteDto[]> => {
    try {
        const response = await api.get<PacienteDto[]>('/paciente');
        return response.data;
    }
    catch (error) {
        return Promise.reject(error);
    }
}