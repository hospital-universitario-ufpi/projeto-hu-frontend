"use client";

import React, { useState } from "react";


export default function Sessao() {
  const [sessao, setSessao] = useState({
    dataSessao: "",
    Dose: "",
    reacaoPosSessao: "",
    observacoes: "",
    tempoExposicao: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSessao((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-8">
      <h3 className="text-green-700 font-bold text-xl">Sessão</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium text-green-700 mb-1">Data da Sessão</label>
          <input
            type="date"
            name="dataSessao"
            value={sessao.dataSessao}
            onChange={handleChange}
            className="w-full border border-green-300 rounded-lg p-3 text-green-700"
          />
        </div>

        <div>
          <label className="block font-medium text-green-700 mb-1">Dose</label>
          <input
            type="number"
            name="Dose"
            value={sessao.Dose}
            onChange={handleChange}
            className="w-full border border-green-300 rounded-lg p-3 text-green-700 bg-white"
            placeholder="Digite a fose correspondente"
            
          />
        </div>

        <div>
          <label className="block font-medium text-green-700 mb-1">Tempo de Exposição (minutos)</label>
          <input
            type="number"
            name="tempoExposicao"
            value={sessao.tempoExposicao}
            onChange={handleChange}
            className="w-full border border-green-300 rounded-lg p-3 text-green-700 bg-white"
            placeholder="Digite o tempo de exposicao em minutos"
            
          />
        </div>

        <div>
          <label className="block font-medium text-green-700 mb-1">Reação Pós-Sessão</label>
          <select
            name="reacaoPosSessao"
            value={sessao.reacaoPosSessao}
            onChange={handleChange}
            className="appearance-none w-full border border-green-300 rounded-lg p-3 pr-8 text-green-700 bg-white"
          >
            <option value="">Selecione</option>
            <option value="NENHUMA">Nenhuma</option>
            <option value="LEVE">Leve</option>
            <option value="MODERADA">Moderada</option>
            <option value="GRAVE">Grave</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block font-medium text-green-700 mb-1">Observações</label>
        <textarea
          name="observacoes"
          value={sessao.observacoes}
          onChange={handleChange}
          className="w-full border border-green-300 rounded-lg p-3 text-green-700 bg-white"
          placeholder="Adicione quaisquer observações adicionais"
        />
      </div>
    </div>
  );
}
