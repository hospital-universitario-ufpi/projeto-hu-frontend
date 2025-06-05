import { z } from "zod";
import { DiaSemana } from "@/app/interface/enums/DiaSemana";
import { RespostaTratamento } from "@/app/interface/enums/RespostaTratamento";

export const tratamentoSchema = z.object({
  pacienteId: z.union([z.string(), z.number()]), // Aceita string ou number, ajuste conforme seu form
  nomeTratamento: z.string().min(1, "Nome do tratamento é obrigatório"),
  dataInicio: z.string().min(1, "Data de início é obrigatória"),
  dataFim: z.string().min(1, "Data de fim é obrigatória"),
  finalizado: z.boolean(),
  frequenciaTratamento: z.union([z.string(), z.number()]).refine(val => !isNaN(Number(val)), {
    message: "Frequência deve ser um número",
  }),
  respostaTratamento: z.nativeEnum(RespostaTratamento, { required_error: "Resposta ao tratamento é obrigatória" }),
  diasSessao: z.array(z.nativeEnum(DiaSemana)).min(1, "Selecione pelo menos um dia de sessão"),
  diagnostico: z.string().min(1, "Diagnóstico é obrigatório"),
});

export type TratamentoFormData = z.infer<typeof tratamentoSchema>;