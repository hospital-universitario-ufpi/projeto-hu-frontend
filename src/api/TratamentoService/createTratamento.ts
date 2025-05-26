import { TratamentoCreationRequest } from "@/app/interface/dto/tratamento/TratamentoCreationRequest";
import { TratamentoDto } from "@/app/interface/dto/tratamento/TratamentoDto";
import api from "..";

export const createTratamento = async (tratamentoRequest: TratamentoCreationRequest):Promise<TratamentoDto> => {
    const response = await api.post("/tratamento", tratamentoRequest);
    return response.data;
}