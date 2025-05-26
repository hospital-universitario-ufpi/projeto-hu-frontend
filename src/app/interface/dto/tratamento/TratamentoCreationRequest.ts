import { AreaCorporalAcometidaCreationDto } from "../areaCorporalAcometida/AreaCorporalAcometidaCreationDto";
import { ExameCreationDto } from "../exame/ExameCreationDto";
import { ParticularidadeCreationDto } from "../particularidade/ParticularidadeCreationDto";
import { TratamentoCreationDto } from "./TratamentoCreationDto"

export type TratamentoCreationRequest = {
    tratamento: TratamentoCreationDto;
    particularidade: ParticularidadeCreationDto;
    exames: ExameCreationDto[];
    areaCorporal: AreaCorporalAcometidaCreationDto
}