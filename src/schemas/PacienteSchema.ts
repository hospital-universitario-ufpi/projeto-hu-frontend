// src/schemas/pacienteSchema.ts
import { z } from "zod";
import { Fototipo } from "@/app/interface/enums/Fototipo";
import { PacienteSexo } from "@/app/interface/enums/PacienteSexo";

export const pacienteSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  prontuario: z.string().min(1, "Prontuário é obrigatório"),
  sexo: z.nativeEnum(PacienteSexo, { required_error: "Sexo é obrigatório"}),
  dataDeNascimento: z.string().min(1, "Data de nascimento é obrigatória"),
  medicoIndicacao: z.string().optional(),
  telefoneMedicoIndicacao: z.string().optional(),
  telefonePaciente: z.string().optional(),
  fototipo: z.nativeEnum(Fototipo, {required_error: "Fototipo é obrigatório"}),
  resumoTratamentosAnteriores: z.string().optional(),
});

export type PacienteFormData = z.infer<typeof pacienteSchema>;
