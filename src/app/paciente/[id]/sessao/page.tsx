"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import SessaoTratamento from '@/components/SessaoTratamento';

export default function PaginaSessao() {
  const { id } = useParams();
  const router = useRouter();

  const [sessaoSalva, setSessaoSalva] = useState(false);

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-6">
      <SessaoTratamento 
        idPaciente={id as string} 
        onSalvar={() => setSessaoSalva(true)} 
      />

      {sessaoSalva && (
        <div className="text-center pt-4">
          <button
            onClick={() => router.push(`/paciente/${id}`)}
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            ← Voltar para Detalhes do Paciente
          </button>
        </div>
      )}
    </div>
  );
}
