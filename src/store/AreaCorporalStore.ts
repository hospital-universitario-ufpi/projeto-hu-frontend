import { AreaCorporalAcometidaDto } from "@/app/interface/dto/areaCorporalAcometida/AreaCorporalAcometidaDto";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AreaCorporalState{
    areacorporalDto: AreaCorporalAcometidaDto | null;
    areacorporalDtoList: AreaCorporalAcometidaDto[];
    areacorporalUpdate: AreaCorporalAcometidaDto | null;

    setAreaCorporalDto: (areacorporalDto: AreaCorporalAcometidaDto) => void;
    clearAreaCorporalDto: () => void;

    setAreaCorporalDtoList: (areacorporalDtoList: AreaCorporalAcometidaDto[]) => void;
    clearAreaCorporalDtoList: () => void;

    setAreaCorporalUpdate: (areacorporalUpdate: AreaCorporalAcometidaDto) => void;
    clearAreaCorporalUpdate: () => void;

    clearAll: () => void;
}

export const useAreaCorporalStore = create<AreaCorporalState>()(
    persist(
        (set) => ({
            areacorporalDto: null,
            areacorporalDtoList: [],
            areacorporalUpdate: null,

            setAreaCorporalDto: (areacorporalDto) => set({areacorporalDto}),
            clearAreaCorporalDto: () => set({ areacorporalDto: null}),

            setAreaCorporalDtoList: ( areacorporalDtoList ) => set({ areacorporalDtoList }),
            clearAreaCorporalDtoList: () => set({areacorporalDtoList: []}),

            setAreaCorporalUpdate: ( areacorporalUpdate ) => set({ areacorporalUpdate }),
            clearAreaCorporalUpdate: () => set({ areacorporalUpdate: null}),

            clearAll: () => set({
                areacorporalDto: null,
                areacorporalDtoList: null
            })
        }),
        {
            name: "areacoporal-store",
            skipHydration: true,
        }
    )
)