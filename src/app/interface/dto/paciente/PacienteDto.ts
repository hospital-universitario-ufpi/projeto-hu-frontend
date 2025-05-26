import { Fototipo } from "../../enums/Fototipo";
import { PacienteSexo } from "../../enums/PacienteSexo";

export type PacienteDto = {
    id: number; // ID do paciente. Ex: 1

    nome: string; // Nome completo do paciente. Ex: "Joao da Silva"
    
    prontuario: string; // Código do prontuário do paciente - vem da ficha do GHU. Ex: "PRT-2024-001"

    sexo: PacienteSexo; // Sexo do paciente

    datadeNascimento: string; // Data de nascimento do paciente. Ex: "1990-08-15"

    medicoIndicacao: string; // Nome do médico que indicou o paciente. Ex: "Dr, Carlos Mendes"

    telefoneMedicoIndicacao: string; // Telefone do médico que indicou o paciente. Ex: "(86) 99999-1234"

    telefonePaciente: string; // Telefone do paciente. Ex: "(86) 98888-5678"

    fototipo: Fototipo; // Fototipo de pele do paciente

    resumoTratamentosAnteriores: string; // Resumo dos tratamentos anteriores realizados pelo paciente. Ex: "Já realizou 20 sessões de fototerapia entre 2023 e 2024."
};