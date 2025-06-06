import { ExameDto } from "@/app/interface/dto/exame/ExameDto";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ExameState{
    exameDto: ExameDto | null;
    exameDtoList: ExameDto[];
    exameUpdate: ExameDto | null;

    setExameDto: (exameDto: ExameDto) => void;
    clearExameDto: () => void;

    setExameDtoList: (exameDtoList: ExameDto[]) => void;
    clearExameDtoList: () => void;

    setExameUpdate: (exameUpdate: ExameDto) => void;
    clearExameUpdate: () => void;

    clearAll: () => void;
}

export const useExameStore = create<ExameState>()(
    persist(
        (set) => ({
            exameDto: null,
            exameDtoList: [],
            exameUpdate: null,

            setExameDto: (exameDto) => set({ exameDto }),
            clearExameDto: () => set({ exameDto: null }),

            setExameDtoList: (exameDtoList) => set({ exameDtoList }),
            clearExameDtoList: () => set({ exameDtoList: [] }),

            setExameUpdate: (exameUpdate) => set({ exameUpdate }),
            clearExameUpdate: () => set({ exameUpdate: null }),

            clearAll: () => set({
                exameDto: null,
                exameUpdate: null,
            })
        }),
        {
            name: "exame-store",
            skipHydration: true,
        }
    )
)