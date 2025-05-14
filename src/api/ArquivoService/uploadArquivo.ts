/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from "../../utils/supabase/client";


export async function uploadImagem(sessaoId: number, title: string, file: File): Promise<string> {
  const supabase = createClient();
  const timestamp = Date.now();
  const extensao = file.name.split('.').pop();
  const path = `sessao-${sessaoId}/${title}-${timestamp}.${extensao}`;

  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('arquivos-hu')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    console.error('Erro no upload:', uploadError.message);
    throw new Error(`Erro ao fazer upload: ${uploadError.message}`);
  }

  
  const publicResult = supabase.storage.from('arquivos-hu').getPublicUrl(path);

  if (publicResult?.publicUrl && !publicResult.publicUrl.includes('undefined')) {
    return publicResult.publicUrl;
  }

  // 🔒 Se não for público, gera URL assinada
  const { data: signedData, error: signedError } = await supabase.storage
    .from('arquivos-hu')
    .createSignedUrl(path, 60 * 60); // 1 hora de validade

  if (signedError || !signedData?.signedUrl) {
    console.error('Erro ao gerar URL assinada:', signedError?.message);
    throw new Error('Erro ao gerar URL da imagem');
  }

  return signedData.signedUrl;
}