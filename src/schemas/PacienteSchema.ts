import { z } from "zod";
import { Fototipo } from "@/app/interface/enums/Fototipo";
import { PacienteSexo } from "@/app/interface/enums/PacienteSexo";

export const pacienteSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),

  prontuario: z
    .string()
    .min(1, "Prontuário é obrigatório")
    .max(50, "Prontuário deve ter no máximo 50 caracteres"),

  sexo: z.nativeEnum(PacienteSexo, {
    required_error: "Sexo é obrigatório",
  }),

  dataDeNascimento: z
    .string()
    .min(1, "Data de nascimento é obrigatória"), // validada como passada no back

  medicoIndicacao: z
    .string()
    .max(100, "Nome do médico deve ter no máximo 100 caracteres")
    .optional(),

  telefoneMedicoIndicacao: z
    .string()
    .regex(/^\d{10,15}$/, "Telefone do médico deve conter entre 10 e 15 dígitos")
    .optional(),

  telefonePaciente: z
    .string()
    .regex(/^\d{10,15}$/, "Telefone do paciente deve conter entre 10 e 15 dígitos")
    .optional(),

  fototipo: z.nativeEnum(Fototipo, {
    required_error: "Fototipo é obrigatório",
  }),

  resumoTratamentosAnteriores: z
    .string()
    .max(3000, "Resumo deve ter no máximo 3000 caracteres")
    .optional(),
});

export type PacienteFormData = z.infer<typeof pacienteSchema>;
