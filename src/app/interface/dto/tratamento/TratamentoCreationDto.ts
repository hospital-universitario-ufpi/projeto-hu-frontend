import { DiaSemana } from "../../enums/DiaSemana";
import { RespostaTratamento } from "../../enums/RespostaTratamento";

export type TratamentoCreationDto = {
    pacienteId: number; // ID do paciente vinculado ao tratamento. Ex: "1"

    nomeTratamento: string; // Nome ou descrição breve do tratamento. Ex: "Fototerapia UVB NB"

    dataInicio: string; // Data de início do tratamento. Ex: "2025-05-01"

    dataFim: string; // Data prevista ou efetiva de término do tratamento. Ex: "2025-08-15"

    finalizado: boolean; // Indica se o tratamento foi finalizado. Ex: false

    frequenciaTratamento: number; // Número de sessões por semana (frequência). Ex: "3"

    respostaTratamento: RespostaTratamento; // Resposta clínica do paciente ao tratamento.

    diasSessao: DiaSemana[]; // Dias da semana em que o paciente realiza as sessões. Ex: "[\"SEGUNDA\", \"QUARTA\", \"SEXTA\"]"

    diagnostico: string; // Diagnóstico clínico relacionado ao tratamento. Ex: "Psoríase em placas"
};
