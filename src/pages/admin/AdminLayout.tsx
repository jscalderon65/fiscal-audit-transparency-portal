import { useNavigate } from "react-router-dom";
import { ShieldCheck, LogOut } from "lucide-react";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../contexts/AuthContext";
import Footer from "../../ui/Footer";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="border-b bg-slate-900 border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(ROUTES.PANEL_BUILDINGS)}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white">
              Panel de Administración
            </span>
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">{user?.email}</span>
            <button
              onClick={async () => {
                await logout();
                navigate(ROUTES.PANEL_LOGIN);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 transition-colors hover:bg-slate-800"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <Footer
        year={new Date().getFullYear()}
        portalName="Portal de Transparencia"
        residentialName="Panel de Administración"
      />
    </div>
  );
}
