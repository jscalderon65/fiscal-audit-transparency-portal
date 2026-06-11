import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Plus, Copy, Check, Pencil } from "lucide-react";
import Card from "../../../ui/Card";
import Button from "../../../ui/Button";
import { H1, Text, Small } from "../../../ui/Typography";
import { PALETTE } from "../../../constants/theme";
import { ROUTES } from "../../../constants/routes";
import { listBuildings } from "../../../db/repositories/building.repository";
import type { Building } from "../../../db/types/building";

function SkeletonRow() {
  return (
    <div className="py-5 border-b animate-pulse" style={{ borderColor: PALETTE.neutral[200] }}>
      <div className="h-5 w-48 rounded" style={{ backgroundColor: PALETTE.neutral[200] }} />
      <div className="mt-2 h-4 w-72 rounded" style={{ backgroundColor: PALETTE.neutral[100] }} />
      <div className="mt-3 h-4 w-24 rounded" style={{ backgroundColor: PALETTE.neutral[100] }} />
    </div>
  );
}

function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(event: React.MouseEvent) {
    event.stopPropagation();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
      style={{
        backgroundColor: copied ? PALETTE.success.DEFAULT : "transparent",
        color: copied ? "#ffffff" : PALETTE.primary.DEFAULT,
        border: copied ? "none" : `1.5px solid ${PALETTE.primary.DEFAULT}`,
      }}
      onMouseEnter={(event) => {
        if (!copied) {
          event.currentTarget.style.backgroundColor = PALETTE.primary.DEFAULT + "10";
        }
      }}
      onMouseLeave={(event) => {
        if (!copied) {
          event.currentTarget.style.backgroundColor = "transparent";
        }
      }}
    >
          {copied ? (
            <><Check className="w-3.5 h-3.5" />Link copiado</>
          ) : (
            <><Copy className="w-3.5 h-3.5" />Copiar link de acceso</>
          )}
    </button>
  );
}

export default function BuildingsList() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    listBuildings()
      .then(setBuildings)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <H1>Edificios</H1>
          <Text style={{ color: PALETTE.text.muted }}>
            Conjuntos residenciales registrados
          </Text>
        </div>
        <Button
          variant="primary"
          leftIcon={Plus}
          onClick={() => navigate(ROUTES.PANEL_BUILDINGS_CREATE)}
        >
          Crear
        </Button>
      </div>

      {loading ? (
        <Card className="p-6">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </Card>
      ) : buildings.length === 0 ? (
        <Card className="p-16 text-center">
          <Building2
            className="mx-auto w-12 h-12 mb-4"
            style={{ color: PALETTE.text.muted }}
          />
          <Text style={{ color: PALETTE.text.muted }}>
            No hay edificios registrados
          </Text>
          <Button
            variant="primary"
            leftIcon={Plus}
            onClick={() => navigate(ROUTES.PANEL_BUILDINGS_CREATE)}
            className="mt-6"
          >
            Crear primer edificio
          </Button>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          {[...buildings]
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .map((building, index) => (
            <div
              key={building.id}
              className="flex items-center justify-between px-6 py-4"
              style={{
                borderBottom: index < buildings.length - 1 ? `1px solid ${PALETTE.neutral[100]}` : "none",
              }}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 shrink-0" style={{ color: PALETTE.primary.DEFAULT }} />
                <div>
                  <div className="font-bold text-base" style={{ color: PALETTE.text.default }}>
                    {building.name}
                  </div>
                  <Small style={{ color: PALETTE.neutral[400] }}>
                    Creado: {new Date(building.createdAt).toLocaleDateString()}
                  </Small>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <CopyButton url={`${window.location.origin}/user/${building.slug}/login`} />
                <button
                  onClick={() => navigate(ROUTES.PANEL_BUILDINGS_EDIT.replace(":id", building.id))}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                  style={{
                    backgroundColor: PALETTE.neutral[100],
                    color: PALETTE.text.muted,
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.backgroundColor = PALETTE.neutral[200];
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.backgroundColor = PALETTE.neutral[100];
                  }}
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Editar edificio
                </button>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
