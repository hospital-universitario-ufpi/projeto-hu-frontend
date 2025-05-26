import { PacienteCreationDto } from "@/app/interface/dto/paciente/PacienteCreationDto";
import { PacienteDto } from "@/app/interface/dto/paciente/PacienteDto";
import api from "..";

export const createPaciente = async (paciente: PacienteCreationDto): Promise<PacienteDto>  => {
    const response = await api.post("/paciente", paciente);
    return await response.data;

}