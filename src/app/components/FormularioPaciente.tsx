"use client";

import React, { useState, useEffect } from "react";

export type Paciente = {
  nome: string;
  prontuario: string;
  sexo: string;
  dataNascimento: string;
  celularPaciente: string;
  medicoIndicou: string;
  celularMedico: string;
  cpf: string;
  comorbidades: string;
};

type Props = {
  onSalvar: (dados: Paciente) => void;
  dadosIniciais?: Paciente | null;
};

export default function FormularioPaciente({ onSalvar, dadosIniciais }: Props) {
  const [formData, setFormData] = useState<Paciente>({
    nome: "",
    prontuario: "",
    sexo: "",
    dataNascimento: "",
    celularPaciente: "",
    medicoIndicou: "",
    celularMedico: "",
    cpf: "",
    comorbidades: "",
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
    <section className="w-full bg-white py-2 md:py-4">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 bg-white rounded-xl p-6 md:p-12">
        <h2 className="text-green-700 font-bold text-3xl text-center mt-2 mb-10">
          Cadastro de Paciente
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                label: "Nome",
                name: "nome",
                type: "text",
                placeholder: "Nome completo",
              },
              {
                label: "Prontuário",
                name: "prontuario",
                type: "text",
                placeholder: "Número do prontuário",
              },
              {
                label: "CPF",
                name: "cpf",
                type: "text",
                placeholder: "Número do CPF",
              },
              {
                label: "Data de Nascimento",
                name: "dataNascimento",
                type: "date",
              },
              {
                label: "Celular do Paciente",
                name: "celularPaciente",
                type: "tel",
                placeholder: "(00) 00000-0000",
              },
              {
                label: "Médico que Indicou",
                name: "medicoIndicou",
                type: "text",
                placeholder: "Nome do médico",
              },
              {
                label: "Celular do Médico",
                name: "celularMedico",
                type: "tel",
                placeholder: "(00) 00000-0000",
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-green-700 font-medium mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof Paciente]}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm text-gray-700"
                  placeholder={field.placeholder || ""}
                  required
                />
              </div>
            ))}

            <div>
              <label className="block text-green-700 font-medium mb-2">
                Comorbidades
              </label>
              <textarea
                name="comorbidades"
                rows={3}
                value={formData.comorbidades}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 resize-y"
                placeholder="Comorbidades do paciente"
                required
              />
            </div>

            <div>
              <label className="block text-green-700 font-medium mb-2">
                Sexo
              </label>
              <div className="flex space-x-6">
                {["Masculino", "Feminino"].map((sexo) => (
                  <label key={sexo} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="sexo"
                      value={sexo}
                      checked={formData.sexo === sexo}
                      onChange={handleChange}
                      className="accent-green-500"
                      required
                    />
                    <span className="text-gray-700">{sexo}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
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
