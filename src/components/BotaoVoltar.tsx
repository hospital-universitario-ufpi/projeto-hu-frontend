"use client";

import { useRouter } from "next/navigation";

export default function BotaoVoltar() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-block text-green-700 hover:underline font-medium"
    >
      ← Voltar
    </button>
  );
}
