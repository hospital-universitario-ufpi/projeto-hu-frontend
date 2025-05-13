"use client";

import React, { useState } from "react";
import { Camera } from "lucide-react";

export default function FotosTratamento() {
  const [fotos, setFotos] = useState({
    antes: null as File | null,
    durante: null as File | null,
    depois: null as File | null,
  });

  const handleFotoChange = (event: React.ChangeEvent<HTMLInputElement>, tipo: keyof typeof fotos) => {
    const file = event.target.files?.[0] || null;
    setFotos((prev) => ({ ...prev, [tipo]: file }));
  };

  const renderBotaoUpload = (label: string, tipo: keyof typeof fotos) => (
    <div className="space-y-2 text-center">
      <label className="block text-green-700 font-semibold">{label}</label>
      <label className="cursor-pointer inline-flex items-center justify-center px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium shadow-md transition">
        <Camera className="w-5 h-5 mr-2" /> Enviar Foto
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFotoChange(e, tipo)}
          className="hidden"
        />
      </label>
      <p className="text-sm text-gray-500">(Opcional)</p>
      {fotos[tipo] && (
        <img
          src={URL.createObjectURL(fotos[tipo] as File)}
          alt={`Prévia da foto ${tipo}`}
          className="mx-auto mt-2 w-32 h-32 object-cover rounded shadow"
        />
      )}
    </div>
  );

  return (
    <div className="space-y-10">
      <h3 className="text-green-700 font-bold text-xl text-center">Fotos do Tratamento</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {renderBotaoUpload("Antes do Tratamento", "antes")}
        {renderBotaoUpload("Durante o Tratamento", "durante")}
        {renderBotaoUpload("Pós-Tratamento", "depois")}
      </div>
    </div>
  );
}
