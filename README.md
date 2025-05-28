
# PROJETO HU FRONTEND

## 🧭 Instrução: Formulários

<details>
<summary><strong>Guia de Implementação com Zustand, React Hook Form e Zod</strong></summary>

### 📁 Estrutura de Pastas

```bash
src/
├── api/
├── app/
│   └── interface/
│       └── dto/
│           └── entidade/
├── components/
│   └── FormularioEntidade.tsx
├── schemas/
│   └── entidadeSchema.ts
├── store/
│   └── entidadeStore.ts
├── utils/
│   └── entidadeFormToDto.ts
```

### ✅ 1. Criação do DTO 
DTO e enum ficam em pastas separadas

📄 **src/app/interface/dto/entidade/EntidadeDto.ts**

```ts
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

import { Fototipo } from "../../enums/Fototipo";
import { PacienteSexo } from "../../enums/PacienteSexo";

export type PacienteCreationDto = {
    nome: string; // Nome completo do paciente. Ex: "Maria de Souza"

    prontuario: string; // Código do Prontuário do paciente. Ex: "PR123456"

    sexo: PacienteSexo; // Sexo do paciente

    dataDeNascimento: string; // Data de nascimento do paciente. Ex: "1990-05-20"

    medicoIndicacao: string; // Nome do médico que indicou o paciente. Ex: "Dr. Carlos Alberto"

    telefoneMedicoIndicacao: string; // Telefone do médico que indicou o paciente. Ex: "(86)99999-1234"

    telefonePaciente: string; // Telefone de contato do paciente. Ex: "(86)98888-5678"

    fototipo: Fototipo; // Fototipo de pele do paciente.

    resumoTratamentosAnteriores: string; // Resumo opcional de tratamentos anteriores realizados. Ex: "Paciente já realizou sessões de fototerapia em 2022."
};

import { Fototipo } from "../../enums/Fototipo";
import { PacienteSexo } from "../../enums/PacienteSexo";

export type PacienteDto = {
    id: number; // ID do paciente. Ex: 1

    nome: string; // Nome completo do paciente. Ex: "Joao da Silva"
    
    prontuario: string; // Código do prontuário do paciente - vem da ficha do GHU. Ex: "PRT-2024-001"

    sexo: PacienteSexo; // Sexo do paciente

    dataDeNascimento: string; // Data de nascimento do paciente. Ex: "1990-08-15"

    medicoIndicacao: string; // Nome do médico que indicou o paciente. Ex: "Dr, Carlos Mendes"

    telefoneMedicoIndicacao: string; // Telefone do médico que indicou o paciente. Ex: "(86) 99999-1234"

    telefonePaciente: string; // Telefone do paciente. Ex: "(86) 98888-5678"

    fototipo: Fototipo; // Fototipo de pele do paciente

    resumoTratamentosAnteriores: string; // Resumo dos tratamentos anteriores realizados pelo paciente. Ex: "Já realizou 20 sessões de fototerapia entre 2023 e 2024."
};

```

---

### ✅ 2. Criação do Zod Schema

📄 **src/schemas/entidadeSchema.ts**

```ts
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

```

---

### ✅ 3. Store com Zustand

📄 **src/store/entidadeStore.ts**

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PacienteDto } from "@/app/interface/dto/paciente/PacienteDto";

interface PacienteState {
  pacienteDto: PacienteDto | null;
  pacienteDtoList: PacienteDto[];
  pacienteUpdate: PacienteDto | null;

  setPacienteDto: (pacienteDto: PacienteDto) => void;
  clearPacienteDto: () => void;

  setPacienteDtoList: (pacienteDtoList: PacienteDto[]) => void;
  clearPacienteDtoList: () => void;

  setPacienteUpdate: (pacienteUpdate: PacienteDto) => void;
  clearPacienteUpdate: () => void;

  clearAll: () => void;
}

export const usePacienteStore = create<PacienteState>()(
  persist(
    (set) => ({
      pacienteDto: null,
      pacienteDtoList: [],
      pacienteUpdate: null,

      setPacienteDto: (pacienteDto) => set({ pacienteDto }),
      clearPacienteDto: () => set({ pacienteDto: null }),

      setPacienteDtoList: (pacienteDtoList) => set({ pacienteDtoList }),
      clearPacienteDtoList: () => set({ pacienteDtoList: [] }),

      setPacienteUpdate: (pacienteUpdate) => set({ pacienteUpdate }),
      clearPacienteUpdate: () => set({pacienteUpdate: null}),

      clearAll: () => set({
        pacienteDto: null,
        pacienteUpdate: null
      })
    }),
    {
      name: "paciente-store",
      skipHydration: true,      
    }
  )
);

```

---

### ✅ 4. Adaptador para envio

📄 **src/formUtils/entidadeFormToDto.ts**

```ts
import { PacienteCreationDto } from "@/app/interface/dto/paciente/PacienteCreationDto";
import { PacienteFormData } from "@/schemas/PacienteSchema";

export const toPacienteCreationDto = (formData: PacienteFormData):PacienteCreationDto => {
    const dto: PacienteCreationDto = {
        nome: formData.nome,
        prontuario: formData.prontuario,
        sexo: formData.sexo,
        dataDeNascimento: formData.dataDeNascimento,
        medicoIndicacao: formData.medicoIndicacao || "",
        telefoneMedicoIndicacao: formData.telefoneMedicoIndicacao || "",
        telefonePaciente: formData.telefonePaciente || "",
        fototipo: formData.fototipo,
        resumoTratamentosAnteriores: formData.resumoTratamentosAnteriores || ""
    }

    return dto;
}
```

---

### ✅ 5. Formulário com RHF + Zod

📄 **src/components/FormularioEntidade.tsx**

```tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PacienteCreationDto } from "@/app/interface/dto/paciente/PacienteCreationDto";
import { zodResolver } from "@hookform/resolvers/zod"

import { PacienteSexoOptions } from "@/app/interface/enums/PacienteSexo";
import { FototipoOptions } from "@/app/interface/enums/Fototipo";
import { createPaciente } from "@/api/PacienteService/createPaciente";
import { usePacienteStore } from "@/store/PacienteStore";
import { useForm } from "react-hook-form";
import { PacienteFormData, pacienteSchema } from "@/schemas/PacienteSchema";
import { toPacienteCreationDto } from "@/formUtils/PacienteFormToDto";


export default function FormularioPaciente() {
  const router = useRouter();
  const { pacienteUpdate, clearPacienteUpdate, setPacienteDto } = usePacienteStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PacienteFormData>({
    resolver: zodResolver(pacienteSchema),
  });

  useEffect(() => {
    if (pacienteUpdate) {
      reset(pacienteUpdate);
    }
  }, [pacienteUpdate, reset]);

  const onSubmit = async (data: PacienteFormData) => {
    try {
      if (pacienteUpdate) {
        // chamar service de update
        // chamar clearPacienteUpdate
        console.log("Simulando edição:", data);
      } else {
        const response = await createPaciente(toPacienteCreationDto(data));
        setPacienteDto(response)
        router.push(`/paciente/${response.id}`);
      }
    } catch (error) {
      console.error("Erro ao salvar paciente:", error);
    }
  };

  return (
    <section className="w-full bg-white pt-2 md:pt-6">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 bg-white rounded-xl pt-4 pb-6 md:pt-6 md:pb-8 relative">
        <h2 className="text-green-700 font-bold text-3xl text-center mb-10">
          {pacienteUpdate ? "Editar Paciente" : "Cadastro de Paciente"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "Nome", name: "nome", placeholder: "Nome completo", type: "text" },
              { label: "Prontuário", name: "prontuario", placeholder: "Número do prontuário", type: "text" },
              { label: "Data de Nascimento", name: "dataDeNascimento", type: "date" },
              { label: "Telefone do Paciente", name: "telefonePaciente", placeholder: "(00) 00000-0000", type: "tel" },
              { label: "Médico que Indicou", name: "medicoIndicacao", placeholder: "Nome do médico", type: "text" },
              { label: "Telefone do Médico", name: "telefoneMedicoIndicacao", placeholder: "(00) 00000-0000", type: "tel" },
            ].map(({ label, name, placeholder, type }) => (
              <div key={name}>
                <label className="block text-green-700 font-medium mb-2">{label}</label>
                <input
                  type={type}
                  {...register(name as keyof PacienteFormData)}
                  className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm text-gray-700"
                  placeholder={placeholder}
                />
                {errors[name as keyof PacienteFormData] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name as keyof PacienteFormData]?.message}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-green-700 font-medium mb-2">Sexo</label>
              <select
                {...register("sexo")}
                className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-700"
              >
                <option value="">Selecione</option>
                {PacienteSexoOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.sexo && <p className="text-red-500 text-sm mt-1">{errors.sexo.message}</p>}
            </div>

            <div>
              <label className="block text-green-700 font-medium mb-2">Fototipo</label>
              <select
                {...register("fototipo")}
                className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-700"
              >
                <option value="">Selecione</option>
                {FototipoOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.fototipo && <p className="text-red-500 text-sm mt-1">{errors.fototipo.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-green-700 font-medium mb-2">Resumo de Tratamentos Anteriores</label>
              <textarea
                {...register("resumoTratamentosAnteriores")}
                rows={4}
                className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
                placeholder="Descreva brevemente os tratamentos anteriores do paciente"
              />
              {errors.resumoTratamentosAnteriores && (
                <p className="text-red-500 text-sm mt-1">{errors.resumoTratamentosAnteriores.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold px-8 py-4 rounded-full shadow-md transition"
            >
              {pacienteUpdate ? "Salvar Alterações" : "Finalizar Cadastro"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
```

---

### 🔄 Comunicação Visual dos Componentes

```plaintext
[ Página com Formulário ]
         |
         |  useForm + RHF
         v
[ FormularioEntidade.tsx ]
         |
         |  chama submit
         v
[ Adaptador toEntidadeDto ]
         |
         |  envia dados limpos
         v
[ Store Zustand ] <-> [ API ]
```

</details>
