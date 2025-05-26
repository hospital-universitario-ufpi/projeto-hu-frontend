"use client";

import React, { useEffect, useState } from "react";

export type Exame = {
  exameTipo: "NUMERICO" | "BOOLEANO" | "OUTRO";
  nomeExame: string;
  resultadoNumerico?: string;
  resultadoBoolean?: boolean;
  resultadoOutro?: string;
  dataExame: string;
  laboratorio: string;
  observacao?: string;
};

type Props = {
  onChange?: (exames: Exame[]) => void;
  initialData?: Exame[];
};

export default function SessaoExames({ onChange, initialData = [] }: Props) {
  const [exames, setExames] = useState<Exame[]>(initialData);

  // Garante que ao editar, os dados preenchidos sejam exibidos
  useEffect(() => {
    setExames(initialData);
  }, [initialData]);

  useEffect(() => {
    onChange?.(exames);
  }, [exames, onChange]);

  const adicionarExame = () => {
    const novoExame: Exame = {
      nomeExame: "",
      exameTipo: "NUMERICO",
      resultadoNumerico: "",
      resultadoBoolean: false,
      resultadoOutro: "",
      dataExame: new Date().toISOString().split("T")[0],
      laboratorio: "",
      observacao: ""
    };
    setExames((prev) => [...prev, novoExame]);
  };

  const atualizarExame = <K extends keyof Exame>(
    index: number,
    campo: K,
    valor: Exame[K]
  ) => {
    const atualizados = [...exames];
    atualizados[index] = { ...atualizados[index], [campo]: valor };
    setExames(atualizados);
  };

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-green-700">Exames</h2>

      <button
        onClick={adicionarExame}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm"
      >
        + Adicionar Exame
      </button>

      {exames.map((exame, index) => (
        <div
          key={index}
          className="border border-green-300 rounded-lg p-4 bg-gray-50 text-green-700 space-y-3"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome do Exame</label>
              <input
                type="text"
                value={exame.nomeExame}
                onChange={(e) => atualizarExame(index, "nomeExame", e.target.value)}
                className="w-full border border-green-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tipo</label>
              <select
                value={exame.exameTipo}
                onChange={(e) =>
                  atualizarExame(index, "exameTipo", e.target.value as Exame["exameTipo"])
                }
                className="w-full border border-green-300 rounded px-3 py-2"
              >
                <option value="NUMERICO">Numérico</option>
                <option value="BOOLEANO">Booleano</option>
                <option value="OUTRO">Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Data</label>
              <input
                type="date"
                value={exame.dataExame}
                onChange={(e) => atualizarExame(index, "dataExame", e.target.value)}
                className="w-full border border-green-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Laboratório</label>
              <input
                type="text"
                value={exame.laboratorio}
                onChange={(e) => atualizarExame(index, "laboratorio", e.target.value)}
                className="w-full border border-green-300 rounded px-3 py-2"
              />
            </div>
          </div>

          {exame.exameTipo === "NUMERICO" && (
            <div>
              <label className="block text-sm font-medium mb-1">Resultado Numérico</label>
              <input
                type="text"
                value={exame.resultadoNumerico || ""}
                onChange={(e) => atualizarExame(index, "resultadoNumerico", e.target.value)}
                className="w-full border border-green-300 rounded px-3 py-2"
              />
            </div>
          )}

          {exame.exameTipo === "BOOLEANO" && (
            <div>
              <label className="block text-sm font-medium mb-1">Resultado</label>
              <select
                value={exame.resultadoBoolean ? "true" : "false"}
                onChange={(e) =>
                  atualizarExame(index, "resultadoBoolean", e.target.value === "true")
                }
                className="w-full border border-green-300 rounded px-3 py-2"
              >
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>
          )}

          {exame.exameTipo === "OUTRO" && (
            <div>
              <label className="block text-sm font-medium mb-1">Resultado Descritivo</label>
              <input
                type="text"
                value={exame.resultadoOutro || ""}
                onChange={(e) => atualizarExame(index, "resultadoOutro", e.target.value)}
                className="w-full border border-green-300 rounded px-3 py-2"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Observação</label>
            <textarea
              value={exame.observacao || ""}
              onChange={(e) => atualizarExame(index, "observacao", e.target.value)}
              className="w-full border border-green-300 rounded px-3 py-2"
            />
          </div>
        </div>
      ))}
    </section>
  );
}