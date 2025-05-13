export const DiaSemana = {
  SEGUNDA: "Segunda-feira",
  TERCA: "Terça-feira",
  QUARTA: "Quarta-feira",
  QUINTA: "Quinta-feira",
  SEXTA: "Sexta-feira",
} as const;

export type DiaSemana = typeof DiaSemana[keyof typeof DiaSemana];