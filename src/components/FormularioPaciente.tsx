"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PacienteCreationDto } from "@/app/interface/dto/paciente/PacienteCreationDto";
import { PacienteDto } from "@/app/interface/dto/paciente/PacienteDto";
import { PacienteSexoOptions } from "@/app/interface/enums/PacienteSexo";
import { FototipoOptions } from "@/app/interface/enums/Fototipo";
import { createPaciente } from "@/api/PacienteService/createPaciente";


type Props = {
  onSalvar?: (dados: PacienteDto) => void;
  dadosIniciais?: PacienteCreationDto | null;
};

export default function FormularioPaciente({ onSalvar, dadosIniciais }: Props) {
  const router = useRouter();

  const [formData, setFormData] = useState<PacienteCreationDto>({
    nome: "",
    prontuario: "",
    sexo: null,
    dataDeNascimento: "",
    medicoIndicacao: "",
    telefoneMedicoIndicacao: "",
    telefonePaciente: "",
    fototipo: null,
    resumoTratamentosAnteriores: "",
  });

  const [finalizado, setFinalizado] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    if (dadosIniciais) {
      setFormData(dadosIniciais);
      setFinalizado(true);
    }
  }, [dadosIniciais]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const pacienteSalvo = await createPaciente(formData);
      if (onSalvar) onSalvar(pacienteSalvo);
      router.push(`/paciente/${pacienteSalvo.id}`);
    } catch (err) {
      console.error("Erro ao salvar paciente:", err);
    }
  };

  return (
    <section className="w-full bg-white pt-2 md:pt-6">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 bg-white rounded-xl pt-4 pb-6 md:pt-6 md:pb-8 relative">
        <h2 className="text-green-700 font-bold text-3xl text-center mb-10">
          {finalizado && !modoEdicao ? "Dados do Paciente" : "Cadastro de Paciente"}
        </h2>

        {finalizado && !modoEdicao ? (
          <div className="bg-green-100 p-6 rounded-xl space-y-4 text-green-800 shadow">
            <p><strong>Nome:</strong> {formData.nome}</p>
            <p><strong>Prontuário:</strong> {formData.prontuario}</p>
            <p><strong>Sexo:</strong> {formData.sexo}</p>
            <p><strong>Data de Nascimento:</strong> {formData.dataDeNascimento}</p>
            <p><strong>Telefone do Paciente:</strong> {formData.telefonePaciente}</p>
            <p><strong>Médico que Indicou:</strong> {formData.medicoIndicacao}</p>
            <p><strong>Telefone do Médico:</strong> {formData.telefoneMedicoIndicacao}</p>
            <p><strong>Fototipo:</strong> {formData.fototipo}</p>
            <p><strong>Resumo dos Tratamentos:</strong> {formData.resumoTratamentosAnteriores}</p>
            <div className="text-right">
              <button
                onClick={() => setModoEdicao(true)}
                className="text-sm text-green-700 underline hover:text-green-900"
              >
                Editar Cadastro Paciente
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
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
                    name={name}
                    value={formData[name as keyof PacienteCreationDto] as string}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm text-gray-700"
                    placeholder={placeholder}
                    required
                  />
                </div>
              ))}

              {/* Sexo */}
              <div>
                <label className="block text-green-700 font-medium mb-2">Sexo</label>
                <select
                  name="sexo"
                  value={formData.sexo ?? ""}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-700"
                  required
                >
                  <option value="">Selecione</option>
                  {PacienteSexoOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Fototipo */}
              <div>
                <label className="block text-green-700 font-medium mb-2">Fototipo</label>
                <select
                  name="fototipo"
                  value={formData.fototipo ?? ""}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-700"
                  required
                >
                  <option value="">Selecione</option>
                  {FototipoOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Resumo dos tratamentos anteriores */}
              <div className="md:col-span-2">
                <label className="block text-green-700 font-medium mb-2">Resumo de Tratamentos Anteriores</label>
                <textarea
                  name="resumoTratamentosAnteriores"
                  value={formData.resumoTratamentosAnteriores}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
                  placeholder="Descreva brevemente os tratamentos anteriores do paciente"
                />
              </div>
            </div>

            <div className="flex justify-center mt-16">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold px-8 py-4 rounded-full shadow-md transition"
              >
                {dadosIniciais || modoEdicao ? "Salvar Alterações" : "Finalizar Cadastro"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
