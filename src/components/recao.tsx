"use client";

import React, { useState } from "react";

const opcoes = [
  { label: "Ardência", valor: "ardencia", intensidade: 1 },
  { label: "Eritema Leve", valor: "eritema_leve", intensidade: 2 },
  { label: "Eritema Venero", valor: "eritema_venero", intensidade: 3 },
  { label: "Bolhas", valor: "bolhas", intensidade: 4 },
];

export default function Reacao() {
  const [selecionado, setSelecionado] = useState<string | null>(null);

  const handleSelecionar = (valor: string) => {
    setSelecionado(valor);
  };

  const getCorIntensidade = (nivel: number) => {
    switch (nivel) {
      case 1:
        return "bg-red-100 text-red-600 border-red-200";
      case 2:
        return "bg-red-200 text-red-700 border-red-300";
      case 3:
        return "bg-red-300 text-red-800 border-red-400";
      case 4:
        return "bg-red-400 text-white border-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-green-700 font-bold text-xl">Reação Pós-Tratamento</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {opcoes.map((opcao) => (
          <button
            key={opcao.valor}
            type="button"
            onClick={() => handleSelecionar(opcao.valor)}
            className={`w-full p-4 border rounded-xl font-medium transition text-center shadow-sm hover:shadow-md
              ${selecionado === opcao.valor ? getCorIntensidade(opcao.intensidade) : "bg-white text-green-700 border-green-300"}`}
          >
            {opcao.label}
          </button>
        ))}
      </div>
    </div>
  );
}