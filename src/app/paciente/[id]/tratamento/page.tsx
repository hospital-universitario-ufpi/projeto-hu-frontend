/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ExameCreationDto } from "@/app/interface/dto/exame/ExameCreationDto";
import { TratamentoCreationDto } from "@/app/interface/dto/tratamento/TratamentoCreationDto";
import { ParticularidadeCreationDto } from "@/app/interface/dto/particularidade/ParticularidadeCreationDto";
import { AreaCorporalAcometidaCreationDto } from "@/app/interface/dto/areaCorporalAcometida/AreaCorporalAcometidaCreationDto";
import { RespostaTratamento } from "@/app/interface/enums/RespostaTratamento";
import { DiaSemana } from "@/app/interface/enums/DiaSemana";
import FormularioTratamento from "@/components/FormularioTratamento";
import FormularioExames from "@/components/FormularioExames";
import FormularioParticularidade from "@/components/FormularioParticularidade";
import { TratamentoCreationRequest } from "@/app/interface/dto/tratamento/TratamentoCreationRequest";
import { createTratamento } from "@/api/TratamentoService/createTratamento";
import MapaCorporal from "@/components/MapaCorporal";

export default function CriarTratamentoPage() {
  const { id } = useParams();
  const router = useRouter();
  const pacienteId = parseInt(id as string, 10);

  const [tratamentoSalvo, setTratamentoSalvo] = useState(false);

  const [dadosTratamento, setDadosTratamento] = useState<TratamentoCreationDto>({
    pacienteId,
    nomeTratamento: "",
    dataInicio: "",
    dataFim: "",
    finalizado: false,
    frequenciaTratamento: 0,
    respostaTratamento: null,
    diasSessao: [],
    diagnostico: ""
  });

  const [particularidades, setParticularidades] = useState<ParticularidadeCreationDto>({
    tratamentoId: null,
    usoDegrau: false,
    usoOculos: false,
    exporFace: false,
    descricaoExporFace: "",
    protecaoGenital: false,
    descricaoProtecaoGenital: "",
    descricaoPosicaoCabine: "",
    descricaoOutros: ""
  });

  const [exames, setExames] = useState<ExameCreationDto[]>([
    {
      tratamentoid: null,
      exameTipo: null,
      nomeExame: "",
      resultadoNumerico: undefined,
      resultadoBoolean: undefined,
      resultadoOutro: "",
      dataExame: "",
      laboratorio: "",
      observacao: ""
    }
  ]);

  const [mapaCorporal, setMapaCorporal] = useState<AreaCorporalAcometidaCreationDto>({
    cabecaPescoco: 0,
    bracoDireito: 0,
    bracoEsquerdo: 0,
    pernaDireita: 0,
    pernaEsquerda: 0,
    troncoAnterior: 0,
    troncoPosterior: 0,
    genitalia: 0,
    tratamentoId: null
  });


  // HANDLERS

  const handleChangeDadosTratamento = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let parsedValue: any = value;

    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      if (name === "diasSessao") {
        const dia = value as DiaSemana;
        setDadosTratamento((prev) => {
          const atualizado = prev.diasSessao.includes(dia)
            ? prev.diasSessao.filter((d) => d !== dia)
            : [...prev.diasSessao, dia];
          return { ...prev, diasSessao: atualizado };
        });
        return;
      }
      if (name === "finalizado") {
        parsedValue = e.target.checked;
      }
    }

    if (name === "frequenciaTratamento") {
      parsedValue = Number(value);
    }

    if (name === "respostaTratamento") {
      parsedValue = value as RespostaTratamento;
    }

    setDadosTratamento((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleChangeParticularidades = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "checkbox" && e.target instanceof HTMLInputElement
      ? e.target.checked
      : value;

    setParticularidades((prev) => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handleChangeMapaCorporal = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const parsed = Number(value);
    setMapaCorporal((prev) => ({
      ...prev,
      [name]: isNaN(parsed) ? 0 : parsed
    }));
  };

  const handleChangeExame = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const parsed =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : name === "resultadoNumerico"
        ? Number(value)
        : value;

    setExames((prev) => {
      const atualizado = [...prev];
      atualizado[index] = { ...atualizado[index], [name]: parsed };
      return atualizado;
    });
  };

  const handleAddExame = () => {
    setExames((prev) => [
      ...prev,
      {
        tratamentoid: null,
        exameTipo: null,
        nomeExame: "",
        resultadoNumerico: undefined,
        resultadoBoolean: undefined,
        resultadoOutro: "",
        dataExame: "",
        laboratorio: "",
        observacao: ""
      }
    ]);
  };

  const handleRemoveExame = (index: number) => {
    setExames((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSalvarTratamento = async () => {
    const payload: TratamentoCreationRequest = {
      tratamento: dadosTratamento,
      particularidade: particularidades,
      exames: exames,
      areaCorporal: mapaCorporal
    }


    try {
      await createTratamento(payload);
      setTratamentoSalvo(true);
      setTimeout(() => {
        router.push(`/paciente/${pacienteId}`);
      }, 1000)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="min-h-screen px-4 py-8 bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white p-6 rounded-xl shadow space-y-10">
        <h1 className="text-2xl font-bold text-green-700 text-center">
          Criar Novo Tratamento para Paciente #{pacienteId}
        </h1>

        {/* COMPONENTES AQUI EM SEGUIDA */}
        <FormularioTratamento value={dadosTratamento} onChange={handleChangeDadosTratamento}/>
        <FormularioExames exames={exames} onChange={handleChangeExame} onAdd={handleAddExame} onRemove={handleRemoveExame}/>
        <FormularioParticularidade value={particularidades} onChange={handleChangeParticularidades}/>
        <MapaCorporal initialData={mapaCorporal} onChange={(dados) => setMapaCorporal((prev) => ({...prev, ...dados}))}/>

        <div className="flex justify-center pt-4">
          <button
            onClick={handleSalvarTratamento}
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
            href={`/paciente/${pacienteId}`}
            className="inline-block mt-4 text-green-700 hover:underline"
          >
            ← Cancelar e Voltar
          </Link>
        </div>
      </div>
    </main>
  );
}
