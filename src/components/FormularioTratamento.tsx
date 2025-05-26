/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TratamentoCreationDto } from "@/app/interface/dto/tratamento/TratamentoCreationDto";
import { DiaSemanaOptions } from "@/app/interface/enums/DiaSemana";
import { RespostaTratamentoOptions } from "@/app/interface/enums/RespostaTratamento";

interface Props {
  value: TratamentoCreationDto;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export default function FormularioTratamento({ value, onChange }: Props) {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium text-green-700 mb-1">Nome do Tratamento</label>
          <input
            type="text"
            name="nomeTratamento"
            value={value.nomeTratamento}
            onChange={onChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800"
          />
        </div>

        <div>
          <label className="block font-medium text-green-700 mb-1">Diagnóstico</label>
          <input
            type="text"
            name="diagnostico"
            value={value.diagnostico}
            onChange={onChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800"
          />
        </div>

        <div>
          <label className="block font-medium text-green-700 mb-1">Data Início</label>
          <input
            type="date"
            name="dataInicio"
            value={value.dataInicio}
            onChange={onChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800"
          />
        </div>

        <div>
          <label className="block font-medium text-green-700 mb-1">Data Fim</label>
          <input
            type="date"
            name="dataFim"
            value={value.dataFim}
            onChange={onChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800"
          />
        </div>

        <div>
          <label className="block font-medium text-green-700 mb-1">Frequência (sessões por semana)</label>
          <input
            type="number"
            name="frequenciaTratamento"
            value={value.frequenciaTratamento}
            onChange={onChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800"
            min={0}
          />
        </div>

        <div>
          <label className="block font-medium text-green-700 mb-1">Resposta ao Tratamento</label>
          <select
            name="respostaTratamento"
            value={value.respostaTratamento || ""}
            onChange={onChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800"
          >
            <option value="" className="text-gray-800">Selecione</option>
            {RespostaTratamentoOptions.map((resp) => (
              <option key={resp.value} value={resp.value} className="text-gray-800">{resp.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            name="finalizado"
            checked={value.finalizado}
            onChange={onChange}
            className="accent-green-600"
          />
          <label className="text-green-800 font-medium">Tratamento Finalizado</label>
        </div>
      </div>

      <div className="mt-4">
        <label className="block font-medium text-green-700 mb-1">Dias da Sessão</label>
        <div className="flex flex-wrap gap-4">
          {DiaSemanaOptions.map((dia) => (
            <label key={dia.value} className="flex items-center gap-2 text-sm text-green-800">
              <input
                type="checkbox"
                name="diasSessao"
                value={dia.value}
                checked={value.diasSessao.includes(dia.value)}
                onChange={onChange}
              />
              {dia.label}
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
