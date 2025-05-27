import { PacienteDto } from "@/app/interface/dto/paciente/PacienteDto";

type Props = {
  paciente: PacienteDto;
};

export default function CardPaciente({ paciente }: Props) {
  return (
    <section className="bg-white p-6 rounded-xl shadow space-y-4 border-l-4 border-green-600">
      <h1 className="text-2xl font-bold text-green-700">
        Paciente: {paciente.nome}
      </h1>

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
          {paciente.dataDeNascimento}
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
  );
}
