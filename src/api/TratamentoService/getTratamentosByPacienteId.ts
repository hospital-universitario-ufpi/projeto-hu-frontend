import { TratamentoDto } from "@/app/interface/dto/tratamento/TratamentoDto";
import api from "..";

export const getTratamentosByPacienteId = async (pacienteId: number):Promise<TratamentoDto[]> => {
    const response = await api.get(`/paciente/${pacienteId}/tratamentos`);
    return response.data;
}