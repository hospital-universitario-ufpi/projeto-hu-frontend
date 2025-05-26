import { notFound } from "next/navigation";
import Link from "next/link";
import { PacienteDto } from "@/app/interface/dto/paciente/PacienteDto";
import { TratamentoDto } from "@/app/interface/dto/tratamento/TratamentoDto";
import { getPacienteById } from "@/api/PacienteService/getPacienteById";
import { getTratamentosByPacienteId } from "@/api/TratamentoService/getTratamentosByPacienteId";

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
      <section className="bg-white p-6 rounded-xl shadow space-y-4 border-l-4 border-green-600">
    <h1 className="text-2xl font-bold text-green-700">Paciente: {paciente.nome}</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
      <p>
        <span className="font-semibold text-gray-800">Prontuário:</span>{" "}
        {paciente.prontuario}
      </p>
      <p>
        <span className="font-semibold text-gray-800">Sexo:</span>{" "}
        {paciente.sexo}
      </p>
      <p>
        <span className="font-semibold text-gray-800">Data de nascimento:</span>{" "}
        {paciente.datadeNascimento}
      </p>
      <p>
        <span className="font-semibold text-gray-800">Telefone:</span>{" "}
        {paciente.telefonePaciente}
      </p>
      <p>
        <span className="font-semibold text-gray-800">Indicação médica:</span>{" "}
        {paciente.medicoIndicacao}
      </p>
      <p>
        <span className="font-semibold text-gray-800">Telefone do médico:</span>{" "}
        {paciente.telefoneMedicoIndicacao}
      </p>
      <p>
        <span className="font-semibold text-gray-800">Fototipo:</span>{" "}
        {paciente.fototipo}
      </p>
    </div>
  </section>

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
        <h2 className="text-xl font-bold text-green-700 mb-4">Histórico de Tratamentos</h2>

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
                      {t.dataInicio} → {t.dataFim} | Sessões: {t.frequenciaTratamento}x/semana
                    </p>
                    <p className="text-sm text-gray-600">Diagnóstico: {t.diagnostico}</p>
                  </div>
                  <Link
                    href={`/paciente/${id}/tratamento/${t.tratamentoId}`}
                    className="text-sm underline text-green-600 hover:text-green-800"
                  >
                    Detalhes →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
