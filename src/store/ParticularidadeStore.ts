import { ParticularidadeDto } from "@/app/interface/dto/particularidade/ParticularidadeDto";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ParticularidadeState{
    particularidadeDto: ParticularidadeDto | null;
    particularidadeDtoList: ParticularidadeDto[];
    particularidadeUpdate: ParticularidadeDto | null;

    setParticularidadeDto: (particularidadeDto: ParticularidadeDto) => void;
    clearParticularidadeDto: () => void;

    setParticularidadeDtoList: (particularidadeDtoList: ParticularidadeDto[]) => void;
    clearParticularidadeDtoList: () => void;

    setParticularidadeUpdate: (particularidadeUpdate: ParticularidadeDto) => void;
    clearParticularidadeUpdate: () => void;

    clearAll: () => void;
}

export const useParticularidadeStore = create<ParticularidadeState>()(
    persist(
        (set) => ({
            particularidadeDto: null,
            particularidadeDtoList: [],
            particularidadeUpdate: null,

            setParticularidadeDto: (particularidadeDto) => set({ particularidadeDto }),
            clearParticularidadeDto: () => set({ particularidadeDto: null }),

            setParticularidadeDtoList: (particularidadeDtoList) => set({ particularidadeDtoList }),
            clearParticularidadeDtoList: () => set({ particularidadeDtoList: [] }),
            
            setParticularidadeUpdate: (particularidadeUpdate) => set({ particularidadeUpdate }),
            clearParticularidadeUpdate: () => set({ particularidadeUpdate: null }),

            clearAll: () => set({
                particularidadeDto: null,
                particularidadeUpdate: null,
            })
        }),
        {
            name: "particularidade-store",
            skipHydration: true,
        }
    )
)