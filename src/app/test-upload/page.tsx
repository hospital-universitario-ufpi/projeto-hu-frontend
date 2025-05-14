'use client';

import { useState } from 'react';
import { uploadImagem } from '../../api/ArquivoService/uploadArquivo';// ajuste se necessário

export default function TesteUploadPage() {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const result = await uploadImagem(123, 'foto-teste', file);
      setUrl(result);
    } catch (err) {
      console.error('Erro ao fazer upload:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Teste de Upload - Supabase</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleUpload}
        disabled={!file || loading}
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>

      {url && (
        <div className="pt-4">
          <p className="text-green-600 text-sm">URL gerada:</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {url}
          </a>
        </div>
      )}
    </div>
  );
}
