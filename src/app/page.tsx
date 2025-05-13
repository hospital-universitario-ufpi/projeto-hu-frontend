'use client';

import React, { useState } from 'react';
import FormularioPaciente, { Paciente } from './components/FormularioPaciente';
import QuestionarioHanseniase from './components/QuestionarioHanseniase';

export default function Page() {
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [formFinalizado, setFormFinalizado] = useState(false);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {!formFinalizado ? (
        <FormularioPaciente
          onSalvar={(dados: Paciente) => {
            setPaciente(dados);
            setFormFinalizado(true);
          }}
        />
      ) : (
        <QuestionarioHanseniase
          formRef={formRef}
          onFinalizar={() => {
            setFormFinalizado(false);
            setPaciente(null);
          }}
        />
      )}
    </div>
  );
}