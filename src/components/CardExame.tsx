import { ExameDto } from "@/app/interface/dto/exame/ExameDto";

type Props = {
  exame: ExameDto;
};

export default function CardExame({ exame }: Props) {
  const renderTexto = (valor: string | null | undefined) =>
    valor && valor.trim() !== "" ? valor : "Não se aplica";

  const renderBoolean = (valor: boolean | null | undefined) => {
    if (valor === true) return "Sim";
    if (valor === false) return "Não";
    return "Não se aplica";
  };

  const renderNumerico = (valor: number | null | undefined) =>
    valor !== null && valor !== undefined ? valor : "Não se aplica";

  return (
    <section className="bg-white p-6 rounded-xl shadow border-l-4 border-green-600 space-y-2">
      <h3 className="text-xl font-bold text-green-700">Exame: {renderTexto(exame.nomeExame)}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <p>
          <span className="font-semibold text-gray-800">Tipo:</span>{" "}
          {renderTexto(exame.exameTipo)}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Data:</span>{" "}
          {renderTexto(exame.dataExame)}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Resultado numérico:</span>{" "}
          {renderNumerico(exame.resultadoNumerico)}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Resultado booleano:</span>{" "}
          {renderBoolean(exame.resultadoBoolean)}
        </p>
        <p className="md:col-span-2">
          <span className="font-semibold text-gray-800">Resultado textual:</span>{" "}
          {renderTexto(exame.resultadoOutro)}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Laboratório:</span>{" "}
          {renderTexto(exame.laboratorio)}
        </p>
        <p className="md:col-span-2">
          <span className="font-semibold text-gray-800">Observações:</span>{" "}
          {renderTexto(exame.observacao)}
        </p>
      </div>
    </section>
  );
}
