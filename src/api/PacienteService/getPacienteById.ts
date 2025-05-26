import { PacienteDto } from "@/app/interface/dto/paciente/PacienteDto";
import api from "..";

export const getPacienteById = async (pacienteId: number): Promise<PacienteDto> => {
    const response = await api.get(`/paciente/${pacienteId}`);
    return response.data;
}