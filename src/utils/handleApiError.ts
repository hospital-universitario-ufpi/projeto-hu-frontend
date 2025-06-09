/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';

export function handleApiError(error: any, onUnauthorized?: () => void) {
    console.log(error)
  if (!error || typeof error !== 'object') {
    toast.error('Erro desconhecido.');
    return;
  }

  const status = error?.response?.status;
  const message = error?.response?.data?.message;

  if (status === 401) {
    toast.error('Sessão expirada. Faça login novamente.');
    if (onUnauthorized) onUnauthorized();
    return;
  }

  if (status === 403) {
    toast.error('Acesso negado.');
    return;
  }

  toast.error(error);
}
