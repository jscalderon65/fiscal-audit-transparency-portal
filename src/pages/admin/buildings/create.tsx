import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft, Copy, Check, AlertCircle } from "lucide-react";
import Card from "../../../ui/Card";
import Button from "../../../ui/Button";
import { H1, Text, Small } from "../../../ui/Typography";
import { PALETTE } from "../../../constants/theme";
import { ROUTES } from "../../../constants/routes";
import { createBuilding } from "../../../db/repositories/building.repository";
import { slugify } from "../../../helpers/slug";

function AccessUrl({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}/user/${slug}/login`;

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <Small style={{ color: PALETTE.text.muted }}>Link de Acceso</Small>
      <div className="flex items-center gap-2 mt-1">
        <div
          className="flex-1 px-3 py-2 rounded-lg text-sm truncate"
          style={{
            backgroundColor: PALETTE.neutral[100],
            color: PALETTE.primary.DEFAULT,
          }}
        >
          {url}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center w-9 h-9 rounded-lg transition-all"
          style={{
            backgroundColor: copied ? PALETTE.success.DEFAULT + "20" : "transparent",
            color: copied ? PALETTE.success.DEFAULT : PALETTE.primary.DEFAULT,
            border: copied ? "none" : `1.5px solid ${PALETTE.primary.DEFAULT}`,
          }}
          onMouseEnter={(event) => {
            if (!copied) event.currentTarget.style.backgroundColor = PALETTE.primary.DEFAULT + "10";
          }}
          onMouseLeave={(event) => {
            if (!copied) event.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export default function CreateBuilding() {
  const [name, setName] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const slug = slugify(name);
  const trimmedName = name.trim();
  const nameError = !trimmedName || trimmedName.length < 3 || !slug;
  const showError = touched && nameError;

  async function handleSave() {
    setTouched(true);
    if (nameError) return;
    setError("");
    try {
      await createBuilding({
        slug,
        name: name.trim(),
        createdAt: new Date(),
        data: {},
      });
      navigate(ROUTES.PANEL_BUILDINGS);
    } catch (err: any) {
      setError("Error al guardar: " + err.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <button
        onClick={() => navigate(ROUTES.PANEL_BUILDINGS)}
        className="flex items-center gap-2 mb-8 transition-colors"
        style={{ color: PALETTE.text.muted }}
        onMouseEnter={(event) => { event.currentTarget.style.color = PALETTE.text.default; }}
        onMouseLeave={(event) => { event.currentTarget.style.color = PALETTE.text.muted; }}
      >
        <ArrowLeft className="w-4 h-4" />
        Volver
      </button>

      <Card className="p-8">
        <H1>Crear Edificio</H1>
        <Text className="mt-1" style={{ color: PALETTE.text.muted }}>
          Ingresa el nombre del conjunto residencial
        </Text>

        {error && (
          <div
            className="mt-4 p-3 rounded-lg text-sm flex items-center gap-2"
            style={{
              backgroundColor: PALETTE.danger.DEFAULT + "15",
              color: PALETTE.danger.DEFAULT,
            }}
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <div className="mt-8 space-y-6">
          <div>
            <Small style={{ color: PALETTE.text.muted }}>Nombre del edificio *</Small>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="Ej: Quintas de Santa Rita"
              className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-all mt-1"
              style={{
                borderColor: showError ? PALETTE.danger.DEFAULT : PALETTE.neutral[300],
                color: PALETTE.text.default,
              }}
              onFocus={(event) => {
                event.currentTarget.style.borderColor = showError ? PALETTE.danger.DEFAULT : PALETTE.primary.DEFAULT;
              }}
            />
            {showError && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" style={{ color: PALETTE.danger.DEFAULT }} />
                <span className="text-sm" style={{ color: PALETTE.danger.DEFAULT }}>
                  {!trimmedName
                    ? "El nombre del edificio es obligatorio"
                    : "Escribe un nombre válido (mínimo 3 caracteres)"}
                </span>
              </div>
            )}
          </div>

          {name && <AccessUrl slug={slug} />}

          <div className="flex items-center gap-3 pt-4">
            <Button
              variant="primary"
              leftIcon={Save}
              onClick={handleSave}
            >
              Guardar Edificio
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(ROUTES.PANEL_BUILDINGS)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
