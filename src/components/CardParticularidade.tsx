import { ParticularidadeDto } from "@/app/interface/dto/particularidade/ParticularidadeDto";

type Props = {
  particularidade: ParticularidadeDto;
};

export default function CardParticularidade({ particularidade }: Props) {
  const renderBoolean = (valor: boolean) => (valor ? "Sim" : "Não");

  const renderTexto = (valor: string) =>
    valor && valor.trim() !== "" ? valor : "Não se aplica";

  return (
    <section className="bg-white p-6 rounded-xl shadow space-y-4 border-l-4 border-green-600">
      <h2 className="text-2xl font-bold text-green-700">Particularidades</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <p>
          <span className="font-semibold text-gray-800">Uso de degrau:</span>{" "}
          {renderBoolean(particularidade.usoDegrau)}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Uso de óculos:</span>{" "}
          {renderBoolean(particularidade.usoOculos)}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Expor face:</span>{" "}
          {renderBoolean(particularidade.exporFace)}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Descrição - Face:</span>{" "}
          {renderTexto(particularidade.descricaoExporFace)}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Proteção genital:</span>{" "}
          {renderBoolean(particularidade.protecaoGenital)}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Descrição - Genital:</span>{" "}
          {renderTexto(particularidade.descricaoProtecaoGenital)}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Posição na cabine:</span>{" "}
          {renderTexto(particularidade.descricaoPosicaoCabine)}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Outros:</span>{" "}
          {renderTexto(particularidade.descricaoOutros)}
        </p>
      </div>
    </section>
  );
}
