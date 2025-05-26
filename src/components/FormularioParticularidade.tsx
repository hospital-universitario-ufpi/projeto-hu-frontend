"use client";

import { ParticularidadeCreationDto } from "@/app/interface/dto/particularidade/ParticularidadeCreationDto";

interface Props {
  value: ParticularidadeCreationDto;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function FormularioParticularidade({ value, onChange }: Props) {
  return (
    <section className="bg-green-50 border border-green-200 p-6 rounded-xl space-y-6">
      <h2 className="text-xl font-bold text-green-700 text-center">Particularidades do Tratamento</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Degrau */}
        <label className="flex items-center gap-2 text-gray-800">
          <input
            type="checkbox"
            name="usoDegrau"
            checked={value.usoDegrau}
            onChange={onChange}
          />
          Usa degrau na cabine?
        </label>

        {/* Óculos */}
        <label className="flex items-center gap-2 text-gray-800">
          <input
            type="checkbox"
            name="usoOculos"
            checked={value.usoOculos}
            onChange={onChange}
          />
          Usa óculos durante a sessão?
        </label>

        {/* Expor Face */}
        <label className="flex items-center gap-2 text-gray-800">
          <input
            type="checkbox"
            name="exporFace"
            checked={value.exporFace}
            onChange={onChange}
          />
          Expõe a face durante a sessão?
        </label>

        {/* Proteção Genital */}
        <label className="flex items-center gap-2 text-gray-800">
          <input
            type="checkbox"
            name="protecaoGenital"
            checked={value.protecaoGenital}
            onChange={onChange}
          />
          Usa proteção genital?
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-800 font-medium mb-1">Descrição da Exposição da Face</label>
          <textarea
            name="descricaoExporFace"
            value={value.descricaoExporFace}
            onChange={onChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-medium mb-1">Descrição da Proteção Genital</label>
          <textarea
            name="descricaoProtecaoGenital"
            value={value.descricaoProtecaoGenital}
            onChange={onChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-medium mb-1">Descrição da Posição na Cabine</label>
          <textarea
            name="descricaoPosicaoCabine"
            value={value.descricaoPosicaoCabine}
            onChange={onChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-medium mb-1">Outras Particularidades</label>
          <textarea
            name="descricaoOutros"
            value={value.descricaoOutros}
            onChange={onChange}
            className="w-full p-3 border border-green-300 rounded text-gray-800"
          />
        </div>
      </div>
    </section>
  );
}
