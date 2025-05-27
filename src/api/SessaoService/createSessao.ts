import { SessaoCreationDto } from "@/app/interface/dto/sessao/SessaoCreationDto";
import { SessaoDto } from "@/app/interface/dto/sessao/SessaoDto";
import api from "..";

export const createSessao = async(sessao:SessaoCreationDto): Promise<SessaoDto> => {
    const response = await api.post("/sessao", sessao);
    return response.data;
}