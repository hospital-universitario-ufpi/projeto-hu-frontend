"use client";

import React, { useState, useEffect } from "react";

export type Paciente = {
  id?: number;
  prontuario: string;
  sexo: "MASCULINO" | "FEMININO";
  cpf: string;
  dataDeNascimento: string;
  medicoIndicacao: string;
  telefoneMedicoIndicacao: string;
  telefonePaciente: string;
  fototipo: "I" | "II" | "III" | "IV" | "V" | "VI";
};


type Props = {
  onSalvar: (dados: Paciente) => void;
  dadosIniciais?: Paciente | null;
};


export default function FormularioPaciente({ onSalvar, dadosIniciais }: Props) {
  const [formData, setFormData] = useState<Paciente>({
    prontuario: "",
    sexo: "MASCULINO",
    cpf: "",
    dataDeNascimento: "",
    medicoIndicacao: "",
    telefoneMedicoIndicacao: "",
    telefonePaciente: "",
    fototipo: "I",
  });

  useEffect(() => {
    if (dadosIniciais) {
      setFormData(dadosIniciais);
    }
  }, [dadosIniciais]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSalvar(formData);
  };

  return (
    <section className="w-full bg-white pt-2 md:pt-6">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 bg-white rounded-xl pt-4 pb-6 md:pt-6 md:pb-8">
        <h2 className="text-green-700 font-bold text-3xl text-center mt-2 mb-10">
          Cadastro de Paciente
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Prontuário */}
            <div>
              <label className="block text-green-700 font-medium mb-2">Prontuário</label>
              <input
                type="text"
                name="prontuario"
                value={formData.prontuario}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm text-gray-700"
                placeholder="Número do prontuário"
                required
              />
            </div>

            {/* CPF */}
            <div>
              <label className="block text-green-700 font-medium mb-2">CPF</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm text-gray-700"
                placeholder="000.000.000-00"
                required
              />
            </div>

            {/* Data de Nascimento */}
            <div>
              <label className="block text-green-700 font-medium mb-2">Data de Nascimento</label>
              <input
                type="date"
                name="dataDeNascimento"
                value={formData.dataDeNascimento}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm text-gray-700"
                required
              />
            </div>

            {/* Telefone do Paciente */}
            <div>
              <label className="block text-green-700 font-medium mb-2">Telefone do Paciente</label>
              <input
                type="tel"
                name="telefonePaciente"
                value={formData.telefonePaciente}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm text-gray-700"
                placeholder="(00) 00000-0000"
                required
              />
            </div>

            {/* Médico que Indicou */}
            <div>
              <label className="block text-green-700 font-medium mb-2">Médico que Indicou</label>
              <input
                type="text"
                name="medicoIndicacao"
                value={formData.medicoIndicacao}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm text-gray-700"
                placeholder="Nome do médico"
                required
              />
            </div>

            {/* Telefone do Médico */}
            <div>
              <label className="block text-green-700 font-medium mb-2">Telefone do Médico</label>
              <input
                type="tel"
                name="telefoneMedicoIndicacao"
                value={formData.telefoneMedicoIndicacao}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm text-gray-700"
                placeholder="(00) 00000-0000"
                required
              />
            </div>

            {/* Sexo */}
            <div>
              <label className="block text-green-700 font-medium mb-2">Sexo</label>
              <div className="relative w-full">
                <select
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleChange}
                  className="appearance-none w-full p-3 pr-8 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-700"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                </select>
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-green-700 text-sm">
                  ▼
                </div>
              </div>
            </div>

            {/* Fototipo */}
            <div>
              <label className="block text-green-700 font-medium mb-2">Fototipo</label>
              <div className="relative w-full">
                <select
                  name="fototipo"
                  value={formData.fototipo}
                  onChange={handleChange}
                  className="appearance-none w-full p-3 pr-8 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-700"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="I">I - Pele Branca</option>
                  <option value="II">II - Pele Clara</option>
                  <option value="III">III - Morena Clara</option>
                  <option value="IV">IV - Morena Escura</option>
                  <option value="V">V - Negra</option>
                  <option value="VI">VI - Negra Profunda</option>
                </select>
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-green-700 text-sm">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Botão de envio */}
          <div className="flex justify-center mt-16">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold px-8 py-4 rounded-full shadow-md transition"
            >
              {dadosIniciais ? "Salvar Alterações" : "Finalizar Cadastro"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
