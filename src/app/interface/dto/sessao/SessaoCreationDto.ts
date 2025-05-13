import { ReacaoTipo } from "../../enums/ReacaoTipo";

export type SessaoCreationDto = {
    dataSessao: string; // Data da sessão. Ex: new Date("2025-05-10)

    dose: number; // Dose aplicada na sessão (em J/cm²). Ex: 1.5

    reacaoPosSessao: ReacaoTipo; // Reação observada após a sessão.

    observacoes: string; // Observações gerais da sessão. Ex: "Paciente relatou leve vermelhidão após 12h.

    tempoExposicao: number; // Tempo de exposição em segundos. Ex: 120

    tratamentoId: number; // ID do tratamento vinculado à sessão. Ex: 5
};
