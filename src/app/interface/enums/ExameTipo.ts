export const ExameTipo = {
    EXAME_ANATOMOPATOLOGICO: "Exame anatomopatológico",
    IMUNO_HISTOQUIMICA: "Imuno-histoquímica",
    FAN: "FAN",
    FUNCAO_RENAL: "Função renal",
    FUNCAO_HEPATICA: "Função hepática",
    VITAMINA_D: "Vitamina D",
    OUTROS : "Outros",
} as const;

export type ExameTipo = typeof ExameTipo[keyof typeof ExameTipo];