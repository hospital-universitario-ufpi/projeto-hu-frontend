"use client";

import React, { useState } from "react";
import FormularioPaciente from "@/components/FormularioPaciente";
import Link from "next/link";

type Paciente = {
  id: number;
};

export default function FormularioPage() {
  const [pacienteCadastrado, setPacienteCadastrado] = useState(false);
  const [dadosPaciente, setDadosPaciente] = useState<Paciente | null>(null);

  const handleSalvarPaciente = (dados: Paciente) => {
    setDadosPaciente(dados);
    setPacienteCadastrado(true);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <FormularioPaciente onSalvar={handleSalvarPaciente} />

      {pacienteCadastrado && dadosPaciente && (
        <>
          {/* Botão Criar Tratamento */}
          <div className="text-center pt-4">
            <Link
              href={`/paciente/${dadosPaciente.id || 1}/tratamento`} // fallback para id 1 se não tiver vindo do backend
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm inline-block"
            >
              ➕ Criar Novo Tratamento
            </Link>
          </div>
        </>
      )}
    </main>
  );
}