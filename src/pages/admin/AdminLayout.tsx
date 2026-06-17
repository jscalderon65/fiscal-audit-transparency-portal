import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, Mail, Building2 } from "lucide-react";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../ui/Navbar";
import Footer from "../../ui/Footer";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMessages = location.pathname === ROUTES.PANEL_CONTACT_MESSAGES;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar
        rightContent={
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={async () => { await logout(); navigate(ROUTES.PANEL_LOGIN); }}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm text-slate-400 transition-colors hover:bg-slate-800"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        }
      />

      {/* Tab navigation */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex">
          <button
            onClick={() => navigate(ROUTES.PANEL_BUILDINGS)}
            className={`flex items-center justify-center gap-2 flex-1 px-3 sm:px-6 py-3 sm:py-3.5 text-sm font-semibold border-b-2 transition-colors ${
              !isMessages
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            <Building2 className="w-4 h-4" />
            Edificios
          </button>
          <button
            onClick={() => navigate(ROUTES.PANEL_CONTACT_MESSAGES)}
            className={`flex items-center justify-center gap-2 flex-1 px-3 sm:px-6 py-3 sm:py-3.5 text-sm font-semibold border-b-2 transition-colors ${
              isMessages
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            <Mail className="w-4 h-4" />
            Mensajes
          </button>
        </div>
      </div>

      <main className="flex-1">{children}</main>

      <Footer
        year={new Date().getFullYear()}
        portalName="Portal de Transparencia"
        residentialName="Panel de Administración"
      />
    </div>
  );
}
