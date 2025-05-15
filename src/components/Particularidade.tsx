"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

export type ParticularidadeData = {
  usoDegrau: boolean;
  descricaoUsoDegrau: string;
  usoOculos: boolean;
  descricaoUsoOculos: string;
  exporFace: boolean;
  descricaoExporFace: string;
  protecaoGenital: boolean;
  descricaoProtecaoGenital: string;
  marcarPosicaoCabine: boolean;
  descricaoPosicaoCabine: string;
  marcarOutros: boolean;
  descricaoOutros: string;
};

type Props = {
  onChange?: (data: ParticularidadeData) => void;
  initialData?: ParticularidadeData;
};

export default function Particularidade({ onChange, initialData }: Props) {
  const [form, setForm] = useState<ParticularidadeData>(
    initialData || {
      usoDegrau: false,
      descricaoUsoDegrau: "",
      usoOculos: false,
      descricaoUsoOculos: "",
      exporFace: false,
      descricaoExporFace: "",
      protecaoGenital: false,
      descricaoProtecaoGenital: "",
      marcarPosicaoCabine: false,
      descricaoPosicaoCabine: "",
      marcarOutros: false,
      descricaoOutros: "",
    }
  );

  useEffect(() => {
    onChange?.(form);
  }, [form, onChange]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";

    setForm((prev) => ({
      ...prev,
      [name]: isCheckbox
        ? (e.target as HTMLInputElement).checked
        : value,
    }));
  };

  return (
    <div className="space-y-8">
      <h3 className="text-green-700 font-bold text-xl">Particularidades</h3>

      {[
        {
          label: "Uso de Degrau",
          name: "usoDegrau",
          desc: "descricaoUsoDegrau",
          placeholder: "Descreva o uso do degrau",
        },
        {
          label: "Uso de Óculos",
          name: "usoOculos",
          desc: "descricaoUsoOculos",
          placeholder: "Descreva o uso dos óculos",
        },
        {
          label: "Expor a Face",
          name: "exporFace",
          desc: "descricaoExporFace",
          placeholder: "Descreva a proteção usada",
        },
        {
          label: "Proteção Genital",
          name: "protecaoGenital",
          desc: "descricaoProtecaoGenital",
          placeholder: "Descreva a proteção genital",
        },
        {
          label: "Descrever Posição na Cabine",
          name: "marcarPosicaoCabine",
          desc: "descricaoPosicaoCabine",
          placeholder: "Descreva a posição",
        },
        {
          label: "Outros",
          name: "marcarOutros",
          desc: "descricaoOutros",
          placeholder: "Descreva outros cuidados",
        },
      ].map((item) => (
        <div key={item.name}>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name={item.name}
              checked={form[item.name as keyof ParticularidadeData] as boolean}
              onChange={handleChange}
              className="accent-green-600"
            />
            <span className="text-green-700 font-medium flex items-center gap-1">
              {item.label}
              {form[item.name as keyof ParticularidadeData] && (
                <CheckCircle className="text-green-600 w-4 h-4" />
              )}
            </span>
          </label>
          {form[item.name as keyof ParticularidadeData] && (
            <input
              type="text"
              name={item.desc}
              value={form[item.desc as keyof ParticularidadeData] as string}
              onChange={handleChange}
              placeholder={item.placeholder}
              className="mt-2 w-full border border-green-300 rounded-lg p-3 placeholder:text-gray-400 text-green-700 bg-white"
            />
          )}
        </div>
      ))}
    </div>
  );
}