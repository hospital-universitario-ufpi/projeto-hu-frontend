"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Tipagem da Sessão
export type Sessao = {
  id?: number;
  dataSessao: string;
  dose: string;
  reacaoPosSessao: "NENHUMA" | "LEVE" | "MODERADA" | "GRAVE";
  observacoes: string;
  tempoExposicao: string;
};

// Props esperadas pelo componente
type Props = {
  idPaciente: string;
  onSalvar?: () => void;
};

export default function SessaoTratamento({ idPaciente, onSalvar }: Props) {
  const router = useRouter();
  const [filtroData, setFiltroData] = useState("");
  const [sessoes, setSessoes] = useState<Sessao[]>([
    {
      dataSessao: "",
      dose: "",
      reacaoPosSessao: "NENHUMA",
      observacoes: "",
      tempoExposicao: "",
    },
  ]);

  const handleChange = <K extends keyof Sessao>(
    index: number,
    field: K,
    value: Sessao[K]
  ) => {
    const novas = [...sessoes];
    novas[index][field] = value;
    setSessoes(novas);
  };

  const salvarSessao = (index: number) => {
    const nova = { ...sessoes[index], id: Date.now() };
    const chave = `sessoesPaciente:${idPaciente}`;
    const anteriores = JSON.parse(localStorage.getItem(chave) || "[]");
    const atualizadas = [...anteriores, nova];
    localStorage.setItem(chave, JSON.stringify(atualizadas));

    if (onSalvar) onSalvar();
    alert("Sessão salva com sucesso!");
  };

  const sessoesFiltradas = filtroData
    ? sessoes.filter((s) => s.dataSessao === filtroData)
    : sessoes;

  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <h3 className="text-green-700 font-bold text-xl">Sessões</h3>
        <div className="flex gap-2 items-end">
          <div>
            <label className="block text-green-700 text-sm font-medium mb-1">
              Filtrar por Data
            </label>
            <input
              type="date"
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
              className="border border-green-300 rounded-lg p-2 text-green-700"
            />
          </div>
          {filtroData && (
            <button
              onClick={() => setFiltroData("")}
              className="text-sm text-green-600 underline hover:text-green-800"
            >
              Limpar filtro
            </button>
          )}
        </div>
      </div>

      {sessoesFiltradas.map((sessao, index) => (
        <div
          key={index}
          className="border border-green-300 bg-gray-50 rounded-xl shadow p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-green-700 mb-1">
                Data da Sessão
              </label>
              <input
                type="date"
                value={sessao.dataSessao}
                onChange={(e) =>
                  handleChange(index, "dataSessao", e.target.value)
                }
                className="w-full border border-green-300 rounded-lg p-3 text-green-700"
              />
            </div>

            <div>
              <label className="block font-medium text-green-700 mb-1">
                Dose
              </label>
              <input
                type="number"
                value={sessao.dose}
                onChange={(e) => handleChange(index, "dose", e.target.value)}
                className="w-full border border-green-300 rounded-lg p-3 text-green-700 bg-white"
                placeholder="Digite a dose correspondente"
              />
            </div>

            <div>
              <label className="block font-medium text-green-700 mb-1">
                Tempo de Exposição (minutos)
              </label>
              <input
                type="number"
                value={sessao.tempoExposicao}
                onChange={(e) =>
                  handleChange(index, "tempoExposicao", e.target.value)
                }
                className="w-full border border-green-300 rounded-lg p-3 text-green-700 bg-white"
                placeholder="Digite o tempo em minutos"
              />
            </div>

            <div>
              <label className="block font-medium text-green-700 mb-1">
                Reação Pós-Sessão
              </label>
              <select
                value={sessao.reacaoPosSessao}
                onChange={(e) =>
                  handleChange(
                    index,
                    "reacaoPosSessao",
                    e.target.value as Sessao["reacaoPosSessao"]
                  )
                }
                className="appearance-none w-full border border-green-300 rounded-lg p-3 pr-8 text-green-700 bg-white"
              >
                <option value="NENHUMA">Nenhuma</option>
                <option value="LEVE">Leve</option>
                <option value="MODERADA">Moderada</option>
                <option value="GRAVE">Grave</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium text-green-700 mb-1">
                Observações
              </label>
              <textarea
                value={sessao.observacoes}
                onChange={(e) =>
                  handleChange(index, "observacoes", e.target.value)
                }
                className="w-full border border-green-300 rounded-lg p-3 text-green-700 bg-white"
                placeholder="Adicione quaisquer observações adicionais"
              />
            </div>

            <div className="md:col-span-2 text-right">
              <button
                type="button"
                onClick={() => salvarSessao(index)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Salvar sessão
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="pt-2">
        <button
          type="button"
          onClick={() =>
            setSessoes([
              ...sessoes,
              {
                dataSessao: "",
                dose: "",
                reacaoPosSessao: "NENHUMA",
                observacoes: "",
                tempoExposicao: "",
              },
            ])
          }
          className="bg-green-100 text-green-700 px-4 py-2 rounded-full hover:bg-green-200 transition font-medium"
        >
          + Adicionar nova sessão
        </button>
      </div>

      <div className="text-center pt-6">
        <button
          onClick={() => router.back()}
          className="bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800"
        >
          ← Voltar para Detalhes do Paciente
        </button>
      </div>
    </section>
  );
}
