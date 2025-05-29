import { PacienteCreationDto } from "@/app/interface/dto/paciente/PacienteCreationDto";
import { PacienteFormData } from "@/schemas/PacienteSchema";

export const toPacienteCreationDto = (formData: PacienteFormData):PacienteCreationDto => {
    const dto: PacienteCreationDto = {
        nome: formData.nome,
        prontuario: formData.prontuario,
        sexo: formData.sexo,
        dataDeNascimento: formData.dataDeNascimento,
        medicoIndicacao: formData.medicoIndicacao || "",
        telefoneMedicoIndicacao: formData.telefoneMedicoIndicacao || "",
        telefonePaciente: formData.telefonePaciente || "",
        fototipo: formData.fototipo,
        resumoTratamentosAnteriores: formData.resumoTratamentosAnteriores || ""
    }

    return dto;
}