import api from "..";
import { ParticularidadeCreationDto } from "@/app/interface/dto/particularidade/ParticularidadeCreationDto";

export const getParticularidadeByTratamentoId = async (tratamentoId: number | string): Promise<ParticularidadeCreationDto> => {
  const response = await api.get(`/tratamento/${tratamentoId}/particularidade`);
  return response.data;
};