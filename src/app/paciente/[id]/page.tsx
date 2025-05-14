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
}

const pacientesMock: (Paciente & { nome: string })[] = [
  {
    id: 1,
    nome: "João Silva",
    prontuario: "P123",
    sexo: "MASCULINO",
    cpf: "111.222.333-44",
    dataDeNascimento: "1990-01-01",
    medicoIndicacao: "Dr. João",
    telefoneMedicoIndicacao: "(86) 99999-0001",
    telefonePaciente: "(86) 98888-0001",
    fototipo: "III",
  },
];

export default function VisualizarPaciente() {
  const { id } = useParams();
  const [paciente, setPaciente] = useState<(Paciente & { nome: string }) | null>(null);
  const [tratamentos, setTratamentos] = useState<Tratamento[]>([]);
  const [tratamentoExpandido, setTratamentoExpandido] = useState<number | null>(null);

  useEffect(() => {
    const encontrado = pacientesMock.find((p) => String(p.id) === String(id));
    if (encontrado) setPaciente(encontrado);

    const armazenados = localStorage.getItem(`tratamentos_${id}`);
    if (armazenados) setTratamentos(JSON.parse(armazenados));
  }, [id]);

  return (
    <main className="min-h-screen px-4 py-8 bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white p-6 rounded-xl shadow space-y-10">
        <h1 className="text-2xl font-bold text-green-700 text-center">Detalhes do Paciente</h1>

        {paciente ? (
          <>
            <div className="space-y-2 text-gray-800">
              <p><strong>Nome:</strong> {paciente.nome}</p>
              <p><strong>Prontuário:</strong> {paciente.prontuario}</p>
              <p><strong>Sexo:</strong> {paciente.sexo}</p>
              <p><strong>CPF:</strong> {paciente.cpf}</p>
              <p><strong>Data de Nascimento:</strong> {paciente.dataDeNascimento}</p>
              <p><strong>Médico que Indicou:</strong> {paciente.medicoIndicacao}</p>
              <p><strong>Telefone do Médico:</strong> {paciente.telefoneMedicoIndicacao}</p>
              <p><strong>Telefone do Paciente:</strong> {paciente.telefonePaciente}</p>
              <p><strong>Fototipo:</strong> {paciente.fototipo}</p>
            </div>

            <div className="pt-6 border-t">
              <h2 className="text-xl font-semibold text-green-700 mb-2">Tratamentos</h2>

              <Link
                href={`/paciente/${id}/tratamento`}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm inline-block"
              >
                ➕ Criar Novo Tratamento
              </Link>

              {tratamentos.length > 0 ? (
                <ul className="mt-4 space-y-4">
                  {tratamentos.map((t) => {
                    const aberto = tratamentoExpandido === t.id;
                    return (
                      <li
                        key={t.id}
                        className="bg-green-50 border border-green-300 p-4 rounded-lg shadow space-y-2"
                      >
                        <p className="font-semibold text-green-800">
                          Tratamento #{t.id} - {t.data}
                        </p>
                        <p className="text-green-700">→ Mapa preenchido: {Object.keys(t.mapa).length > 0 ? "Sim" : "Não"}</p>
                        <p className="text-green-700">→ Exames: {t.exames.length}</p>
                        <p className="text-green-700">→ Particularidades: {Object.keys(t.particularidades).length}</p>

                        <button
                          onClick={() => setTratamentoExpandido(aberto ? null : t.id)}
                          className="text-sm text-green-600 underline"
                        >
                          {aberto ? "Ocultar Detalhes" : "Visualizar Detalhes"}
                        </button>

                        {aberto && (
                          <div className="bg-green-5 border border-green-300 rounded-lg p-4 mt-2 space-y-3 text-sm">
                            <div>
                              <h4 className="font-semibold text-green-700">Mapa Corporal:</h4>
                              <ul className="list-disc list-inside">
                                {Object.entries(t.mapa).map(([regiao, valor]) => (
                                  <li className="text-green-600" key={regiao}>{regiao}: {valor}%</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-green-700">Exames:</h4>
                              <ul className="list-disc list-inside">
                                {t.exames.map((exame, i) => (
                                  <li className="text-green-600" key={i}>
                                    {exame.nomeExame} ({exame.exameTipo}) -{" "}
                                    {exame.exameTipo === "NUMERICO"
                                      ? exame.resultadoNumerico
                                      : exame.exameTipo === "BOOLEANO"
                                      ? exame.resultadoBoolean ? "Sim" : "Não"
                                      : exame.resultadoOutro}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-green-700">Particularidades:</h4>
                              <ul className="list-disc list-inside">
                                {Object.entries(t.particularidades).map(([chave, valor]) => (
                                  <li className="text-green-600" key={chave}>
                                    {chave}: {typeof valor === "boolean" ? (valor ? "Sim" : "Não") : valor}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-gray-500">Nenhum tratamento registrado ainda.</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Paciente não encontrado.</p>
        )}

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