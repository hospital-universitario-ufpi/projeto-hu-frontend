import { DiaSemana } from "../../enums/DiaSemana";
import { RespostaTratamento } from "../../enums/RespostaTratamento";
import { AreaCorporalAcometidaDto } from "../areaCorporalAcometida/AreaCorporalAcometidaDto";
import { ParticularidadeDto } from "../particularidade/ParticularidadeDto";
import { SessaoDto } from "../sessao/SessaoDto";

export type TratamentoDto = {
    tratamentoId: number; // ID do tratamento. Ex: "101"

    nomeTratamento: string; // Nome do tratamento realizado. Ex: "Fototerapia UVB NB"

    dataInicio: string; // Data de início do tratamento. Ex: "2025-05-01"

    dataFim: string; // Data de término do tratamento. Ex: "2025-08-20"

    finalizado: boolean; // Indica se o tratamento já foi finalizado. Ex: "true"

    modalidade: string; // Modalidade ou tipo de tratamento. Ex: "Ambulatorial"

    diagnostico: string; // Diagnóstico clínico associado ao tratamento. Ex: "Psoríase em placas"

    frequenciaTratamento: number; // Frequência semanal de sessões . Ex: "3"

    diasSessao: DiaSemana[]; // Dias da semana em que o tratamento ocorre. Ex: ["\SEGUNDA\", "\QUARTA\", "\SEXTA\"]

    respostaTratamento: RespostaTratamento; // Resposta clínica ao tratamento.

    areaCorporalAcometida: AreaCorporalAcometidaDto; // Informações sobre a área corporal acometida.

    sessoes: SessaoDto[]; // Lista de sessões realizadas durante o tratamento.

    particularidade: ParticularidadeDto; // Particularidades específicas do paciente durante o tratamento.
};