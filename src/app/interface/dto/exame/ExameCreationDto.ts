import { ExameTipo } from "../../enums/ExameTipo";

export type ExameCreationDto = {
    tratamentoid: number; // ID do tratamento ao qual o exame está vinculado. Ex: 1

    exameTipo: ExameTipo; // Tipo do exame realizado

    nomeExame: string; // Nome do exame específico. Ex: "25-OH Vitamina D"

    resultadoNumerico?: number; // Resultado numérico do exame, se aplicável. Ex: 28.7

    resultadoBoolean?: boolean; // Resultado booleano do exame, se aplicável. Ex: true

    resultadoOutro?: string; // Resultado textual alternativo, (livre)

    dataExame: string; // Data da realização do exame. Ex: "2025-04-22"

    laboratorio: string; // Nome do laboratório responsável pelo exame. Ex: "Laboratório Santa Clara"

    observacao?: string; // Observações adicionais sobre o exame. Ex: "Amostra coletada em jejum. Resultado validado por bioquímico."
};