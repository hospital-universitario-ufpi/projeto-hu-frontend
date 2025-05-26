export enum ExameTipo {
    EXAME_ANATOMOPATOLOGICO = "Exame anatomopatológico",
    IMUNO_HISTOQUIMICA = "Imuno-histoquímica",
    FAN = "FAN",
    FUNCAO_RENAL = "Função renal",
    FUNCAO_HEPATICA = "Função hepática",
    VITAMINA_D = "Vitamina D",
    OUTROS  = "Outros",
}

//usar dropdown

export const ExameTipoOptions = [
    {value: ExameTipo.EXAME_ANATOMOPATOLOGICO, label: "Exame anatomopatológico"},
    {value: ExameTipo.IMUNO_HISTOQUIMICA, label: "Imuno-histoquímica"},
    {value: ExameTipo.FAN, label: "FAN"},
    {value: ExameTipo.FUNCAO_RENAL, label: "Função renal"},
    {value: ExameTipo.FUNCAO_HEPATICA, label: "Função hepática"},
    {value: ExameTipo.VITAMINA_D, label: "Vitamina D"},
    {value: ExameTipo.OUTROS, label: "Outros"}
]