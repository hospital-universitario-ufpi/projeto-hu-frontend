import { PacienteCreationDto } from "@/app/interface/dto/paciente/PacienteCreationDto";
import api from "..";

export const updatePaciente = async (id: number, data: PacienteCreationDto) => {
    try {
        const response = await api.put(`/paciente/${id}`, data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};