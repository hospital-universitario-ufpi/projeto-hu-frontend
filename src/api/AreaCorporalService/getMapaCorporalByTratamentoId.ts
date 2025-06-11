import api from "..";
import { AreaCorporalAcometidaCreationDto } from "@/app/interface/dto/areaCorporalAcometida/AreaCorporalAcometidaCreationDto";

export const getMapaCorporalByTratamentoId = async (tratamentoId: number | string): Promise<AreaCorporalAcometidaCreationDto> => {
  const response = await api.get(`/tratamento/${tratamentoId}/areacorporal`);
  return response.data;
};