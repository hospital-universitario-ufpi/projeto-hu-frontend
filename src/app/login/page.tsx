"use client";

import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  return (
    <section className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold text-center">Login</h1>

      <LoginForm />

      <div className="text-center">
        <p className="text-gray-600 mb-2">Ainda não tem uma conta?</p>
        <button
          onClick={handleRegisterRedirect}
          className="text-blue-600 hover:underline font-medium"
        >
          Criar conta
        </button>
      </div>
    </section>
  );
}
