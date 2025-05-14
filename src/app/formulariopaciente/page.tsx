"use client";

import React, { useState } from "react";
import FormularioPaciente, { Paciente } from "@/components/FormularioPaciente";
import Link from "next/link";

type Tratamento = {
  id: number;
  descricao: string;
  data: string;
};

export default function FormularioPage() {
  const [pacienteCadastrado, setPacienteCadastrado] = useState(false);
  const [dadosPaciente, setDadosPaciente] = useState<Paciente | null>(null);
  const [tratamentos, setTratamentos] = useState<Tratamento[]>([]);
  const [contador, setContador] = useState(1);

  const handleSalvarPaciente = (dados: Paciente) => {
    setDadosPaciente(dados);
    setPacienteCadastrado(true);
  };

  const handleCriarTratamento = () => {
    const novoTratamento: Tratamento = {
      id: contador,
      descricao: `Tratamento criado em ${new Date().toLocaleDateString()}`,
      data: new Date().toISOString(),
    };
    setTratamentos([...tratamentos, novoTratamento]);
    setContador(contador + 1);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <FormularioPaciente onSalvar={handleSalvarPaciente} />

      {pacienteCadastrado && dadosPaciente && (
        <>
          {/* Exibir dados do paciente */}
          <section className="space-y-2 bg-gray-100 p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-green-700">Dados do Paciente</h2>
            <p><strong>Prontuário:</strong> {dadosPaciente.prontuario}</p>
            <p><strong>CPF:</strong> {dadosPaciente.cpf}</p>
            <p><strong>Sexo:</strong> {dadosPaciente.sexo}</p>
            <p><strong>Data de Nascimento:</strong> {dadosPaciente.dataDeNascimento}</p>
          </section>

          {/* Botão Criar Tratamento */}
          <div className="text-center pt-4">
            <button
              onClick={handleCriarTratamento}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm"
            >
              ➕ Criar Novo Tratamento
            </button>
          </div>

          {/* Lista de tratamentos criados */}
          {tratamentos.length > 0 && (
            <section className="space-y-4 pt-6">
              <h3 className="text-xl font-semibold text-green-700">Tratamentos</h3>
              <ul className="space-y-2">
                {tratamentos.map((tratamento) => (
                  <li
                    key={tratamento.id}
                    className="bg-green-100 text-green-800 p-4 rounded-lg shadow"
                  >
                    {tratamento.descricao}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </main>
  );
}