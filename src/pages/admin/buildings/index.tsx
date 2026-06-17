import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Plus, Copy, Check } from "lucide-react";
import Button from "../../../ui/Button";
import Toast from "../../../ui/Toast";
import { Text, Small } from "../../../ui/Typography";
import { ROUTES } from "../../../constants/routes";
import { listBuildings } from "../../../db/repositories/building.repository";
import type { Building } from "../../../db/types/building";

function SkeletonRow() {
  return (
    <div className="py-5 border-b border-slate-200 animate-pulse">
      <div className="h-5 w-48 rounded bg-slate-200" />
      <div className="mt-2 h-4 w-72 rounded bg-slate-100" />
      <div className="mt-3 h-4 w-24 rounded bg-slate-100" />
    </div>
  );
}

export default function BuildingsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.toast) {
      setToast(location.state.toast);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    listBuildings()
      .then(setBuildings)
      .finally(() => setLoading(false));
  }, []);

  async function copyLink(code: string, id: string) {
    const link = `${window.location.origin}/user/${code}/login`;
    try {
      await navigator.clipboard.writeText(link);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback para navegadores sin clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = link;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="h-8 w-56 rounded bg-slate-200 animate-pulse" />
          <div className="mt-2 h-5 w-80 rounded bg-slate-100 animate-pulse" />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      </div>
    );
}

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Edificios</h1>
          <Text className="text-slate-500 mt-1">Administra los conjuntos residenciales registrados en el portal.</Text>
        </div>
        <Button variant="primary" leftIcon={Plus} onClick={() => navigate(ROUTES.PANEL_BUILDINGS_CREATE)}>Crear edificio</Button>
      </div>

          {buildings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
          <Building2 className="w-12 h-12 mx-auto text-slate-300" />
          <Text className="text-slate-500 mt-4">No hay edificios registrados todavía.</Text>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {buildings.map((building, index) => (
            <motion.div
              key={building.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.04 }}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 gap-3 ${index < buildings.length - 1 ? "border-b border-slate-100" : ""}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Building2 className="w-5 h-5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <div className="font-bold text-sm sm:text-base text-slate-900 truncate">
                    {building.name}
                  </div>
                  <Small className="text-slate-400">
                    Creado el{" "}
                    {building.createdAt instanceof Date
                      ? building.createdAt.toLocaleDateString("es-CO", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "—"}
                  </Small>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => copyLink(building.code, building.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors border-2"
                  style={{
                    backgroundColor: copiedId === building.id ? "var(--color-primary)" : "transparent",
                    color: copiedId === building.id ? "#fff" : "var(--color-primary)",
                    borderColor: copiedId === building.id ? "transparent" : "var(--color-primary)",
                  }}
                >
                  {copiedId === building.id ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline">{copiedId === building.id ? "Copiado" : "Copiar link de acceso"}</span>
                  <span className="sm:hidden">{copiedId === building.id ? "Copiado" : "Copiar"}</span>
                </button>

                <Button
                  variant="ghost"
                  onClick={() =>
                    navigate(ROUTES.PANEL_BUILDINGS_EDIT.replace(":id", building.id))
                  }
                >
                  Editar edificio
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {toast && (
        <Toast message={toast} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
