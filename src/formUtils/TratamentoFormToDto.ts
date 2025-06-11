import { TratamentoCreationDto } from "@/app/interface/dto/tratamento/TratamentoCreationDto";
import { TratamentoFormData } from "../schemas/TratamentoSchema";

export const toTratamentoCreationDto = (formData: TratamentoFormData): TratamentoCreationDto => {
    const dto: TratamentoCreationDto = {
        pacienteId: Number(formData.pacienteId),
        nomeTratamento: formData.nomeTratamento,
        dataInicio: formData.dataInicio,
        dataFim: formData.dataFim,
        finalizado: formData.finalizado,
        frequenciaTratamento: Number(formData.frequenciaTratamento),
        respostaTratamento: formData.respostaTratamento,
        diasSessao: formData.diasSessao,
        diagnostico: formData.diagnostico,
    };

    return dto;
};