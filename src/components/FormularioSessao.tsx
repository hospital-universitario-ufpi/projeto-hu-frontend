"use client";

import { ReacaoTipoOptions } from "@/app/interface/enums/ReacaoTipo";
import { SessaoDto } from "@/app/interface/dto/sessao/SessaoDto";

interface Props {
  value: SessaoDto;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function FormularioSessao({ value, onChange }: Props) {
  return (
    <section className="bg-green-50 border border-green-200 p-6 rounded-xl space-y-6">
      <h2 className="text-xl font-bold text-green-700 text-center">Informações da Sessão</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-800 font-medium mb-1">Data da Sessão</label>
          <input
            type="date"
            name="dataSessao"
            value={value.dataSessao}
            onChange={onChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-medium mb-1">Dose Aplicada (J/cm²)</label>
          <input
            type="number"
            step="0.01"
            name="dose"
            value={value.dose}
            onChange={onChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800 appearance-none"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-medium mb-1">Tempo de Exposição (segundos)</label>
          <input
            type="number"
            name="tempoExposicao"
            value={value.tempoExposicao}
            onChange={onChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800 appearance-none"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-medium mb-1">Reação Pós-Sessão</label>
          <select
            name="reacaoPosSessao"
            value={value.reacaoPosSessao || ""}
            onChange={onChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800"
          >
            <option value="">Selecione</option>
            {ReacaoTipoOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-800 font-medium mb-1">Observações</label>
          <textarea
            name="observacoes"
            value={value.observacoes}
            onChange={onChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800"
          />
        </div>
      </div>
    </section>
  );
}
