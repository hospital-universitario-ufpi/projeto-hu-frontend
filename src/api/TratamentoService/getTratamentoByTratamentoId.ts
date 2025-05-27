import { TratamentoDto } from "@/app/interface/dto/tratamento/TratamentoDto";
import api from "..";

export const getTratamentoByTratamentoId = async(tratamentoId: number): Promise<TratamentoDto> => {
    try {
        const response = await api.get(`/tratamento/${tratamentoId}`)
        return response.data;
    } catch (error) {
        Promise.reject(error);
    }
}