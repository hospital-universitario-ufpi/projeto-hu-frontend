import { notFound } from "next/navigation";
import Link from "next/link";
import { PacienteDto } from "@/app/interface/dto/paciente/PacienteDto";
import { TratamentoDto } from "@/app/interface/dto/tratamento/TratamentoDto";
import { getPacienteById } from "@/api/PacienteService/getPacienteById";
import { getTratamentosByPacienteId } from "@/api/TratamentoService/getTratamentosByPacienteId";
import CardPaciente from "@/components/CardPaciente";

type Props = {
  params: { id: string };
};

export default async function PacienteDetalhesPage({ params }: Props) {
  const { id } = params;

  let paciente: PacienteDto | null = null;
  let tratamentos: TratamentoDto[] = [];

  try {
    paciente = await getPacienteById(parseInt(id, 10));

    tratamentos = await getTratamentosByPacienteId(parseInt(id, 10));
  } catch (err) {
    console.error("Erro ao buscar dados do paciente ou tratamentos", err);
    notFound();
  }

  if (!paciente) return null;

  return (
    <main className="p-8 max-w-6xl mx-auto space-y-10">
      {/* DADOS DO PACIENTE */}
      <CardPaciente paciente={paciente} />

      {/* BOTÃO DE NOVO TRATAMENTO */}
      <div className="flex justify-end">
        <Link
          href={`/paciente/${id}/tratamento`}
          className="bg-green-600 text-white px-6 py-3 rounded-full shadow hover:bg-green-700 transition text-sm font-semibold"
        >
          ➕ Criar Novo Tratamento
        </Link>
      </div>

      {/* LISTAGEM DE TRATAMENTOS */}
      <section className="bg-white p-6 rounded-xl shadow border border-gray-200 space-y-6">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          Histórico de Tratamentos
        </h2>

        {tratamentos.length === 0 ? (
          <p className="text-gray-500">Nenhum tratamento cadastrado ainda.</p>
        ) : (
          <ul className="space-y-4">
            {tratamentos.map((t) => (
              <li
                key={t.tratamentoId}
                className={`p-4 rounded-lg shadow-md border-2 ${
                  !t.finalizado
                    ? "border-green-600 bg-green-50"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">
                      {t.nomeTratamento}{" "}
                      {!t.finalizado && (
                        <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full ml-2">
                          ATIVO
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t.dataInicio} → {t.dataFim} | Sessões:{" "}
                      {t.frequenciaTratamento}x/semana
                    </p>
                    <p className="text-sm text-gray-600">
                      Diagnóstico: {t.diagnostico}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/paciente/${id}/tratamento/${t.tratamentoId}`}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-semibold transition"
                    >
                      Detalhes
                    </Link>
                    <Link
                      href={`/paciente/${id}/tratamento/${t.tratamentoId}/editar`}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm font-semibold transition"
                    >
                      Editar
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
