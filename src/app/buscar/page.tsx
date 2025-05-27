"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllPaciente } from "@/api/PacienteService/getAllPaciente";

import { useRouter } from "next/navigation";
import { getPacienteByProntuario } from "@/api/PacienteService/getPacienteByProntuario";

export default function BuscarPaciente() {
  const [busca, setBusca] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    getAllPaciente()
      .then((data) => {
        setPacientes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));  
  }, []);

  const pacientesFiltrados = pacientes.filter((p) =>
    p.prontuario?.toLowerCase().includes(busca.toLowerCase())
  );

  const handleSubmit = async() =>{
    const response = await getPacienteByProntuario(busca)
    router.push(`/paciente/${response.id}`)
  }
  return (
    <main className="min-h-screen px-4 py-10 bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Buscar Paciente
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Digite o número do prontuário"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-green-700/40 text-green-700"
          />
          <button
            type="button"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={handleSubmit}
          >
            Buscar
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Carregando pacientes...</p>
        ) : pacientesFiltrados.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum paciente encontrado.</p>
        ) : (
          <ul className="space-y-4">
            {pacientesFiltrados.map((paciente) => (
              <li
                key={paciente.id}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold text-green-700">
                    {paciente.nome}
                  </p>
                  <p className="text-sm text-gray-600">
                    Prontuário: {paciente.prontuario} | CPF: {paciente.cpf}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/paciente/${paciente.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Editar
                  </Link>
                  <Link
                    href={`/paciente/${paciente.id}`}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm"
                  >
                    Visualizar
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}