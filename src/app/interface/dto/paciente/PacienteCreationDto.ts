import { Fototipo } from "../../enums/Fototipo";
import { PacienteSexo } from "../../enums/PacienteSexo";

export type PacienteCreationDto = {
    nome: string; // Nome completo do paciente. Ex: "Maria de Souza"

    prontuario: string; // Código do Prontuário do paciente. Ex: "PR123456"

    sexo: PacienteSexo; // Sexo do paciente

    dataDeNascimento: string; // Data de nascimento do paciente. Ex: "1990-05-20"

    medicoIndicacao: string; // Nome do médico que indicou o paciente. Ex: "Dr. Carlos Alberto"

    telefoneMedicoIndicacao: string; // Telefone do médico que indicou o paciente. Ex: "(86)99999-1234"

    telefonePaciente: string; // Telefone de contato do paciente. Ex: "(86)98888-5678"

    fototipo: Fototipo; // Fototipo de pele do paciente.

    resumoTratamentosAnteriores: string; // Resumo opcional de tratamentos anteriores realizados. Ex: "Paciente já realizou sessões de fototerapia em 2022."
};
