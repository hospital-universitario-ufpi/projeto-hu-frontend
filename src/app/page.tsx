"use client";

import { usePacienteStore } from "@/store/PacienteStore";
import Link from "next/link";

export default function HomePage() {

  return (
    <main className="min-h-screen px-4 py-10 bg-gray-50 flex flex-col items-center justify-start">
      <div className="w-full max-w-3xl text-center">
        <img src="/hu.png" alt="Logo" className="w-32 mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-green-700 mb-15">
          Sistema de Avaliação para Tratamento por Fototerapia
        </h1>

        <div className="flex flex-col gap-4 items-center">
          {/* Botão 1 - Novo cadastro */}
          <Link
            href="/formulariopaciente"
            className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition w-full max-w-sm text-center"
          >
            📝 Cadastrar Novo Paciente
          </Link>

          {/* Botão 2 - Procurar e editar */}
          <Link
            href="/buscar"
            className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition w-full max-w-sm text-center"
          >
            🔍 Procurar / Editar Paciente
          </Link>
        </div>
      </div>
    </main>
  );
}
