"use client";

import Link from "next/link";


export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <img src="/hu.png" alt="page" />
      
      <p className="text-gray-600 text-center mb-8">
        Sistema de Avaliação para tratamento por Fototerapia
      </p>
      <Link
        href="/formulario"
        className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition"
      >
        Iniciar Cadastro Paciente
      </Link>
      
    </main>
  );
}
