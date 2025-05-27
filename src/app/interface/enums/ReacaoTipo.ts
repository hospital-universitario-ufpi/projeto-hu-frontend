export enum ReacaoTipo {
    ARDENCIA = "Ardência",
    ERITEMA_LEVE = "Eritema leve",
    ERITEMA_SEVERO = "Eritema severo",
    BOLHAS = "Bolhas",
}

//usar dropdown

export const ReacaoTipoOptions = [
    { value: ReacaoTipo.ARDENCIA, label: "Ardência" },
    { value: ReacaoTipo.ERITEMA_LEVE, label: "Eritema Leve" },
    { value: ReacaoTipo.ERITEMA_SEVERO, label: "Eritema Severo" },
    { value: ReacaoTipo.BOLHAS, label: "Bolhas" }
]