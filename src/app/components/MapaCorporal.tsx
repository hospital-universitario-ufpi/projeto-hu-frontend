'use client';

import React, { useState } from 'react';

type AreaCorpo = {
  id: string;
  nome: string;
  porcentagem: number;
};

const areasIniciais: AreaCorpo[] = [
  { id: 'cabeca', nome: 'Cabeça', porcentagem: 0 },
  { id: 'tronco', nome: 'Tronco', porcentagem: 0 },
  { id: 'braco-direito', nome: 'Braço Direito', porcentagem: 0 },
  { id: 'braco-esquerdo', nome: 'Braço Esquerdo', porcentagem: 0 },
  { id: 'perna-direita', nome: 'Perna Direita', porcentagem: 0 },
  { id: 'perna-esquerda', nome: 'Perna Esquerda', porcentagem: 0 },
  { id: 'pes', nome: 'Pés', porcentagem: 0 },
  { id: 'maos', nome: 'Mãos', porcentagem: 0 },
];

export default function MapaCorporal() {
  const [areas, setAreas] = useState<AreaCorpo[]>(areasIniciais);

  const handleChange = (id: string, value: number) => {
    setAreas((prev) =>
      prev.map((area) =>
        area.id === id ? { ...area, porcentagem: value } : area
      )
    );
  };

  return (
    <div className="space-y-6 mt-6">
      <h3 className="text-lg font-semibold text-green-700">Distribuição Corporal</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {areas.map((area) => (
          <div key={area.id} className="flex flex-col space-y-1">
            <label className="text-gray-700 font-medium">{area.nome}</label>
            <input
              type="number"
              min={0}
              max={100}
              value={area.porcentagem}
              onChange={(e) => handleChange(area.id, Number(e.target.value))}
              className="p-2 border border-green-300 rounded-lg text-gray-800"
              placeholder="%"
            />
          </div>
        ))}
      </div>
    </div>
  );
}