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

  const [finalizado, setFinalizado] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    if (dadosIniciais) {
      setFormData(dadosIniciais);
      setFinalizado(true);
    }
  }, [dadosIniciais]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
    setFinalizado(true);
    setModoEdicao(false);
  };

  return (
    <section className="w-full bg-white pt-2 md:pt-6">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 bg-white rounded-xl pt-4 pb-6 md:pt-6 md:pb-8 relative">
        <h2 className="text-green-700 font-bold text-3xl text-center mb-10">
          {finalizado && !modoEdicao
            ? "Dados do Paciente"
            : "Cadastro de Paciente"}
        </h2>

        {finalizado && !modoEdicao ? (
          <div className="bg-green-100 p-6 rounded-xl space-y-4 text-green-800 shadow">
            <p>
              <strong>Prontuário:</strong> {formData.prontuario}
            </p>
            <p>
              <strong>CPF:</strong> {formData.cpf}
            </p>
            <p>
              <strong>Sexo:</strong> {formData.sexo}
            </p>
            <p>
              <strong>Data de Nascimento:</strong> {formData.dataDeNascimento}
            </p>
            <p>
              <strong>Telefone do Paciente:</strong> {formData.telefonePaciente}
            </p>
            <p>
              <strong>Médico que Indicou:</strong> {formData.medicoIndicacao}
            </p>
            <p>
              <strong>Telefone do Médico:</strong>{" "}
              {formData.telefoneMedicoIndicacao}
            </p>
            <p>
              <strong>Fototipo:</strong> {formData.fototipo}
            </p>

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
                {
                  label: "Prontuário",
                  name: "prontuario",
                  placeholder: "Número do prontuário",
                  type: "text",
                },
                {
                  label: "CPF",
                  name: "cpf",
                  placeholder: "000.000.000-00",
                  type: "text",
                },
                {
                  label: "Data de Nascimento",
                  name: "dataDeNascimento",
                  type: "date",
                },
                {
                  label: "Telefone do Paciente",
                  name: "telefonePaciente",
                  placeholder: "(00) 00000-0000",
                  type: "tel",
                },
                {
                  label: "Médico que Indicou",
                  name: "medicoIndicacao",
                  placeholder: "Nome do médico",
                  type: "text",
                },
                {
                  label: "Telefone do Médico",
                  name: "telefoneMedicoIndicacao",
                  placeholder: "(00) 00000-0000",
                  type: "tel",
                },
              ].map(({ label, name, placeholder, type }) => (
                <div key={name}>
                  <label className="block text-green-700 font-medium mb-2">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name as keyof Paciente] as string}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm text-gray-700"
                    placeholder={placeholder}
                    required
                  />
                </div>
              ))}

              <div className="flex items-start gap-8">
                {/* Campo Sexo */}
                <div>
                  <label className="block text-green-700 font-medium mb-2 text-left">
                    Sexo
                  </label>
                  <select
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleChange}
                    className="p-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-700 "
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="MASCULINO">Masculino</option>
                    <option value="FEMININO">Feminino</option>
                  </select>
                </div>

                {/* Campo Fototipo */}
                <div>
                  <label className="block text-green-700 font-medium mb-2 text-left">
                    Fototipo
                  </label>
                  <select
                    name="fototipo"
                    value={formData.fototipo}
                    onChange={handleChange}
                    className="p-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-700 "
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
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-16">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold px-8 py-4 rounded-full shadow-md transition"
              >
                {dadosIniciais || modoEdicao
                  ? "Salvar Alterações"
                  : "Finalizar Cadastro"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
