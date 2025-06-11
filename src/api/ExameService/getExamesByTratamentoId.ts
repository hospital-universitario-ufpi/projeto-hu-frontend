import api from "..";
import { ExameCreationDto } from "@/app/interface/dto/exame/ExameCreationDto";

export const getExamesByTratamentoId = async (tratamentoId: number | string): Promise<ExameCreationDto[]> => {
  const response = await api.get(`/tratamento/${tratamentoId}/exames`);
  return response.data;
};