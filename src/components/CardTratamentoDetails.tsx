import { TratamentoDto } from "@/app/interface/dto/tratamento/TratamentoDto";


type Props = {
  tratamento: TratamentoDto;
};

export default function CardTratamentoDetails({ tratamento }: Props) {
  return (
    <section className="bg-white p-6 rounded-xl shadow space-y-3 border-l-4 border-green-600">
      <h2 className="text-2xl font-bold text-green-700">Detalhes do Tratamento</h2>

      <p className="text-gray-800"><strong className="text-gray-800">Nome:</strong> {tratamento.nomeTratamento}</p>
      <p className="text-gray-800"><strong className="text-gray-800">Diagnóstico:</strong> {tratamento.diagnostico}</p>
      <p className="text-gray-800"><strong className="text-gray-800">Data de Início:</strong> {tratamento.dataInicio}</p>
      <p className="text-gray-800"><strong className="text-gray-800">Data de Fim:</strong> {tratamento.dataFim}</p>
      <p className="text-gray-800"><strong className="text-gray-800">Finalizado:</strong> {tratamento.finalizado ? "Sim" : "Não"}</p>
      <p className="text-gray-800"><strong className="text-gray-800">Modalidade:</strong> {tratamento.modalidade}</p>
      <p className="text-gray-800"><strong className="text-gray-800">Frequência semanal:</strong> {tratamento.frequenciaTratamento} sessões</p>

      <div>
        <strong className="text-gray-800">Dias da Sessão:</strong>
        <ul className="list-disc list-inside ml-4">
          {tratamento.diasSessao.map((dia) => (
            <li className="text-gray-800" key={dia}>{dia}</li>
          ))}
        </ul>
      </div>

      <p className="text-gray-800"><strong className="text-gray-800">Resposta ao Tratamento:</strong> {tratamento.respostaTratamento}</p>
    </section>
  );
}
