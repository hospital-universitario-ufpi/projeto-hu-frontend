"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PacienteCreationDto } from "@/app/interface/dto/paciente/PacienteCreationDto";
import { zodResolver } from "@hookform/resolvers/zod"
import { updatePaciente } from "@/api/PacienteService/updatePaciente";
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
        const response = await updatePaciente(pacienteUpdate.id, toPacienteCreationDto(data));
        setPacienteDto(response);
        router.push(`/paciente/${pacienteUpdate.id}`);
        console.log("Simulando edição:", data);
        setTimeout(() => clearPacienteUpdate(), 500);
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