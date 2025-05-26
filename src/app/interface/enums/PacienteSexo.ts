export enum PacienteSexo {
    M = "Masculino",
    F = "Feminino",
}

// Lista auxiliar para uso em UI (radio, botão, etc.)

export const PacienteSexoOptions: { value: PacienteSexo; label: string }[] = [
  { value: PacienteSexo.M, label: "Masculino" },
  { value: PacienteSexo.F, label: "Feminino" },
];