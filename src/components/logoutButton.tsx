'use client';

import { useAuth } from '@/hooks/useAuth';

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = () => {
    if (confirm('Deseja realmente sair?')) {
      logout();
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Sair
    </button>
  );
}
