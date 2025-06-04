// src/components/AuthLayout.tsx


import { usePathname } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublic = pathname === "/login" || pathname === "/register";

  return isPublic ? children : <AuthGuard>{children}</AuthGuard>;
}
