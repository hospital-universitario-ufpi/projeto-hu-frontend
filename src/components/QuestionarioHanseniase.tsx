"use client";

import React, { useState } from "react";

export default function SecaoExames() {
  const [exames, setExames] = useState([
    {
      exameTipo: "",
      nomeExame: "",
      resultadoNumerico: "",
      resultadoBoolean: false,
      resultadoOutro: "",
      dataExame: "",
      laboratorio: "",
      observacao: "",
      salvo: false,
    },
  ]);

  const handleChange = (index: number, field: string, value: unknown) => {
    const novos = [...exames];
    novos[index][field] = value;
    setExames(novos);
  };
  

  const adicionarExame = () => {
    setExames((prev) => [
      ...prev,
      {
        exameTipo: "",
        nomeExame: "",
        resultadoNumerico: "",
        resultadoBoolean: false,
        resultadoOutro: "",
        dataExame: "",
        laboratorio: "",
        observacao: "",
        salvo: false,
      },
    ]);
  };

  const removerExame = (index: number) => {
    setExames((prev) => prev.filter((_, i) => i !== index));
  };

  const salvarExame = (index: number) => {
    const atualizados = [...exames];
    atualizados[index].salvo = true;
    setExames(atualizados);
    console.log("Exame salvo:", atualizados[index]);
  };

  const enviarTodos = async () => {
    const examesSalvos = exames.filter((ex) => ex.salvo);

    try {
      const response = await fetch("/api/exames", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(examesSalvos),
      });

      if (response.ok) {
        alert("Exames enviados com sucesso!");
      } else {
        alert("Erro ao enviar exames.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de rede ao tentar enviar.");
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="text-green-700 font-bold text-xl">Exames</h3>
      {exames.map((exame, index) => (
        <div key={index} className="border rounded-2xl p-6 bg-gray-50 space-y-4 shadow-sm">
          <div className="flex justify-between items-start">
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${exame.salvo ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {exame.salvo ? "Exame salvo" : "Não salvo ainda"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <label className="block font-medium text-green-700 mb-1">Tipo do Exame</label>
              <select
                value={exame.exameTipo}
                onChange={(e) => handleChange(index, "exameTipo", e.target.value)}
                disabled={exame.salvo}
                className="appearance-none w-full border border-green-300 rounded-lg p-3 pr-8 text-green-700 bg-white"
              >
                <option value="">Selecione o tipo</option>
                <option value="NUMERICO">Numérico</option>
                <option value="BOOLEANO">Sim/Não</option>
                <option value="OUTRO">Outro</option>
              </select>
              <div className="absolute inset-y-0 right-3 top-8 flex items-center pointer-events-none text-green-700 text-sm">
                ▼
              </div>
            </div>
            <div>
              <label className="block font-medium text-green-700 mb-1">Nome do Exame</label>
              <input
                type="text"
                placeholder="Ex: Hemograma"
                value={exame.nomeExame}
                onChange={(e) => handleChange(index, "nomeExame", e.target.value)}
                disabled={exame.salvo}
                className="w-full border border-green-300 rounded-lg p-3 placeholder:text-gray-400 text-green-700 bg-white"
              />
            </div>
            <div>
              <label className="block font-medium text-green-700 mb-1">Data</label>
              <input
                type="date"
                value={exame.dataExame}
                onChange={(e) => handleChange(index, "dataExame", e.target.value)}
                disabled={exame.salvo}
                className="w-full border border-green-300 rounded-lg p-3 text-green-700"
              />
            </div>

            {exame.exameTipo === "BOOLEANO" && (
              <div className="relative w-48">
                <label className="block font-medium text-green-700 mb-1">Resultado</label>
                <select
                  value={exame.resultadoBoolean ? "true" : "false"}
                  onChange={(e) => handleChange(index, "resultadoBoolean", e.target.value === "true")}
                  disabled={exame.salvo}
                  className="appearance-none w-full border border-green-300 rounded-lg p-3 pr-8 text-green-700 bg-white"
                >
                  <option value="">Selecione</option>
                  <option value="false">Não</option>
                  <option value="true">Sim</option>
                </select>
                <div className="absolute inset-y-0 right-3 top-8 flex items-center pointer-events-none text-green-700 text-sm">
                  ▼
                </div>
              </div>
            )}

            {exame.exameTipo === "NUMERICO" && (
              <div>
                <label className="block font-medium text-green-700 mb-1">Resultado Numérico</label>
                <input
                  type="text"
                  placeholder="Ex: 3.5"
                  value={exame.resultadoNumerico}
                  onChange={(e) => handleChange(index, "resultadoNumerico", e.target.value)}
                  disabled={exame.salvo}
                  className="border border-green-300 rounded-lg p-3 placeholder:text-gray-400 text-green-700 bg-white w-auto min-w-[120px]"
                  style={{ width: `${Math.max(8, exame.resultadoNumerico.length)}ch` }}
                />
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block font-medium text-green-700 mb-1">Laboratório</label>
              <input
                type="text"
                placeholder="Nome do laboratório"
                value={exame.laboratorio}
                onChange={(e) => handleChange(index, "laboratorio", e.target.value)}
                disabled={exame.salvo}
                className="w-full border border-green-300 rounded-lg p-3 placeholder:text-gray-400 text-green-700 bg-white"
              />
            </div>
          </div>

          {exame.exameTipo === "OUTRO" && (
            <div>
              <label className="block font-medium text-green-700 mb-1">Resultado (Texto)</label>
              <textarea
                placeholder="Descreva o resultado"
                value={exame.resultadoOutro}
                onChange={(e) => handleChange(index, "resultadoOutro", e.target.value)}
                disabled={exame.salvo}
                className="w-full border border-green-300 rounded-lg p-3 placeholder:text-gray-400 text-green-700 bg-white"
              />
            </div>
          )}

          <div>
            <label className="block font-medium text-green-700 mb-1">Observações</label>
            <textarea
              placeholder="Observações adicionais do exame"
              value={exame.observacao}
              onChange={(e) => handleChange(index, "observacao", e.target.value)}
              disabled={exame.salvo}
              className="w-full border border-green-300 rounded-lg p-3 placeholder:text-gray-400 text-green-700 bg-white"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            {exames.length > 1 && (
              <button
                type="button"
                onClick={() => removerExame(index)}
                className="text-red-600 hover:underline text-sm"
              >
                Remover exame
              </button>
            )}
            {!exame.salvo && (
              <button
                type="button"
                onClick={() => salvarExame(index)}
                className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 text-sm transition"
              >
                Salvar exame
              </button>
            )}
          </div>
        </div>
      ))}

      <div className="pt-2 space-y-4">
        <button
          type="button"
          onClick={adicionarExame}
          className="bg-green-100 text-green-700 px-4 py-2 rounded-full hover:bg-green-200 transition font-medium"
        >
          + Adicionar outro exame
        </button>

        <div className="flex justify-center mt-16">
          <button
            type="button"
            onClick={enviarTodos}
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold px-8 py-4 rounded-full shadow-md transition"
          >
            Enviar exames salvos
          </button>
        </div>
      </div>
    </div>
  );
}
