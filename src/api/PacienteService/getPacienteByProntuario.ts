import { PacienteDto } from "@/app/interface/dto/paciente/PacienteDto";
import api from "..";

export const getPacienteByProntuario = async (prontuario: string):Promise<PacienteDto> => {
    try {
        const response = await api.get<PacienteDto>(`/paciente/prontuario?prontuario=${prontuario}`);
        return response.data;
    }
    catch (error) {
        return Promise.reject(error);
    }
}