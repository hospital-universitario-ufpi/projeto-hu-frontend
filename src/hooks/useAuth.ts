import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


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
    console.log("hook logout")
    router.push("/login");
  };

  useEffect(() => {
    const verify = async () => {
      const isValid = await validateToken();
      if (!isValid) {
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
