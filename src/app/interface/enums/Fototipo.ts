export const Fototipo = {
    PELE_BRANCA: "Pele Branca",
    PELE_MORENA_CLARA: "Pele Morena Clara",
    PELE_MORENA_MODERADA: "Pele Morena Moderada",
    PELE_MORENA_ESCURA: "Pele Morena Escura",
    PELE_NEGRA: "Pele Negra",
} as const;

export type Fototipo = typeof Fototipo[keyof typeof Fototipo];
