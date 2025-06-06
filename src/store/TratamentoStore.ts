import { TratamentoDto } from "@/app/interface/dto/tratamento/TratamentoDto";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TratamentoState{
    tratamentoDto: TratamentoDto | null;
    tratamentoDtoList: TratamentoDto[];
    tratamentoUpdate: TratamentoDto | null;

    setTratamentoDto: (tratamentoDto: TratamentoDto) => void;
    clearTratamentoDto: () => void;

    setTratamentoDtoList: (tratamentoDtoList: TratamentoDto[]) => void;
    clearTratamentoDtoList: () => void;

    setTratamentoUpdate: (tratamentoUpdate: TratamentoDto) => void;
    clearTratamentoUpdate: () => void;

    clearAll: () => void;
}

export const useTratamentoStore = create<TratamentoState>()(
    persist(
        (set) => ({
            tratamentoDto: null,
            tratamentoDtoList: [],
            tratamentoUpdate: null,

            setTratamentoDto: (tratamentoDto) => set({ tratamentoDto }),
            clearTratamentoDto: () => set({ tratamentoDto: null}),

            setTratamentoDtoList: ( tratamentoDtoList ) => set({ tratamentoDtoList }),
            clearTratamentoDtoList: () => set({ tratamentoDtoList: [] }),

            setTratamentoUpdate: ( tratamentoUpdate ) => set({ tratamentoUpdate }),
            clearTratamentoUpdate: () => set({ tratamentoUpdate: null }),

            clearAll: () => set({
                tratamentoDto: null,
                tratamentoDtoList: null
            })
        }),
        {
            name: "tratamento-store",
            skipHydration: true,
        }
    )
);