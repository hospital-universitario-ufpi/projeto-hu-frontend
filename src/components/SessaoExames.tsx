"use client";

import React, { useEffect, useState } from "react";

export type Exame = {
  exameTipo: string;
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
};

export default function SecaoExames({ onChange }: Props) {
  const [exames, setExames] = useState<Exame[]>([
    {
      nomeExame: "Hemograma Completo",
      exameTipo: "NUMERICO",
      resultadoNumerico: "4.5",
      dataExame: "2024-04-01",
      laboratorio: "Lab Vida",
      observacao: "Dentro dos parâmetros normais."
    },
    {
      nomeExame: "Teste de sensibilidade",
      exameTipo: "BOOLEANO",
      resultadoBoolean: true,
      dataExame: "2024-04-10",
      laboratorio: "BioMais",
      observacao: "Paciente respondeu positivamente."
    },
    {
      nomeExame: "Análise de pele",
      exameTipo: "OUTRO",
      resultadoOutro: "Presença de manchas difusas nas costas",
      dataExame: "2024-04-15",
      laboratorio: "Clínica São Lucas",
      observacao: "Sugerido acompanhamento."
    }
  ]);

  // Dispara onChange sempre que os exames forem atualizados
  useEffect(() => {
    onChange?.(exames);
  }, [exames, onChange]);

  // Adiciona um exame de exemplo (pode ser adaptado depois)
  const adicionarExame = (novo: Exame) => {
    setExames((prev) => [...prev, novo]);
  };

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-green-700">Exames</h2>

      <button
        onClick={() =>
          adicionarExame({
            nomeExame: "Novo Exame",
            exameTipo: "NUMERICO",
            resultadoNumerico: "5.1",
            dataExame: new Date().toISOString().split("T")[0],
            laboratorio: "Lab Teste",
            observacao: "Exame de teste"
          })
        }
        className="bg-green-600 text px-4 py-2 rounded hover:bg-green-700 transition text-sm"
      >
        + Adicionar Exame de Teste
      </button>

      {exames.map((exame, index) => (
        <div
          key={index}
          className="border border-green-300 rounded-lg p-4 bg-gray-50 text-green-700"
        >
          <p><strong>Nome do Exame:</strong> {exame.nomeExame}</p>
          <p><strong>Data:</strong> {exame.dataExame}</p>
          <p><strong>Laboratório:</strong> {exame.laboratorio}</p>
          <p><strong>Tipo:</strong> {exame.exameTipo}</p>

          {exame.exameTipo === "NUMERICO" && (
            <p><strong>Resultado Numérico:</strong> {exame.resultadoNumerico}</p>
          )}

          {exame.exameTipo === "BOOLEANO" && (
            <p><strong>Resultado:</strong> {exame.resultadoBoolean ? "Sim" : "Não"}</p>
          )}

          {exame.exameTipo === "OUTRO" && (
            <p><strong>Resultado:</strong> {exame.resultadoOutro}</p>
          )}

          {exame.observacao && (
            <p><strong>Observação:</strong> {exame.observacao}</p>
          )}
        </div>
      ))}
    </section>
  );
}