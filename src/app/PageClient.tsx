'use client';

import React, { useState } from 'react';
import FormularioPaciente, { Paciente } from '../components/FormularioPaciente';
import QuestionarioHanseniase from '../components/QuestionarioHanseniase';
import SessaoTratamento from '../components/SessaoTratamento';

export default function PageClient() {
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [formFinalizado, setFormFinalizado] = useState(false);
  const [questionarioFinalizado, setQuestionarioFinalizado] = useState(false);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {!formFinalizado ? (
        <FormularioPaciente
          onSalvar={(dados: Paciente) => {
            setPaciente(dados);
            setFormFinalizado(true);
          }}
        />
      ) : !questionarioFinalizado ? (
        <QuestionarioHanseniase
          onFinalizar={() => {
            setQuestionarioFinalizado(true);
          }}
        />
      ) : paciente?.id ? (
        <SessaoTratamento idPaciente={paciente.id.toString()} />
      ) : null}
    </div>
  );
}
