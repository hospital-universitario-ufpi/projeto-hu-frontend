import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PacienteCreationDto } from "@/app/interface/dto/paciente/PacienteCreationDto";
import { PacienteDto } from "@/app/interface/dto/paciente/PacienteDto";

interface PacienteState {
  pacienteCreationDto: PacienteCreationDto | null;
  pacienteDto: PacienteDto | null;
  pacienteDtoList: PacienteDto[];

  setPacienteCreationDto: (pacienteCreationDto: PacienteCreationDto) => void;
  clearPacienteCreationDto: () => void;

  setPacienteDto: (pacienteDto: PacienteDto) => void;
  clearPacienteDto: () => void;

  setPacienteDtoList: (pacienteDtoList: PacienteDto[]) => void;
  clearPacienteDtoList: () => void;
}

export const usePacienteStore = create<PacienteState>()(
  persist(
    (set) => ({
      pacienteCreationDto: null,
      pacienteDto: null,
      pacienteDtoList: [],
      setPacienteCreationDto: (pacienteCreationDto) => set({ pacienteCreationDto }),
      clearPacienteCreationDto: () => set({ pacienteCreationDto: null }),
      setPacienteDto: (pacienteDto) => set({ pacienteDto }),
      clearPacienteDto: () => set({ pacienteDto: null }),
      setPacienteDtoList: (pacienteDtoList) => set({ pacienteDtoList }),
      clearPacienteDtoList: () => set({ pacienteDtoList: [] }),
    }),
    {
      name: "paciente-store",
      skipHydration: true,      
    }
  )
);
