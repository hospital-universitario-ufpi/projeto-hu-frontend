'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ReacaoTipo, ReacaoTipoOptions } from '@/app/interface/enums/ReacaoTipo';
import { SessaoCreationDto } from '@/app/interface/dto/sessao/SessaoCreationDto';
import { createSessao } from '@/api/SessaoService/createSessao';

export default function CriarSessaoPage() {
  const { id, tratamentoId } = useParams();
  const router = useRouter();

  const [sessao, setSessao] = useState<SessaoCreationDto>({
    tratamentoId: Number(tratamentoId),
    dataSessao: '',
    dose: 0,
    reacaoPosSessao: ReacaoTipo.ARDENCIA,
    observacoes: '',
    tempoExposicao: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const parsed =
      name === 'dose' || name === 'tempoExposicao'
        ? Number(value)
        : name === 'reacaoPosSessao'
        ? (value as ReacaoTipo)
        : value;

    setSessao((prev) => ({
      ...prev,
      [name]: parsed,
    }));
  };

  const handleSalvar = async () => {
    try {
      await createSessao(sessao);
      router.push(`/paciente/${id}/tratamento/${tratamentoId}`);
    } catch (err) {
      console.error('Erro ao salvar sessão:', err);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold text-green-700 text-center">
        Nova Sessão - Tratamento #{tratamentoId}
      </h1>

      <div className="space-y-6 bg-white p-6 rounded-xl shadow border border-green-200">
        <div>
          <label className="block text-gray-800 font-medium mb-1">Data da Sessão</label>
          <input
            type="date"
            name="dataSessao"
            value={sessao.dataSessao}
            onChange={handleChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-medium mb-1">Dose Aplicada (J/cm²)</label>
          <input
            type="number"
            name="dose"
            value={sessao.dose}
            onChange={handleChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-medium mb-1">Tempo de Exposição (s)</label>
          <input
            type="number"
            name="tempoExposicao"
            value={sessao.tempoExposicao}
            onChange={handleChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-medium mb-1">Reação Pós-Sessão</label>
          <select
            name="reacaoPosSessao"
            value={sessao.reacaoPosSessao}
            onChange={handleChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800"
          >
            {ReacaoTipoOptions.map((option) => (
              <option key={option.value} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-800 font-medium mb-1">Observações</label>
          <textarea
            name="observacoes"
            value={sessao.observacoes}
            onChange={handleChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSalvar}
          className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
        >
          💾 Salvar Sessão
        </button>
      </div>
    </main>
  );
}
