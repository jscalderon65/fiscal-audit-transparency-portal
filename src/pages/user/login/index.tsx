import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Building2, ShieldCheck, Home, ArrowLeft } from "lucide-react";
import Card from "../../../ui/Card";
import Button from "../../../ui/Button";
import { PALETTE } from "../../../constants/theme";
import { ROUTES } from "../../../constants/routes";
import { getUserByCedula } from "../../../db/repositories/user.repository";
import { getBuildingBySlug } from "../../../db/repositories/building.repository";

export default function UserLoginPage() {
  const { buildingSlug } = useParams<{ buildingSlug: string }>();
  const navigate = useNavigate();
  const [cedula, setCedula] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [building, setBuilding] = useState<any>(null);
  const [buildingLoading, setBuildingLoading] = useState(true);

  useEffect(() => {
    if (!buildingSlug) return;
    getBuildingBySlug(buildingSlug)
      .then((b) => setBuilding(b))
      .finally(() => setBuildingLoading(false));
  }, [buildingSlug]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    const value = cedula.trim();
    if (!value) {
      setError("Ingrese su número de cédula");
      return;
    }
    if (!/^\d+$/.test(value)) {
      setError("La cédula debe contener solo números");
      return;
    }

    setLoading(true);
    try {
      const user = await getUserByCedula(value);
      if (!user) {
        setError("Cédula no registrada en este edificio");
        setLoading(false);
        return;
      }

      if (user.buildingSlug !== buildingSlug) {
        setError("Esta cédula no pertenece a este edificio");
        setLoading(false);
        return;
      }

      const buildingData = await getBuildingBySlug(buildingSlug);
      if (!buildingData) {
        setError("Edificio no encontrado");
        setLoading(false);
        return;
      }

      localStorage.setItem("session", JSON.stringify({
        cedula: value,
        building: buildingData,
      }));

      navigate(`/user/${buildingSlug}/dashboard`);
    } catch {
      setError("Error al iniciar sesión. Intente de nuevo.");
    }
    setLoading(false);
  }

  if (buildingLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: PALETTE.neutral[900] }}
      >
        <div className="text-center">
          <div
            className="mx-auto w-8 h-8 rounded-full border-2 border-transparent animate-spin"
            style={{
              borderTopColor: PALETTE.primary.DEFAULT,
              borderRightColor: PALETTE.primary.DEFAULT + "40",
              borderBottomColor: PALETTE.primary.DEFAULT + "20",
              borderLeftColor: PALETTE.primary.DEFAULT + "10",
            }}
          />
        </div>
      </div>
    );
  }

  if (!building) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: PALETTE.background.page }}
      >
        <Card className="max-w-md w-full text-center p-12">
          <h1 className="text-6xl font-extrabold mb-4" style={{ color: PALETTE.neutral[300] }}>
            404
          </h1>
          <p className="mb-8" style={{ color: PALETTE.text.muted }}>
            Página no encontrada
          </p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Volver al inicio
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: PALETTE.neutral[900] }}
    >
      {/* Fondo decorativo */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${PALETTE.primary.DEFAULT} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          backgroundColor: PALETTE.primary.DEFAULT + "15",
          filter: "blur(80px)",
        }}
      />

      <Card className="max-w-md w-full relative z-10">
        <div className="text-center">
          <div
            className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md"
            style={{
              backgroundColor: PALETTE.neutral[900],
              border: `1px solid ${PALETTE.primary.DEFAULT}4D`,
            }}
          >
            <Building2 className="w-8 h-8" style={{ color: PALETTE.primary.DEFAULT }} />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: PALETTE.text.default }}>
            {building.name}
          </h1>
          <p className="mt-2 font-medium" style={{ color: PALETTE.text.muted }}>
            Portal de Transparencia
          </p>
          <p className="mt-4 text-sm" style={{ color: PALETTE.neutral[500] }}>
            Bienvenido, residente. Consulte aquí los dictámenes de revisoría fiscal y las métricas financieras de su conjunto.
          </p>
        </div>

        <div
          className="mt-6 rounded-xl p-4 flex items-start gap-3"
          style={{
            backgroundColor: PALETTE.primary.DEFAULT + "10",
            border: `1px solid ${PALETTE.primary.DEFAULT}20`,
          }}
        >
          <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" style={{ color: PALETTE.primary.DEFAULT }} />
          <p className="text-sm leading-relaxed font-medium" style={{ color: PALETTE.primary.dark }}>
            Acceso restringido. Ingrese con su número de cédula registrado en la administración.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <input
              type="text"
              value={cedula}
              onChange={(event) => setCedula(event.target.value)}
              placeholder="Número de cédula"
              inputMode="numeric"
              className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all"
              style={{
                borderColor: error ? PALETTE.danger.DEFAULT : PALETTE.neutral[300],
                color: PALETTE.text.default,
                backgroundColor: PALETTE.background.surface,
              }}
              onFocus={(event) => {
                event.currentTarget.style.borderColor = error
                  ? PALETTE.danger.DEFAULT
                  : PALETTE.primary.DEFAULT;
              }}
              onBlur={(event) => {
                event.currentTarget.style.borderColor = error
                  ? PALETTE.danger.DEFAULT
                  : PALETTE.neutral[300];
              }}
            />
          </div>

          {error && (
            <div
              className="p-3 rounded-lg text-sm flex items-center gap-2"
              style={{
                backgroundColor: PALETTE.danger.DEFAULT + "15",
                color: PALETTE.danger.DEFAULT,
              }}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <Button variant="primary" loading={loading} onClick={handleSubmit} className="w-full">
            Ingresar al Portal Seguro
          </Button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: PALETTE.neutral[400] }}>
          Protegido bajo la Ley 1581 de Habeas Data.
        </p>
      </Card>
    </div>
  );
}
