import { validateToken } from "@/api/auth/validate";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  validateToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,

      setToken: (token: string) => set({ token }),
      clearToken: () => set({ token: null }),

      validateToken: async () => {
        const token = get().token;
        console.log("[validateToken] token no store:", token);
        if (!token) return false;

      try {
        const isValid = await validateToken(); // faz a chamada da API
        console.log("[validateToken] resultado da API:", isValid);
        if (!isValid) get().clearToken();
        return isValid;
      } catch (error) {
        console.error("[validateToken] erro na chamada:", error);
        get().clearToken();
        return false;
      }
}
,
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
