export type ParticularidadeCreationDto = {
    tratamentoId: number; // ID do tratamento ao qual essa particularidade está vinculada. Ex: 1

    usoDegrau: boolean; // Indica se o paciente faz uso de degrau na cabine. Ex: true

    usoOculos: boolean; // Indica se o paciente utiliza óculos durante a sessão. Ex: true

    exporFace: boolean; // Indica se o paciente expõe a face durante o tratamento. Ex: false

    descricaoExporFace: string; // Descrição adicional sobre a exposição da face. Ex: "Paciente expõe parcialmente a testa."

    protecaoGenital: boolean; // Indica se há proteção genital durante a sessão. Ex: true

    descricaoProtecaoGenital: string; // Descrição da proteção genital utilizada. Ex: "Uso de cueca de algodão durante as sesões."

    descricaoPosicaoCabine: string; // Descrição sobre a posição do paciente na cabine. Ex: "De pé com os braços elevados."

    descricaoOutros: string; // Outras particularidades relevantes. Ex: "Paciente com mobilidade reduzida no joelho esquerdo"
};