import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Copy,
  Check,
  ArrowLeft,
  Upload,
  FileText,
} from "lucide-react";
import { Small, Text } from "../../../ui/Typography";
import Button from "../../../ui/Button";
import { ROUTES } from "../../../constants/routes";
import { slugify } from "../../../helpers/slug";
import { createBuilding } from "../../../db/repositories/building.repository";
import { importUsers } from "../../../db/repositories/user.repository";

function parseCedulas(text: string): { valids: string[]; invalids: number } {
  const lines = text
    .split("\n")
    .map((l) => l.trim().split(",")[0].trim())
    .filter((l) => l.length > 0);

  const valids = lines.filter((l) => /^\d+$/.test(l));
  return { valids, invalids: lines.length - valids.length };
}

export default function CreateBuilding() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [showError, setShowError] = useState(false);
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pendingCedulas, setPendingCedulas] = useState<string[]>([]);
  const [csvStatus, setCsvStatus] = useState<{
    type: "ok" | "warn";
    message: string;
  } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const link = `${window.location.origin}/user/${slug}/login`;

  function handleNameChange(value: string) {
    setName(value);
    setSlug(slugify(value));
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

  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvStatus(null);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const { valids, invalids } = parseCedulas(text);

      if (valids.length === 0) {
        setCsvStatus({
          type: "warn",
          message: "No se encontraron cédulas válidas en el archivo.",
        });
        setPendingCedulas([]);
        return;
      }

      setPendingCedulas(valids);
      setCsvStatus({
        type: "ok",
        message: `${valids.length} cédulas válidas encontradas${invalids > 0 ? `, ${invalids} ignoradas` : ""}.`,
      });
    };
    reader.readAsText(file);

    if (fileRef.current) fileRef.current.value = "";
  }

  function clearCsv() {
    setPendingCedulas([]);
    setCsvStatus(null);
  }

  async function handleSave() {
    if (name.trim().length < 3) {
      setShowError(true);
      return;
    }

    setCreating(true);
    try {
      await createBuilding({ slug, name, createdAt: new Date(), data: {} });

      if (pendingCedulas.length > 0) {
        await importUsers(
          pendingCedulas.map((cedula) => ({ cedula, buildingSlug: slug }))
        );
      }

      navigate(ROUTES.PANEL_BUILDINGS);
    } catch {
      setShowError(true);
    }
    setCreating(false);
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
        Crear edificio
      </h1>
      <Text className="text-slate-500">
        Registra un nuevo conjunto residencial en el portal de transparencia.
      </Text>

      {slug && (
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

          <p className="mt-4 text-sm text-slate-500">
            Comparte este enlace con los residentes para que accedan al portal
            de transparencia de este edificio.
          </p>
        </div>
      )}

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

        {slug && (
          <div>
            <Small className="text-slate-500">Slug (identificador único)</Small>
            <div className="mt-2 px-4 py-3 rounded-xl bg-slate-100 text-slate-600 text-sm font-mono">
              {slug}
            </div>
          </div>
        )}

        {/* CSV import section */}
        {slug && (
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-3">
              Importar residentes
            </h3>
            <Text className="text-slate-500 text-sm mb-4">
              Sube un archivo CSV o TXT con las cédulas de los residentes. Una
              cédula por línea. Solo números, sin letras ni espacios.
            </Text>

            <div className="flex items-center gap-3">
              <input
                ref={fileRef}
                type="file"
                accept=".csv,.txt"
                onChange={handleFileSelected}
                className="hidden"
              />
              <Button
                variant="outline"
                leftIcon={Upload}
                onClick={() => fileRef.current?.click()}
              >
                Seleccionar archivo
              </Button>

              {pendingCedulas.length > 0 && (
                <button
                  onClick={clearCsv}
                  className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Limpiar
                </button>
              )}
            </div>

            {csvStatus && (
              <div className="mt-3 flex items-center gap-1.5 text-sm">
                <FileText className="w-4 h-4" />
                <span
                  className={
                    csvStatus.type === "ok"
                      ? "text-primary font-medium"
                      : "text-danger font-medium"
                  }
                >
                  {csvStatus.message}
                </span>
              </div>
            )}
          </div>
        )}

        <Text className="text-slate-500">
          El slug se genera automáticamente a partir del nombre y se usa en la
          URL de acceso de los residentes.
        </Text>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            loading={creating}
            onClick={handleSave}
            disabled={name.trim().length < 3}
          >
            Guardar edificio
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
