/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ExameCreationDto } from "@/app/interface/dto/exame/ExameCreationDto";
import { ExameTipo } from "@/app/interface/enums/ExameTipo";

interface Props {
  exames: ExameCreationDto[];
  onChange: (index: number, e: React.ChangeEvent<any>) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export default function FormularioExames({ exames, onChange, onAdd, onRemove }: Props) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-green-700 text-center">Exames Realizados</h2>

      {exames.map((exame, index) => (
        <div
          key={index}
          className="border border-green-300 rounded-xl p-4 space-y-4 relative shadow-sm bg-green-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-800 font-medium mb-1">Nome do Exame</label>
              <input
                type="text"
                name="nomeExame"
                value={exame.nomeExame}
                onChange={(e) => onChange(index, e)}
                className="w-full p-3 border border-green-300 rounded text-gray-800"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-1">Tipo do Exame</label>
              <select
                name="exameTipo"
                value={exame.exameTipo || ""}
                onChange={(e) => onChange(index, e)}
                className="w-full p-3 border border-green-300 rounded text-gray-800"
              >
                <option value="">Selecione</option>
                {Object.values(ExameTipo).map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-1">Resultado Numérico</label>
              <input
                type="number"
                name="resultadoNumerico"
                value={exame.resultadoNumerico ?? ""}
                onChange={(e) => onChange(index, e)}
                className="w-full p-3 border border-green-300 rounded text-gray-800"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-1">Resultado Booleano</label>
              <select
                name="resultadoBoolean"
                value={
                  exame.resultadoBoolean === true
                    ? "true"
                    : exame.resultadoBoolean === false
                    ? "false"
                    : ""
                }
                onChange={(e) =>
                  onChange(index, {
                    ...e,
                    target: {
                      ...e.target,
                      name: "resultadoBoolean",
                      value:
                        e.target.value === "true"
                          ? true
                          : e.target.value === "false"
                          ? false
                          : undefined,
                    },
                  })
                }
                className="w-full p-3 border border-green-300 rounded text-gray-800"
              >
                <option value="">Selecione</option>
                <option value="true">Positivo</option>
                <option value="false">Negativo</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-800 font-medium mb-1">Resultado Outro (Texto Livre)</label>
              <textarea
                name="resultadoOutro"
                value={exame.resultadoOutro}
                onChange={(e) => onChange(index, e)}
                className="w-full p-3 border border-green-300 rounded text-gray-800"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-1">Data do Exame</label>
              <input
                type="date"
                name="dataExame"
                value={exame.dataExame}
                onChange={(e) => onChange(index, e)}
                className="w-full p-3 border border-green-300 rounded text-gray-800"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-1">Laboratório</label>
              <input
                type="text"
                name="laboratorio"
                value={exame.laboratorio}
                onChange={(e) => onChange(index, e)}
                className="w-full p-3 border border-green-300 rounded text-gray-800"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-800 font-medium mb-1">Observações</label>
              <textarea
                name="observacao"
                value={exame.observacao}
                onChange={(e) => onChange(index, e)}
                className="w-full p-3 border border-green-300 rounded text-gray-800"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 text-red-500 text-sm hover:underline"
          >
            Remover
          </button>
        </div>
      ))}

      <div className="text-center pt-4">
        <button
          type="button"
          onClick={onAdd}
          className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition text-sm"
        >
          ➕ Adicionar Exame
        </button>
      </div>
    </section>
  );
}
