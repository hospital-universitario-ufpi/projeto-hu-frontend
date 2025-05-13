export const RespostaTratamento = {
    COMPLETA : "Completa",
    PARCIAL : "Parcial",
    SEM_RESPOSTA : "Sem resposta",
    PIORA_PROGRESSAO : "Piora/Progressão",
} as const;

export type RespostaTratamento = typeof RespostaTratamento[keyof typeof RespostaTratamento];