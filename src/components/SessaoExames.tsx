"use client";

import React, { useState } from "react";

export default function SecaoExames() {
  const [exames] = useState([
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

  return (
    <section className="space-y-6">
      {exames.map((exame, index) => (
        <div
          key={index}
          className="border border-green-300 rounded-lg p-4 bg-gray-50"
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
