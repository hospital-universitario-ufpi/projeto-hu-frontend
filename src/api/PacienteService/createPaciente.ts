
import api from "..";
import { PacienteCreationDto } from "../../app/interface/dto/paciente/PacienteCreationDto";
import { PacienteDto } from "../../app/interface/dto/paciente/PacienteDto";

export const createPaciente = async (paciente:PacienteCreationDto): Promise<PacienteDto> => {
    try {
        const response = await api.post<PacienteDto>('/pacientes', paciente);
        return response.data;
    }
    catch (error) {
        return Promise.reject(error);
    }
}