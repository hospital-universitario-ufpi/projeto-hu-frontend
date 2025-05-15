"use client";

import { useState } from "react";
import Link from "next/link";

const pacientesMock = [
  {
    id: 1,
    nome: "João Silva",
    prontuario: "P123",
    cpf: "111.222.333-44",
  },
  {
    id: 2,
    nome: "Maria Souza",
    prontuario: "P124",
    cpf: "222.333.444-55",
  },
];

export default function BuscarPaciente() {
  const [busca, setBusca] = useState("");

  const pacientesFiltrados = pacientesMock.filter(
    (p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.prontuario.toLowerCase().includes(busca.toLowerCase()) ||
      p.cpf.replace(/\D/g, "").includes(busca.replace(/\D/g, ""))
  );

  return (
    <main className="min-h-screen px-4 py-10 bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Buscar Paciente
        </h1>

        <input
          type="text"
          placeholder="Digite nome ou Número do prontuário"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-6 placeholder:text-green-700/40"
        />
        {pacientesFiltrados.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhum paciente encontrado.
          </p>
        ) : (
          <ul className="space-y-4">
            {pacientesFiltrados.map((paciente) => (
              <li
                key={paciente.id}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold text-green-700">
                    {paciente.nome}
                  </p>
                  <p className="text-sm text-gray-600">
                    Prontuário: {paciente.prontuario} | CPF: {paciente.cpf}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/paciente/${paciente.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Editar
                  </Link>
                  <Link
                    href={`/paciente/${paciente.id}`}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm"
                  >
                    Visualizar
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
