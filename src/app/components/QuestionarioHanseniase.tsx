"use client";

import React, { useState } from "react";
import MapaCorporal from "./MapaCorporal";

type Props = {
  formRef: React.RefObject<HTMLFormElement | null>;
  onFinalizar: () => void;
};

export default function QuestionarioHanseniase({ formRef, onFinalizar }: Props) {
  const [respostas, setRespostas] = useState({
    questionarios: "",
    fototipo: "",
    exames: [{ nome: "", data: "", resultado: "" }],
    exameslaboratoriais: [{ nome: "", data: "", resultado: "" }],
    fototerapiaFeita: "",
    modalidade: "",
    numeroSessoes: "",
    doseAcumulada: "",
    tipoTratamentoAnterior: "",
    dataTratamentoAnterior: "",
    sessoesTratamentoAnterior: "",
    uvbfe: false,
    puva: false,
    puvadose: "",
    uva1: false,
    puvaBanho: false,
    puvabanhoDose: "",
    cabine: false,
    maosPes: false,
    aplicacaoLocalizada: "",
    frequenciaSemanal: "",
    degrau: "",
    oculos: "",
    exporFace: "",
    protecaoFace: "",
    protecaoGenital: "",
    posicaoCabine: "",
    outras: "",
    totalSessoes: "",
    respostaTratamento: "",
    resultadoTratamento: "",
    reacaoSessao: "",
  });

  const [mensagemSalva, setMensagemSalva] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRespostas((prev) => ({ ...prev, [name]: value }));
  };

  const adicionarExame = () => {
    setRespostas((prev) => ({
      ...prev,
      exames: [...prev.exames, { nome: "", data: "", resultado: "" }],
    }));
  };

  const removerExame = (index: number) => {
    setRespostas((prev) => ({
      ...prev,
      exames: prev.exames.filter((_, i) => i !== index),
    }));
  };

  const adicionarExameLaboratorial = () => {
    setRespostas((prev) => ({
      ...prev,
      exameslaboratoriais: [...prev.exameslaboratoriais, { nome: "", data: "", resultado: "" }],
    }));
  };

  const removerExameLaboratorial = (index: number) => {
    setRespostas((prev) => ({
      ...prev,
      exameslaboratoriais: prev.exameslaboratoriais.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Respostas:", respostas);
    setMensagemSalva(true);
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-8 w-full border-t-4 border-green-600">
        <h2 className="text-2xl font-bold text-green-700 text-center">Questionário de Hanseníase</h2>

        {/* Diagnóstico */}
        <div>
          <label className="block font-medium text-green-700">Diagnóstico</label>
          <textarea
            name="questionarios"
            value={respostas.questionarios}
            onChange={handleChange}
            rows={3}
            required
            className="w-full border border-green-300 rounded p-3"
          />
        </div>

        {/* Fototipo */}
        <div>
          <label className="block font-medium text-green-700">Fototipo</label>
          <select
            name="fototipo"
            value={respostas.fototipo}
            onChange={handleChange}
            className="w-full border border-green-300 rounded p-3"
            required
          >
            <option value="">Selecione</option>
            <option value="Pele branca">Pele branca</option>
            <option value="Pele morena clara">Pele morena clara</option>
            <option value="Pele morena moderada">Pele morena moderada</option>
            <option value="Pele morena escura">Pele morena escura</option>
            <option value="Pele negra">Pele negra</option>
          </select>
        </div>

        {/* Exames */}
        <div>
          <h3 className="text-green-700 font-bold mb-2">Exames Anatomopatológicos</h3>
          {respostas.exames.map((exame, index) => (
            <div key={index} className="border rounded p-4 space-y-2 mb-4 bg-gray-50">
              <input
                name="nome"
                placeholder="Nome do exame"
                value={exame.nome}
                onChange={(e) => {
                  const novos = [...respostas.exames];
                  novos[index].nome = e.target.value;
                  setRespostas((prev) => ({ ...prev, exames: novos }));
                }}
                className="w-full border p-2 rounded"
              />
              <input
                type="date"
                name="data"
                value={exame.data}
                onChange={(e) => {
                  const novos = [...respostas.exames];
                  novos[index].data = e.target.value;
                  setRespostas((prev) => ({ ...prev, exames: novos }));
                }}
                className="w-full border p-2 rounded"
              />
              <textarea
                name="resultado"
                placeholder="Resultado do exame"
                value={exame.resultado}
                onChange={(e) => {
                  const novos = [...respostas.exames];
                  novos[index].resultado = e.target.value;
                  setRespostas((prev) => ({ ...prev, exames: novos }));
                }}
                className="w-full border p-2 rounded"
              />
              {respostas.exames.length > 1 && (
                <button type="button" onClick={() => removerExame(index)} className="text-red-600">
                  Remover exame
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={adicionarExame} className="text-green-600">
            + Adicionar outro exame
          </button>
        </div>

        {/* Exames Laboratoriais */}
        <div>
          <h3 className="text-green-700 font-bold mb-2">Exames Laboratoriais</h3>
          {respostas.exameslaboratoriais.map((exame, index) => (
            <div key={index} className="border rounded p-4 space-y-2 mb-4 bg-gray-50">
              <input
                name="nome"
                placeholder="Nome do exame"
                value={exame.nome}
                onChange={(e) => {
                  const novos = [...respostas.exameslaboratoriais];
                  novos[index].nome = e.target.value;
                  setRespostas((prev) => ({ ...prev, exameslaboratoriais: novos }));
                }}
                className="w-full border p-2 rounded"
              />
              <input
                type="date"
                name="data"
                value={exame.data}
                onChange={(e) => {
                  const novos = [...respostas.exameslaboratoriais];
                  novos[index].data = e.target.value;
                  setRespostas((prev) => ({ ...prev, exameslaboratoriais: novos }));
                }}
                className="w-full border p-2 rounded"
              />
              <textarea
                name="resultado"
                placeholder="Resultado"
                value={exame.resultado}
                onChange={(e) => {
                  const novos = [...respostas.exameslaboratoriais];
                  novos[index].resultado = e.target.value;
                  setRespostas((prev) => ({ ...prev, exameslaboratoriais: novos }));
                }}
                className="w-full border p-2 rounded"
              />
              {respostas.exameslaboratoriais.length > 1 && (
                <button type="button" onClick={() => removerExameLaboratorial(index)} className="text-red-600">
                  Remover exame
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={adicionarExameLaboratorial} className="text-green-600">
            + Adicionar exame laboratorial
          </button>
        </div>

        {/* Mapa Corporal */}
        <div>
          <h3 className="text-green-700 font-bold mb-2">Mapa Corporal do Paciente</h3>
          <MapaCorporal />
        </div>

        {/* Botão de envio */}
        <div className="text-center pt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700"
          >
            Salvar Questionário
          </button>
        </div>
      </form>

      {/* Mensagem de sucesso */}
      {mensagemSalva && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
            <h2 className="text-xl font-bold text-green-700 mb-4">
              Questionário salvo com sucesso!
            </h2>
            <button
              onClick={() => {
                setMensagemSalva(false);
                onFinalizar();
              }}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}