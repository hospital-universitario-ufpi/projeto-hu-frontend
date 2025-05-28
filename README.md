
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

📄 **src/app/interface/dto/entidade/EntidadeDto.ts**

```ts
export enum Categoria {
  TIPO_A = "Tipo A",
  TIPO_B = "Tipo B"
}

export const CategoriaOptions = [
  { value: Categoria.TIPO_A, label: "Tipo A" },
  { value: Categoria.TIPO_B, label: "Tipo B" }
];

export type EntidadeDto = {
  id: number;
  nome: string;
  descricao: string;
  categoria: Categoria;
};
```

---

### ✅ 2. Criação do Zod Schema

📄 **src/schemas/entidadeSchema.ts**

```ts
import { z } from "zod";

export const entidadeSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().optional(),
  categoria: z.nativeEnum(Categoria, { required_error: "Selecione uma categoria" }) // Categoria é o enum
});

export type EntidadeFormData = z.infer<typeof entidadeSchema>;
```

---

### ✅ 3. Store com Zustand

📄 **src/store/entidadeStore.ts**

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EntidadeDto } from "@/app/interface/dto/entidade/EntidadeDto";

interface EntidadeState {
  entidade: EntidadeDto | null;
  entidadeList: EntidadeDto[];
  entidadeUpdate: EntidadeDto | null;

  setEntidade: (entidade: EntidadeDto) => void;
  clearEntidade: () => void;

  setEntidadeList: (entidadeList: EntidadeDto[]) => void;
  clearEntidadeList: () => void;

  setEntidadeUpdate: (entidadeUpdate: EntidadeDto) => void;
  clearEntidadeUpdate: () => void;
}

export const useEntidadeStore = create<EntidadeState>()(
  persist(
    (set) => ({
      entidadeDto: null,
      entidadeDtoList: [],
      entidadeUpdate: null,

      setEntidadeDto: (entidadeDtp) => set({ entidadeDto }),
      clearEntidadeDto: () => set({ entidadeDto: null }),

      setEntidadeDtoList: (entidadeDtoList) => set({ entidadeDtoList }),
      clearEntidadeDtoList: () => set({ entidadeDtoList: [] }),

      setEntidadeUpdate: (entidadeUpdate) => set({ entidadeUpdate }),
      clearEntidadeUpdate: () => set({ entidadeUpdate: null })
    }),
    { name: "entidade-store", skipHydration: true }
  )
);
```

---

### ✅ 4. Adaptador para envio

📄 **src/formUtils/entidadeFormToDto.ts**

```ts
import { EntidadeFormData } from "@/schemas/entidadeSchema";

export function toEntidadeCreationDto(data: EntidadeFormData): EntidadeDto {
  return {
    nome: data.nome.trim(),
    descricao: data.descricao?.trim() || "",
    categoria: data.categoria as EntidadeDto["categoria"],
  };
}
```

---

### ✅ 5. Formulário com RHF + Zod

📄 **src/components/FormularioEntidade.tsx**

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { entidadeSchema, EntidadeFormData } from "@/schemas/entidadeSchema";
import { CategoriaOptions } from "@/app/interface/dto/entidade/EntidadeDto";

export default function FormularioEntidade() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EntidadeFormData>({
    resolver: zodResolver(entidadeSchema)
  });

  const onSubmit = (data: EntidadeFormData) => {
    await createEntidade(toEntidadeCreationDto(data)) // toEntidadeCreationDto transforma de EntidadeFormData para EntidadeCreationDto
    console.log("Dados enviados:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label>Nome</label>
        <input {...register("nome")} />
        {errors.nome && <p>{errors.nome.message}</p>}
      </div>

      <div>
        <label>Descrição</label>
        <input {...register("descricao")} />
        {errors.descricao && <p>{errors.descricao.message}</p>}
      </div>

      <div>
        <label>Categoria</label>
        <select {...register("categoria")}>
          <option value="">Selecione</option>
          {CategoriaOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.categoria && <p>{errors.categoria.message}</p>}
      </div>

      <button type="submit">Salvar</button>
    </form>
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
