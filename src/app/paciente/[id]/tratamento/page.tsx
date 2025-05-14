"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
//import type { Paciente } from "@/components/FormularioPaciente";
import MapaCorporal from "@/components/MapaCorporal";
import SessaoExames from "@/components/SessaoExames";
import Particularidade, { ParticularidadeData } from "@/components/Particularidade";


interface MapaCorporalData {
  [regiao: string]: number;
}

interface Exame {
  exameTipo: string;
  nomeExame: string;
  resultadoNumerico?: string;
  resultadoBoolean?: boolean;
  resultadoOutro?: string;
  dataExame: string;
  laboratorio: string;
  observacao?: string;
}

interface Tratamento {
  id: number;
  data: string;
  mapa: MapaCorporalData;
  exames: Exame[];
  particularidades: ParticularidadeData;
}

export default function CriarTratamentoPage() {
  const { id } = useParams();
  const router = useRouter();

  const [mapa, setMapa] = useState<MapaCorporalData>({});
  const [exames, setExames] = useState<Exame[]>([]);
  const [particularidades, setParticularidades] = useState<ParticularidadeData>({
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
  });

  const [tratamentoSalvo, setTratamentoSalvo] = useState(false);
  const [tratamentos, setTratamentos] = useState<Tratamento[]>([]);

  useEffect(() => {
    const armazenados = localStorage.getItem(`tratamentos_${id}`);
    if (armazenados) {
      setTratamentos(JSON.parse(armazenados));
    }
  }, [id]);

  const salvarTratamento = () => {
    const novoTratamento: Tratamento = {
      id: tratamentos.length + 1,
      data: new Date().toLocaleDateString("pt-BR"),
      mapa,
      exames,
      particularidades,
    };

    const atualizados = [...tratamentos, novoTratamento];
    setTratamentos(atualizados);
    localStorage.setItem(`tratamentos_${id}`, JSON.stringify(atualizados));
    setTratamentoSalvo(true);

    setTimeout(() => {
      router.push(`/paciente/${id}`);
    }, 1000);
  };

  return (
    <main className="min-h-screen px-4 py-8 bg-green-50 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white p-6 rounded-xl shadow space-y-10">
        <h1 className="text-2xl font-bold text-green-700 text-center">
          Criar Novo Tratamento para Paciente #{id}
        </h1>

        <MapaCorporal onChange={setMapa} />
        <SessaoExames onChange={setExames} />
        <Particularidade onChange={setParticularidades} />

        <div className="flex justify-center pt-4">
          <button
            onClick={salvarTratamento}
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
          >
            💾 Salvar Tratamento
          </button>
        </div>

        {tratamentoSalvo && (
          <p className="text-center text-green-600 font-medium">
            Tratamento salvo com sucesso! Redirecionando...
          </p>
        )}

        <div className="text-center pt-4">
          <Link
            href={`/paciente/${id}`}
            className="inline-block mt-4 text-green-700 hover:underline"
          >
            ← Cancelar e Voltar
          </Link>
        </div>
      </div>
    </main>
  );
}