import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import type { ReactNode } from "react";

export default function AdminGuard({ children }: { children: ReactNode }) {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin w-8 h-8 rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
}
