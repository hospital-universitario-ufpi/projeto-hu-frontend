import { useEffect, useState } from "react";

export function useHydratedStore<T>(selector: () => T) {
    const [isHydrated, setIsHydrated] = useState(false);
    const data = selector();

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return { isHydrated, data }
}