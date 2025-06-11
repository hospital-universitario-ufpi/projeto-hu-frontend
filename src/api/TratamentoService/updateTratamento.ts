import { TratamentoCreationDto } from "@/app/interface/dto/tratamento/TratamentoCreationDto";
import api from "..";

export const updateTratamento = async (id: number | string, data: TratamentoCreationDto) => {
    try {
        const response = await api.put(`/tratamento/${id}`, data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};