"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MapaCorporal from "@/components/MapaCorporal";
import SessaoExames, { Exame } from "@/components/SessaoExames";
import Particularidade, { ParticularidadeData } from "@/components/Particularidade";

interface MapaCorporalData {
  [regiao: string]: number;
}

interface Tratamento {
  id: number;
  data: string;
  mapa: MapaCorporalData;
  exames: Exame[];
  particularidades: ParticularidadeData;
}

export default function EditarTratamentoPage() {
  const { id, idTratamento } = useParams();
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

  const [tratamentos, setTratamentos] = useState<Tratamento[]>([]);

  useEffect(() => {
    const armazenados = localStorage.getItem(`tratamentos_${id}`);
    if (armazenados) {
      const lista: Tratamento[] = JSON.parse(armazenados);
      setTratamentos(lista);

      const tratamento = lista.find(t => String(t.id) === String(idTratamento));
      if (tratamento) {
        setMapa(tratamento.mapa);
        setExames(tratamento.exames.map(exame => ({
          ...exame,
          exameTipo: exame.exameTipo as "NUMERICO" | "BOOLEANO" | "OUTRO",
        })));
        setParticularidades(tratamento.particularidades);
      }
    }
  }, [id, idTratamento]);

  const salvarAlteracoes = () => {
    const atualizados = tratamentos.map(t => {
      if (String(t.id) === String(idTratamento)) {
        return {
          ...t,
          mapa,
          exames,
          particularidades,
        };
      }
      return t;
    });

    localStorage.setItem(`tratamentos_${id}`, JSON.stringify(atualizados));
    router.push(`/paciente/${id}`);
  };

  return (
    <main className="min-h-screen px-4 py-8 bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white p-6 rounded-xl shadow space-y-10">
        <h1 className="text-2xl font-bold text-green-700 text-center">
          Editar Tratamento #{idTratamento} do Paciente #{id}
        </h1>

        <MapaCorporal onChange={setMapa} initialData={mapa} />
        <SessaoExames onChange={setExames} initialData={exames} />
        <Particularidade onChange={setParticularidades} initialData={particularidades} />

        <div className="flex justify-center pt-4">
          <button
            onClick={salvarAlteracoes}
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
          >
            💾 Salvar Alterações
          </button>
        </div>
      </div>
    </main>
  );
}