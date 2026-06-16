import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AlertCircle, Copy, Check, ArrowLeft } from "lucide-react";
import { Small, Text } from "../../../ui/Typography";
import Button from "../../../ui/Button";
import { ROUTES } from "../../../constants/routes";
import { slugify } from "../../../helpers/slug";
import {
  getBuildingById,
  updateBuilding,
} from "../../../db/repositories/building.repository";
import type { Building } from "../../../db/types/building";

export default function EditBuilding() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [building, setBuilding] = useState<Building | null>(null);
  const [name, setName] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [showError, setShowError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    getBuildingById(id)
      .then((data) => {
        if (data) {
          setBuilding(data);
          setName(data.name);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const slug = slugify(name);
  const link = `${window.location.origin}/user/${slug}/login`;

  function handleNameChange(value: string) {
    setName(value);
    setHasChanges(value !== building?.name);
    if (showError) setShowError(false);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = link;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSave() {
    if (name.trim().length < 3 || !id) {
      setShowError(true);
      return;
    }

    setSaving(true);
    try {
      await updateBuilding(id, { name, slug });
      navigate(ROUTES.PANEL_BUILDINGS);
    } catch {
      setShowError(true);
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="h-6 w-32 rounded bg-slate-200 animate-pulse mb-6" />
        <div className="h-8 w-56 rounded bg-slate-200 animate-pulse mb-2" />
        <div className="h-5 w-72 rounded bg-slate-100 animate-pulse" />
      </div>
    );
  }

  if (!building) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate(ROUTES.PANEL_BUILDINGS)}
          className="flex items-center gap-2 text-sm text-slate-500 mb-6 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a edificios
        </button>
        <Text className="text-slate-500">Edificio no encontrado</Text>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(ROUTES.PANEL_BUILDINGS)}
        className="flex items-center gap-2 text-sm text-slate-500 mb-6 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a edificios
      </button>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
        Editar edificio
      </h1>
      <Text className="text-slate-500">
        Modifica los datos del conjunto residencial.
      </Text>

      <div className="mt-8 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <Small className="text-slate-500">Link de Acceso</Small>
        <div className="mt-2 flex items-center justify-between gap-4 p-3 rounded-xl bg-slate-100 text-primary text-sm font-mono break-all">
          <span className="truncate">{link}</span>
        </div>

        <button
          onClick={handleCopy}
          className="mt-3 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors border-2"
          style={{
            backgroundColor: copied ? "var(--color-primary)" : "transparent",
            color: copied ? "#fff" : "var(--color-primary)",
            borderColor: copied ? "transparent" : "var(--color-primary)",
          }}
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copied ? "Copiado" : "Copiar link"}
        </button>
      </div>

      <div className="mt-8 space-y-6">
        <div>
          <Small className="text-slate-500">Nombre del edificio *</Small>
          <div className="mt-2 relative">
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Ej: Conjunto Residencial Los Alamos"
              className="w-full px-4 py-3 rounded-xl outline-none transition-all bg-white text-slate-900 focus:border-primary"
              style={{
                borderColor: showError ? "#dc2626" : "#d1d5db",
              }}
            />
            {showError && (
              <div className="mt-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-danger" />
                <span className="text-sm text-danger">
                  El nombre debe tener al menos 3 caracteres
                </span>
              </div>
            )}
          </div>
        </div>

        <div>
          <Small className="text-slate-500">Slug (identificador único)</Small>
          <div className="mt-2 px-4 py-3 rounded-xl bg-slate-100 text-slate-600 text-sm font-mono">
            {slug}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            loading={saving}
            onClick={handleSave}
            disabled={!hasChanges || name.trim().length < 3}
          >
            Guardar cambios
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate(ROUTES.PANEL_BUILDINGS)}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
