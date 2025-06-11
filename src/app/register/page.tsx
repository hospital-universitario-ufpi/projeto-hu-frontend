"use client";

import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-700">Criar Conta</h1>
        <RegisterForm />
      </div>
    </main>
  );
}
