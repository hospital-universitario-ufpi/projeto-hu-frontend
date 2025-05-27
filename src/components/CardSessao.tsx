import { SessaoDto } from "@/app/interface/dto/sessao/SessaoDto";

type Props = {
  sessao: SessaoDto;
};

export default function CardSessao({ sessao }: Props) {
  const render = (valor: string | number | null | undefined) =>
    valor !== null && valor !== undefined && `${valor}`.trim() !== ""
      ? valor
      : "Não se aplica";

  return (
    <section className="bg-white p-4 rounded-xl shadow border-l-4 border-green-600 space-y-2">
      <h3 className="text-lg font-bold text-green-700">Sessão #{sessao.id}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <p>
          <span className="font-semibold text-gray-800">Data:</span>{" "}
          {render(sessao.dataSessao)}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Dose (J/cm²):</span>{" "}
          {render(sessao.dose)}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Duração:</span>{" "}
          {render(sessao.tempoExposicao)}s
        </p>
        <p>
          <span className="font-semibold text-gray-800">Reação:</span>{" "}
          {render(sessao.reacaoPosSessao)}
        </p>
        <p className="md:col-span-2">
          <span className="font-semibold text-gray-800">Observações:</span>{" "}
          {render(sessao.observacoes)}
        </p>
      </div>
    </section>
  );
}
