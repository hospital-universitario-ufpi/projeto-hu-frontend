export enum Fototipo {
    PELE_BRANCA = "Pele Branca",
    PELE_MORENA_CLARA = "Pele Morena Clara",
    PELE_MORENA_MODERADA = "Pele Morena Moderada",
    PELE_MORENA_ESCURA = "Pele Morena Escura",
    PELE_NEGRA = "Pele Negra",
}

//usar dropdown

export const FototipoOptions = [
    { value: Fototipo.PELE_BRANCA, label: "Pele Branca" },
    { value: Fototipo.PELE_MORENA_CLARA, label: "Pele Morena Clara" },
    { value: Fototipo.PELE_MORENA_MODERADA, label: "Pele Morena Moderada" },
    { value: Fototipo.PELE_MORENA_ESCURA, label: "Pele Morena Escura" },
    { value: Fototipo.PELE_NEGRA, label: "Pele Negra" }
]