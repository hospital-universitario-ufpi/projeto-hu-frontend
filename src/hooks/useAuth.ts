import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";


export const useAuth = () => {
  const router = useRouter();
  const { token, setToken, clearToken, validateToken } = useAuthStore();

  const login = (token: string) => {
    setToken(token);
    console.log(`hook login ${token}`)
    router.push("/"); // redireciona para a home
  };

  const logout = () => {
    clearToken();
    router.push("/login");
    console.log("hook logout")
    toast.success("Usuário desconectado")
  };

  useEffect(() => {
    const verify = async () => {
      const isValid = await validateToken();
      if (!isValid) {
        toast.error("Token invalido")
        clearToken();
        router.replace("/login");
      }
    };
    verify();
  }, []);

  return {
    token,
    login,
    logout,
    validateToken,
  };
};
