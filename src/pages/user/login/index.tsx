import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Building2, ShieldCheck, Home, ArrowLeft } from "lucide-react";
import Card from "../../../ui/Card";
import Button from "../../../ui/Button";
import { ROUTES } from "../../../constants/routes";
import { getUserByUserDocumentNumber } from "../../../db/repositories/user.repository";
import { getBuildingByCode } from "../../../db/repositories/building.repository";

export default function UserLoginPage() {
  const { buildingCode } = useParams<{ buildingCode: string }>();
  const navigate = useNavigate();
  const [userDocumentNumber, setUserDocumentNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [building, setBuilding] = useState<any>(null);
  const [buildingLoading, setBuildingLoading] = useState(true);

  useEffect(() => {
    if (!buildingCode) return;
    getBuildingByCode(buildingCode)
      .then((b) => setBuilding(b))
      .finally(() => setBuildingLoading(false));
  }, [buildingCode]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    const value = userDocumentNumber.trim();
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
      const user = await getUserByUserDocumentNumber(value);
      if (!user) {
        setError("Cédula no registrada en este edificio");
        setLoading(false);
        return;
      }

      if (user.buildingCode !== buildingCode) {
        setError("Esta cédula no pertenece a este edificio");
        setLoading(false);
        return;
      }

      const buildingData = await getBuildingByCode(buildingCode);
      if (!buildingData) {
        setError("Edificio no encontrado");
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "session",
        JSON.stringify({
          userDocumentNumber: value,
          building: buildingData,
          expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        })
      );

      navigate(`/user/${buildingCode}/dashboard`);
    } catch {
      setError("Error al iniciar sesión. Intente de nuevo.");
    }
    setLoading(false);
  }

  if (buildingLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
        <div className="text-center">
          <div className="mx-auto w-8 h-8 rounded-full border-2 border-transparent animate-spin border-t-primary border-r-primary/25 border-b-primary/10 border-l-primary/5" />
        </div>
      </div>
    );
  }

  if (!building) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
        <Card className="max-w-md w-full text-center p-12">
          <h1 className="text-6xl font-extrabold mb-4 text-slate-300">
            404
          </h1>
          <p className="mb-8 text-slate-500">Página no encontrada</p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Volver al inicio
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50">
      {/* Fondo decorativo suave */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none bg-primary/5 blur-[80px]" />

      <Card className="max-w-md w-full relative z-10">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md bg-primary/10 border border-primary/20">
            <Building2 className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            {building.name}
          </h1>
          <p className="mt-2 font-medium text-slate-500">
            Portal de Transparencia
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Bienvenido, residente. Consulte aquí los dictámenes de revisoría
            fiscal y las métricas financieras de su conjunto.
          </p>
        </div>

        <div className="mt-6 rounded-xl p-4 flex items-start gap-3 bg-primary/5 border border-primary/10">
          <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
          <p className="text-sm leading-relaxed font-medium text-primary-dark">
            Acceso restringido. Ingrese con su número de cédula registrado en la
            administración.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <input
              type="text"
              value={userDocumentNumber}
              onChange={(event) => setUserDocumentNumber(event.target.value)}
              placeholder="Número de cédula"
              inputMode="numeric"
              className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all bg-white text-slate-900 focus:border-primary ${
                error ? "border-danger" : "border-slate-300"
              }`}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg text-sm flex items-center gap-2 bg-danger/10 text-danger">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <Button
            variant="primary"
            loading={loading}
            onClick={handleSubmit}
            className="w-full"
          >
            Ingresar al Portal Seguro
          </Button>
        </form>

        <p className="text-center text-xs mt-6 text-slate-400">
          Protegido bajo la Ley 1581 de Habeas Data.
        </p>
      </Card>
    </div>
  );
}
