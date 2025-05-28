import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PacienteDto } from "@/app/interface/dto/paciente/PacienteDto";

interface PacienteState {
  pacienteDto: PacienteDto | null;
  pacienteDtoList: PacienteDto[];
  pacienteUpdate: PacienteDto | null;

  setPacienteDto: (pacienteDto: PacienteDto) => void;
  clearPacienteDto: () => void;

  setPacienteDtoList: (pacienteDtoList: PacienteDto[]) => void;
  clearPacienteDtoList: () => void;

  setPacienteUpdate: (pacienteUpdate: PacienteDto) => void;
  clearPacienteUpdate: () => void
}

export const usePacienteStore = create<PacienteState>()(
  persist(
    (set) => ({
      pacienteDto: null,
      pacienteDtoList: [],
      pacienteUpdate: null,

      setPacienteDto: (pacienteDto) => set({ pacienteDto }),
      clearPacienteDto: () => set({ pacienteDto: null }),

      setPacienteDtoList: (pacienteDtoList) => set({ pacienteDtoList }),
      clearPacienteDtoList: () => set({ pacienteDtoList: [] }),

      setPacienteUpdate: (pacienteUpdate) => set({ pacienteUpdate }),
      clearPacienteUpdate: () => set({pacienteUpdate: null})
    }),
    {
      name: "paciente-store",
      skipHydration: true,      
    }
  )
);
