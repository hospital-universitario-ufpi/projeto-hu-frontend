import { ExameTipo } from "../../enums/ExameTipo";

export type ExameDto = {
    id: number; // ID do exame. Ex: 101

    exameTipo: ExameTipo; // Tipo do exame realizado

    nomeExame: string; // Nome do exame específico. Ex: "25-OH Vitamina D"

    resultadoNumerico?: number; // Resultado numérico do exame, se aplicável. Ex: 30.5

    resultadoBoolean?: boolean; // Resultado booleano do exame, se aplicável. Ex: false

    resultadoOutro?: string; // Resultado textual alternativo. Ex: "Sem alterações clínicas relevantes"

    dataExame: string; // Data da realização do exame. Ex: "2025-04-22"

    laboratorio: string; // Nome do laboratório responsável pelo exame. Ex: "Laboratório Central"

    observacao?: string; // Observações adicionais sobre o exame. Ex: "Paciente realizou o exame após jejum de 12 horas."
};