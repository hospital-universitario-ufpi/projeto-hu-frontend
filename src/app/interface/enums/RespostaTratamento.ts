export enum RespostaTratamento {
    COMPLETA = "Completa",
    PARCIAL = "Parcial",
    SEM_RESPOSTA = "Sem resposta",
    PIORA_PROGRESSAO = "Piora/Progressão",
}

//usar dropdown

export const RespostaTratamentoOptions = [
    { value: RespostaTratamento.COMPLETA, label: "Completa" },
    { value: RespostaTratamento.PARCIAL, label: "Parcial" },
    { value: RespostaTratamento.SEM_RESPOSTA, label: "Sem resposta" },
    { value: RespostaTratamento.PIORA_PROGRESSAO, label: "Piora/Progressão" }
]