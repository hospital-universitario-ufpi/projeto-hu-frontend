'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white py-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 px-4">
        <div className="flex items-center gap-10 justify-center">
          <Image
            src="/logo-ufpi.png"
            alt="Logo UFPI"
            width={100}
            height={100}
            priority
          />
          <Image
            src="/logo-ebserh.png"
            alt="Logo EBSERH"
            width={100}
            height={100}
            priority
          />
          <Image
            src="/hu.png"
            alt="Logo HU"
            width={100}
            height={100}
            priority
          />
        </div>
        <h1 className="text-green-700 font-bold text-xl text-center">
          Hospital Universitário da UFPI – Sistema de Avaliação Fototerapia
        </h1>
      </div>

      {/* Faixa fina verde no final do header */}
      <div className="h-[3px] w-full bg-green-700 mt-6" />
    </header>
  );
}