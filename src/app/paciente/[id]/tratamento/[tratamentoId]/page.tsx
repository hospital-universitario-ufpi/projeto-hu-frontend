"use client";

import { getPacienteById } from "@/api/PacienteService/getPacienteById";
import { getTratamentoByTratamentoId } from "@/api/TratamentoService/getTratamentoByTratamentoId";
import { PacienteDto } from "@/app/interface/dto/paciente/PacienteDto";
import { TratamentoDto } from "@/app/interface/dto/tratamento/TratamentoDto";
import CardExame from "@/components/CardExame";
import CardPaciente from "@/components/CardPaciente";
import CardParticularidade from "@/components/CardParticularidade";
import CardSessao from "@/components/CardSessao";
import CardTratamentoDetails from "@/components/CardTratamentoDetails";
import MapaCorporal from "@/components/MapaCorporal";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TratamentoDetails() {
  const { id, tratamentoId } = useParams();
  // const router = useRouter();

  const [tratamento, setTratamento] = useState<TratamentoDto | null>(null);
  const [paciente, setPaciente] = useState<PacienteDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tratamentoId || !id) return;

    const fetchData = async () => {
      try {
        const [pacienteData, tratamentoData] = await Promise.all([
          getPacienteById(Number(id)),
          getTratamentoByTratamentoId(Number(tratamentoId)),
        ]);

        setPaciente(pacienteData);
        setTratamento(tratamentoData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) return <p>Carregando...</p>;
  if (!tratamento || !paciente) return <p>Erro ao carregar dados.</p>;

  return (
    <main className="p-8 max-w-6xl mx-auto space-y-10">
      <CardPaciente paciente={paciente}/>
      <CardTratamentoDetails tratamento={tratamento}/>
      <MapaCorporal initialData={tratamento.areaCorporalAcometida}/>
      <CardParticularidade particularidade={tratamento.particularidade}/>
      {tratamento.exames.map((exame, index) => (
        <CardExame key={index} exame={exame}/>
      ))}

      <div className="flex justify-between items-center mt-10  text-green-700 border-b border-green-300 pb-2" >
        <h2 className="text-xl font-bold text-green-700 ">
          Sessões Realizadas
        </h2>

        <a
          href={`/paciente/${id}/tratamento/${tratamentoId}/sessao`}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm"
        >
          ➕ Nova Sessão
        </a>
      </div>
      {tratamento.sessoes && tratamento.sessoes.length > 0 ? (
      <div className="space-y-4 mt-4">
        {tratamento.sessoes.map((sessao) => (
          <CardSessao key={sessao.id} sessao={sessao} />
        ))}
      </div>
      ) : (
        <p className="text-gray-700 mt-2">Nenhuma sessão registrada até o momento.</p>
      )}

    </main>
  );
}
