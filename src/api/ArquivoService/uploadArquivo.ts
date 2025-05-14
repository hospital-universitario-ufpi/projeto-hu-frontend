import { createClient } from "../../utils/supabase/client";

export async function uploadImagem(sessaoId: number, title: string, file: File) {
    const supabase = createClient();
    const timestamp = Date.now();
    const extensao = file.name.split(".").pop();
    const path = `sessao-${sessaoId}/${title}-${timestamp}.${extensao}`

    const { data, error } = await supabase.storage
    .from("arquivos-hu")
    .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
    });

    if(error) throw new Error(`Erro ao fazer o upload: ${error.message}`);

    const { data: urlData } = supabase.storage
    .from("arquivos-hu")
    .getPublicUrl(path);

    return urlData?.publicUrl ?? ""
}