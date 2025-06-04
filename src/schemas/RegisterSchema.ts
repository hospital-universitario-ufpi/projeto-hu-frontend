import { z } from "zod";

export const registerSchema = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha mínima de 6 caracteres"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
