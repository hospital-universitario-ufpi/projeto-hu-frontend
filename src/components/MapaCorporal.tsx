"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  onChange?: (dados: { [regiao: string]: number }) => void;
  initialData?: { [regiao: string]: number }; // <- ADICIONADO AQUI
};

const regioes = [
  { nome: "Cabeça e Pescoço", key: "cabecaPescoco", top: "7%", left: "24%" },
  { nome: "Braço Direito", key: "bracoDireito", top: "49%", left: "9%" },
  { nome: "Braço Esquerdo", key: "bracoEsquerdo", top: "49%", left: "40%" },
  { nome: "Tronco Anterior", key: "troncoAnterior", top: "35%", left: "25%" },
  { nome: "Tronco Posterior", key: "troncoPosterior", top: "35%", left: "75%" },
  { nome: "Perna Direita", key: "pernaDireita", top: "70%", left: "20%" },
  { nome: "Perna Esquerda", key: "pernaEsquerda", top: "70%", left: "30%" },
  { nome: "Genitália", key: "genitalia", top: "56%", left: "25%" },
];

export default function MapaCorporal({ onChange, initialData }: Props) {
  const [porcentagens, setPorcentagens] = useState<{ [regiao: string]: number }>(
    initialData || {
      cabecaPescoco: 0,
      bracoDireito: 0,
      bracoEsquerdo: 0,
      pernaDireita: 0,
      pernaEsquerda: 0,
      troncoAnterior: 0,
      troncoPosterior: 0,
      genitalia: 0,
    }
  );

  const total = Object.values(porcentagens).reduce((acc, val) => acc + val, 0);

  useEffect(() => {
    onChange?.(porcentagens);
  }, []);

  const handleInput = (key: string, value: number) => {
    const novo = { ...porcentagens, [key]: value };
    setPorcentagens(novo);
    onChange?.(novo);
  };

  return (
    <section className="space-y-6">
      <h3 className="text-green-700 text-xl font-bold">Área Corporal Acometida</h3>
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="relative w-full md:w-[600px] h-[600px]">
          <Image
            src="/corpo.jpg"
            alt="Mapa corporal"
            width={800}
            height={1000}
            className="mx-auto"
          />
          {regioes.map((regiao) => (
            <div
              key={regiao.key}
              className="absolute flex items-center justify-center w-10 h-10 text-black text-sm font-bold rounded-full"
              style={{
                top: regiao.top,
                left: regiao.left,
                backgroundColor: `rgba(255, 0, 0, ${porcentagens[regiao.key] / 100})`,
                border: "2px solid red",
                transform: "translate(-50%, -50%)",
              }}
            >
              {porcentagens[regiao.key]}%
            </div>
          ))}
        </div>

        <div className="flex-1 space-y-4">
          {regioes.map((regiao) => (
            <div key={regiao.key} className="flex items-center gap-3">
              <div
                className="w-5 h-5 rounded-full"
                style={{
                  backgroundColor: `rgba(255, 0, 0, ${porcentagens[regiao.key] / 100})`,
                }}
              ></div>
              <label className="w-40 text-green-700 font-medium">{regiao.nome}</label>
              <input
                type="number"
                className="w-20 p-2 border border-green-300 rounded text-green-700"
                value={porcentagens[regiao.key]}
                onChange={(e) =>
                  handleInput(
                    regiao.key,
                    Math.min(100, Math.max(0, Number(e.target.value)))
                  )
                }
                min={0}
                max={100}
              />
              <span className="text-sm text-gray-600">%</span>
            </div>
          ))}
          <div className="pt-4 text-green-800 font-bold">
            Área Total Acometida: {total}%
          </div>
        </div>
      </div>
    </section>
  );
}