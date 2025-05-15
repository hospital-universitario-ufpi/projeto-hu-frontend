import api from "..";
import { PacienteDto } from '../../app/interface/dto/paciente/PacienteDto';

export const getPacienteById = async (pacienteId: number): Promise<PacienteDto> => {
  try {
    const response = await api.get<PacienteDto>(`/pacientes/${pacienteId}`);
    return response.data;
  }
    catch (error) {
    return Promise.reject(error);
  }
}
