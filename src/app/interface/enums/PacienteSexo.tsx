export const PacienteSexo = {
    M : "M",
    F : "F",
} as const;

export type PacienteSexo = typeof PacienteSexo[keyof typeof PacienteSexo];