"use client";

import React, { useState } from "react";
import FormularioPaciente, { Paciente } from "@/components/FormularioPaciente";
import QuestionarioHanseniase from "@/components/QuestionarioHanseniase";
import MapaCorporal from "@/components/MapaCorporal";

export default function FormularioPage() {
  const [pacienteCadastrado, setPacienteCadastrado] = useState(false);

  const handleSalvarPaciente = (dados: Paciente) => {
    console.log("Paciente salvo:", dados);
    setPacienteCadastrado(true);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <FormularioPaciente onSalvar={handleSalvarPaciente} />
      {pacienteCadastrado && (
        <>
          <QuestionarioHanseniase />
          <MapaCorporal />
        </>
      )}
    </main>
  );
}
