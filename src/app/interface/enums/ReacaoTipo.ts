export enum ReacaoTipo {
    ARDENCIA = "Ardência",
    ERITEMA_LEVE = "Eritema leve",
    ERITEMA_SEVERO = "Eritema severo",
    BOLHAS = "Bolhas",
}

//usar dropdown

export const ReacaoTipoOptions = [
    { value: ReacaoTipo.ARDENCIA, label: "Ardência" },
    { value: ReacaoTipo.ERITEMA_LEVE, label: "Eritema leve" },
    { value: ReacaoTipo.ERITEMA_SEVERO, label: "Eritema severo" },
    { value: ReacaoTipo.BOLHAS, label: "Bolhas" }
]