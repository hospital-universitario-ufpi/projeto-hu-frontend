"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Paciente } from "@/components/FormularioPaciente";

interface MapaCorporalData {
  [regiao: string]: number;
}

interface Exame {
  exameTipo: string;
  nomeExame: string;
  resultadoNumerico?: string;
  resultadoBoolean?: boolean;
  resultadoOutro?: string;
  dataExame: string;
  laboratorio: string;
  observacao?: string;
}

interface ParticularidadeData {
  [caracteristica: string]: boolean | string;
}

interface Tratamento {
  id: number;
  data: string;
  mapa: MapaCorporalData;
  exames: Exame[];
  particularidades: ParticularidadeData;
  totalSessoesPrevistas?: number;
}

interface Sessao {
  id?: number;
  dataSessao: string;
  dose: string;
  reacaoPosSessao: "NENHUMA" | "LEVE" | "MODERADA" | "GRAVE";
  observacoes: string;
  tempoExposicao: string;
}

export default function VisualizarPaciente() {
  const { id } = useParams();
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [tratamentos, setTratamentos] = useState<Tratamento[]>([]);
  const [tratamentoExpandido, setTratamentoExpandido] = useState<number | null>(
    null
  );
  const [modoEdicao, setModoEdicao] = useState(false);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const tratamentosPorPagina = 5;

  const [filtroData, setFiltroData] = useState("");

  

  useEffect(() => {
    const pacienteArmazenado = localStorage.getItem(`paciente_${id}`);
    if (pacienteArmazenado) setPaciente(JSON.parse(pacienteArmazenado));

    const tratamentosArmazenados = localStorage.getItem(`tratamentos_${id}`);
    if (tratamentosArmazenados)
      setTratamentos(JSON.parse(tratamentosArmazenados));
  }, [id]);

  const tratamentosFiltrados = filtroData
    ? tratamentos.filter((t) => t.data === filtroData)
    : tratamentos;

  const totalPaginas = Math.ceil(
    tratamentosFiltrados.length / tratamentosPorPagina
  );
  const tratamentosPaginados = tratamentosFiltrados.slice(
    (paginaAtual - 1) * tratamentosPorPagina,
    paginaAtual * tratamentosPorPagina
  );

  const handleEditarPaciente = () => setModoEdicao(!modoEdicao);

  const handleAlterarCampo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!paciente) return;
    const { name, value } = e.target;
    setPaciente({ ...paciente, [name]: value });
  };

  const salvarAlteracoesPaciente = () => {
    if (paciente) {
      localStorage.setItem(`paciente_${id}`, JSON.stringify(paciente));
      setModoEdicao(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white p-6 rounded-xl shadow space-y-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-700">
            Detalhes do Paciente
          </h1>
          <button
            onClick={handleEditarPaciente}
            className="text-green-700 underline text-sm"
          >
            {modoEdicao ? "Cancelar" : "Editar Detalhes do Paciente"}
          </button>
        </div>

        {paciente ? (
          <div className="space-y-2 text-green-800">
            {Object.entries(paciente).map(([key, valor]) => (
              <div key={key}>
                <strong>{key}:</strong>{" "}
                {modoEdicao ? (
                  <input
                    className="ml-2 border border-green-300 rounded px-2 py-1 text-green-800"
                    name={key}
                    value={valor}
                    onChange={handleAlterarCampo}
                  />
                ) : (
                  <span className="ml-2">{valor}</span>
                )}
              </div>
            ))}
            {modoEdicao && (
              <div className="pt-4">
                <button
                  onClick={salvarAlteracoesPaciente}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm"
                >
                  Salvar Alterações
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">Paciente não encontrado.</p>
        )}
        {paciente && (
          <div className="pt-6 border-t">
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              Sessões Realizadas
            </h2>

            <div className="flex justify-end mb-4">
              <div className="flex flex-col text-sm">
                <label className="text-green-800 font-medium mb-1">
                  Filtrar sessões por data:
                </label>
                <input
                  type="date"
                  value={filtroData}
                  onChange={(e) => setFiltroData(e.target.value)}
                  className="border border-green-300 rounded px-3 py-2 w-36 text-green-700"
                />
                {filtroData && (
                  <button
                    className="text-green-600 text-xs underline mt-1"
                    onClick={() => setFiltroData("")}
                  >
                    Limpar filtro
                  </button>
                )}
              </div>
            </div>

            {(() => {
              const sessoesKey = `sessoesPaciente:${paciente.id}`;
              const sessoes: Sessao[] = JSON.parse(
                localStorage.getItem(sessoesKey) || "[]"
              );
              const sessoesFiltradas = filtroData
                ? sessoes.filter((s) => s.dataSessao === filtroData)
                : sessoes;

              if (sessoesFiltradas.length === 0) {
                return (
                  <p className="text-sm text-gray-500">
                    Nenhuma sessão encontrada.
                  </p>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sessoesFiltradas.map((sessao, idx) => (
                    <div
                      key={sessao.id || idx}
                      className="bg-green-50 border border-green-300 p-4 rounded-lg shadow text-green-700 space-y-1"
                    >
                      <h4 className="font-semibold text-green-800">
                        Sessão #{idx + 1} – {sessao.dataSessao}
                      </h4>
                      <p>→ Dose: {sessao.dose}</p>
                      <p>→ Tempo de Exposição: {sessao.tempoExposicao} min</p>
                      <p>→ Reação: {sessao.reacaoPosSessao}</p>
                      <p>→ Observações: {sessao.observacoes || "Nenhuma"}</p>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        <div className="pt-6 border-t">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Tratamentos
          </h2>

          <Link
            href={`/paciente/${id}/tratamento`}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm inline-block mb-4"
          >
            ➕ Criar Novo Tratamento
          </Link>

          {tratamentos.length > 0 && (
            <Link
              href={`/paciente/${id}/sessao`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm inline-block mb-4 ml-4"
            >
              ➕ Criar Sessão
            </Link>
          )}

          <div className="flex justify-end mb-4">
            <div className="flex flex-col text-sm">
              <label className="text-green-800 font-medium mb-1">
                Filtrar por data:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="DD/MM/AAAA"
                  value={filtroData}
                  onChange={(e) => {
                    setFiltroData(e.target.value);
                    setPaginaAtual(1);
                  }}
                  className="border border-green-300 rounded px-3 py-2 w-36 text-green-700"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-green-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3M16 7V3M4 11h16M4 19h16M4 15h16"
                  />
                </svg>
              </div>
            </div>
          </div>

          {tratamentosFiltrados.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tratamentosPaginados.map((t) => {
                  const aberto = tratamentoExpandido === t.id;
                  return (
                    <div
                      key={t.id}
                      className="bg-green-50 border border-green-300 p-4 rounded-lg shadow text-green-700 space-y-2"
                    >
                      <div className="flex justify-between items-center font-semibold text-green-800">
                        <span>
                          Tratamento #{t.id} - {t.data}
                        </span>
                        <Link
                          href={`/paciente/${id}/tratamento/${t.id}`}
                          className="text-sm underline"
                        >
                          Editar
                        </Link>
                      </div>
                      <p>
                        → Mapa preenchido:{" "}
                        {Object.keys(t.mapa).length > 0 ? "Sim" : "Não"}
                      </p>
                      <p>→ Exames: {t.exames.length}</p>
                      <p>
                        → Particularidades:{" "}
                        {Object.keys(t.particularidades).length}
                      </p>

                      <button
                        onClick={() =>
                          setTratamentoExpandido(aberto ? null : t.id)
                        }
                        className="text-sm text-green-600 underline"
                      >
                        {aberto ? "Ocultar Detalhes" : "Visualizar Detalhes"}
                      </button>

                      {aberto && (
                        <div className="bg-green-100 border border-green-300 rounded-lg p-4 mt-2 space-y-3 text-sm">
                          <div>
                            <h4 className="font-semibold">Mapa Corporal:</h4>
                            <ul className="list-disc list-inside">
                              {Object.entries(t.mapa).map(([regiao, valor]) => (
                                <li key={regiao}>
                                  {regiao}: {valor}%
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold">Exames:</h4>
                            <ul className="list-disc list-inside">
                              {t.exames.map((exame, i) => (
                                <li key={i}>
                                  {exame.nomeExame} ({exame.exameTipo}) -{" "}
                                  {exame.exameTipo === "NUMERICO"
                                    ? exame.resultadoNumerico
                                    : exame.exameTipo === "BOOLEANO"
                                    ? exame.resultadoBoolean
                                      ? "Sim"
                                      : "Não"
                                    : exame.resultadoOutro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold">Particularidades:</h4>
                            <ul className="list-disc list-inside">
                              {Object.entries(t.particularidades).map(
                                ([chave, valor]) => (
                                  <li key={chave}>
                                    {chave}:{" "}
                                    {typeof valor === "boolean"
                                      ? valor
                                        ? "Sim"
                                        : "Não"
                                      : valor}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Paginação */}
              <div className="flex justify-center items-center gap-2 mt-6">
                {Array.from({ length: totalPaginas }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPaginaAtual(i + 1)}
                    className={`px-3 py-1 rounded-full border ${
                      paginaAtual === i + 1
                        ? "bg-green-600 text-white"
                        : "bg-white text-green-600 border-green-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-2 text-sm text-gray-500">
              Nenhum tratamento registrado ainda.
            </p>
          )}
        </div>

        <div className="text-center pt-6">
          <Link
            href="/buscar"
            className="inline-block mt-4 text-green-700 hover:underline"
          >
            ← Voltar para busca
          </Link>
        </div>
      </div>
    </main>
  );
}
