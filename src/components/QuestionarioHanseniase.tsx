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
      expandido: true,
    },
  ]);

  const handleChange = (
    index: number,
    field: keyof (typeof exames)[0],
    value: string | boolean
  ) => {
    const novas = [...exames];
    novas[index][field] = value as never;
    setExames(novas); 
  };

  const salvarExame = (index: number) => {
    const atualizados = [...exames];
    atualizados[index].salvo = true;
    atualizados[index].expandido = false;
    setExames(atualizados);
  };

  const editarExame = (index: number) => {
    const atualizados = [...exames];
    atualizados[index].expandido = true;
    atualizados[index].salvo = false;
    setExames(atualizados);
  };

  const toggleExpandir = (index: number) => {
    setExames((prev) =>
      prev.map((exame, i) =>
        i === index ? { ...exame, expandido: !exame.expandido } : exame
      )
    );
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
        expandido: true,
      },
    ]);
  };

  return (
    <section className="space-y-8">
      <h2 className="text-green-700 text-xl font-bold">Exames</h2>

      {exames.map((exame, index) => (
        <div
          key={index}
          className="border border-green-300 rounded-xl shadow p-4 bg-gray-50"
        >
          {exame.salvo ? (
            <div className="flex justify-between items-center">
              <button
                onClick={() => toggleExpandir(index)}
                className="text-left text-green-800 font-medium hover:underline"
              >
                {exame.nomeExame || "Exame sem nome"} – {exame.dataExame || "Data não definida"}
              </button>
              <button
                onClick={() => editarExame(index)}
                className="text-sm text-green-700 hover:underline"
              >
                Editar
              </button>
            </div>
          ) : null}

          {(!exame.salvo || exame.expandido) && (
            <div className="mt-4 space-y-4 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-green-700">Tipo</label>
                  <select
                    value={exame.exameTipo}
                    onChange={(e) => handleChange(index, "exameTipo", e.target.value)}
                    className="w-full border border-green-300 p-2 rounded text-green-700"
                  >
                    <option value="">Selecione</option>
                    <option value="NUMERICO">Numérico</option>
                    <option value="BOOLEANO">Sim/Não</option>
                    <option value="OUTRO">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-green-700">Nome do Exame</label>
                  <input
                    type="text"
                    value={exame.nomeExame}
                    onChange={(e) => handleChange(index, "nomeExame", e.target.value)}
                    className="w-full border border-green-300 p-2 rounded text-green-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-green-700">Data</label>
                  <input
                    type="date"
                    value={exame.dataExame}
                    onChange={(e) => handleChange(index, "dataExame", e.target.value)}
                    className="w-full border border-green-300 p-2 rounded text-green-700"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-green-700">Laboratório</label>
                  <input
                    type="text"
                    value={exame.laboratorio}
                    onChange={(e) => handleChange(index, "laboratorio", e.target.value)}
                    className="w-full border border-green-300 p-2 rounded text-green-700"
                  />
                </div>
              </div>

              {exame.exameTipo === "NUMERICO" && (
                <div>
                  <label className="text-sm font-medium text-green-700">Resultado Numérico</label>
                  <input
                    type="number"
                    value={exame.resultadoNumerico}
                    onChange={(e) => handleChange(index, "resultadoNumerico", e.target.value)}
                    className="w-full border border-green-300 p-2 rounded text-green-700"
                  />
                </div>
              )}
              {exame.exameTipo === "BOOLEANO" && (
                <div>
                  <label className="text-sm font-medium text-green-700">Resultado</label>
                  <select
                    value={exame.resultadoBoolean ? "true" : "false"}
                    onChange={(e) => handleChange(index, "resultadoBoolean", e.target.value === "true")}
                    className="w-full border border-green-300 p-2 rounded text-green-700"
                  >
                    <option value="false">Não</option>
                    <option value="true">Sim</option>
                  </select>
                </div>
              )}
              {exame.exameTipo === "OUTRO" && (
                <div>
                  <label className="text-sm font-medium text-green-700">Resultado (Texto)</label>
                  <textarea
                    value={exame.resultadoOutro}
                    onChange={(e) => handleChange(index, "resultadoOutro", e.target.value)}
                    className="w-full border border-green-300 p-2 rounded text-green-700"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-green-700">Observações</label>
                <textarea
                  value={exame.observacao}
                  onChange={(e) => handleChange(index, "observacao", e.target.value)}
                  className="w-full border border-green-300 p-2 rounded text-green-700"
                />
              </div>

              {!exame.salvo && (
                <button
                  type="button"
                  onClick={() => salvarExame(index)}
                  className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Salvar exame
                </button>
              )}
            </div>
          )}
        </div>
      ))}

      <div className="pt-2 text-green-700">
        <button
          type="button"
          onClick={adicionarExame}
          className="bg-green-100 text-green-700 px-4 py-2 rounded-full hover:bg-green-200 transition font-medium"
        >
          + Adicionar outro exame
        </button>
      </div>
    </section>
  );
}
