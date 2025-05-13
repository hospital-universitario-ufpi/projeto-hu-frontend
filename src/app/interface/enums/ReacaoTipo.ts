export const ReacaoTipo = {
    ARDENCIA : "Ardência",
    ERITEMA_LEVE : "Eritema leve",
    ERITEMA_SEVERO : "Eritema severo",
    BOLHAS : "Bolhas",
} as const;

export type ReacaoTipo = typeof ReacaoTipo[keyof typeof ReacaoTipo];