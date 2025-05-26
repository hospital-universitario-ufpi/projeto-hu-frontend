import { ReacaoTipo } from "../../enums/ReacaoTipo";

export type SessaoDto = {
    id: number; // ID da sessão. Ex: 12

    dataSessao: string; // Data da sessão. Ex: "2025-05-10"

    dose: number; // Dose aplicada na sessão (em J/cm²). Ex: 1.75

    reacaoPosSessao: ReacaoTipo; // Tipo de reação pós-sessão.

    observacoes: string; // Observações gerais da sessão. Ex: "Paciente apresentou eritema leve."

    tempoExposicao: number; // Tempo total de exposição (em segundos). Ex: 150
}