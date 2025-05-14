// ✅ src/app/paciente/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Paciente } from "@/components/FormularioPaciente";
import QuestionarioHanseniase from "@/components/QuestionarioHanseniase";
import MapaCorporal from "@/components/MapaCorporal";
import FotosTratamento from "@/components/FotosTratamento";
import Particularidade from "@/components/Particularidade";
import Recao from "@/components/recao";
import Sessao from "@/components/Sessao";

const pacientesMock: (Paciente & { nome: string })[] = [
  {
    id: 1,
    nome: "João Silva",
    prontuario: "P123",
    sexo: "MASCULINO",
    cpf: "111.222.333-44",
    dataDeNascimento: "1990-01-01",
    medicoIndicacao: "Dr. João",
    telefoneMedicoIndicacao: "(86) 99999-0001",
    telefonePaciente: "(86) 98888-0001",
    fototipo: "III",
  },
  {
    id: 2,
    nome: "Maria Souza",
    prontuario: "P124",
    sexo: "FEMININO",
    cpf: "222.333.444-55",
    dataDeNascimento: "1985-06-15",
    medicoIndicacao: "Dra. Maria",
    telefoneMedicoIndicacao: "(86) 99999-0002",
    telefonePaciente: "(86) 98888-0002",
    fototipo: "II",
  },
];

export default function VisualizarPaciente() {
  const { id } = useParams();
  const [paciente, setPaciente] = useState<(Paciente & { nome: string }) | null>(null);

  useEffect(() => {
    const encontrado = pacientesMock.find((p) => String(p.id) === String(id));
    if (encontrado) {
      setPaciente(encontrado);
    }
  }, [id]);

  return (
    <main className="min-h-screen px-4 py-8 bg-gray-50 flex flex-col items-center justify-start">
      <div className="w-full max-w-5xl space-y-10 bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-green-700 text-center">
          Detalhes do Paciente
        </h1>

        {paciente ? (
          <div className="space-y-8 text-gray-800">
            <div>
              <p><strong>Nome:</strong> {paciente.nome}</p>
              <p><strong>Prontuário:</strong> {paciente.prontuario}</p>
              <p><strong>Sexo:</strong> {paciente.sexo}</p>
              <p><strong>CPF:</strong> {paciente.cpf}</p>
              <p><strong>Data de Nascimento:</strong> {paciente.dataDeNascimento}</p>
              <p><strong>Médico que Indicou:</strong> {paciente.medicoIndicacao}</p>
              <p><strong>Telefone do Médico:</strong> {paciente.telefoneMedicoIndicacao}</p>
              <p><strong>Telefone do Paciente:</strong> {paciente.telefonePaciente}</p>
              <p><strong>Fototipo:</strong> {paciente.fototipo}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-700 mb-2">Fotos do Tratamento</h2>
              <FotosTratamento />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-700 mb-2">Mapa Corporal</h2>
              <MapaCorporal />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-700 mb-2">Particularidades</h2>
              <Particularidade />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-700 mb-2">Questionário Hanseníase</h2>
              <QuestionarioHanseniase />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-700 mb-2">Reações</h2>
              <Recao />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-700 mb-2">Sessões de Tratamento</h2>
              <Sessao />
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Paciente não encontrado.</p>
        )}

        <div className="text-center pt-4">
          <Link
            href="/buscar"
            className="inline-block mt-4 text-green-700 hover:underline"
          >
            ← Voltar para busca
          </Link>
        </div>
      </div>
    </main>
  );
}
