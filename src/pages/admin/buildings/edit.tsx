import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AlertCircle, ArrowLeft, Users, Building2 } from "lucide-react";
import { Small, Text } from "../../../ui/Typography";
import Button from "../../../ui/Button";
import { ROUTES } from "../../../constants/routes";
import {
  getBuildingById,
  updateBuilding,
} from "../../../db/repositories/building.repository";
import {
  getUsersByBuildingSlug,
  createUser,
  deleteUser,
  importUsers,
} from "../../../db/repositories/user.repository";
import type { Building } from "../../../db/types/building";
import UsersTable from "./components/UsersTable";

type Tab = "info" | "users";

export default function EditBuilding() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [building, setBuilding] = useState<Building | null>(null);
  const [name, setName] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [showError, setShowError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<{ cedula: string }[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("info");

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

  useEffect(() => {
    if (!building?.slug) return;
    getUsersByBuildingSlug(building.slug).then(setUsers);
  }, [building?.slug]);

  function handleNameChange(value: string) {
    setName(value);
    setHasChanges(value !== building?.name);
    if (showError) setShowError(false);
  }

  async function handleSave() {
    if (name.trim().length < 3 || !id) {
      setShowError(true);
      return;
    }

    setSaving(true);
    try {
      await updateBuilding(id, { name });
      setHasChanges(false);
      setBuilding((prev) => (prev ? { ...prev, name } : prev));
    } catch {
      setShowError(true);
    }
    setSaving(false);
  }

  async function handleAddUser(cedula: string) {
    if (!building?.slug) return;
    await createUser({ cedula, buildingSlug: building.slug });
    setUsers((prev) => [...prev, { cedula }]);
  }

  async function handleDeleteUser(cedula: string) {
    await deleteUser(cedula);
    setUsers((prev) => prev.filter((u) => u.cedula !== cedula));
  }

  async function handleImportCsv(cedulas: string[]) {
    if (!building?.slug) return;
    const newUsers = cedulas.map((c) => ({
      cedula: c,
      buildingSlug: building.slug,
    }));
    await importUsers(newUsers);
    setUsers((prev) => {
      const existentes = new Set(prev.map((u) => u.cedula));
      const nuevos = newUsers.filter((u) => !existentes.has(u.cedula));
      return [...prev, ...nuevos];
    });
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

  const tabClass = (tab: Tab) =>
    `flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
      activeTab === tab
        ? "border-primary text-primary"
        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
    }`;

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
      <Text className="text-slate-500">{building.name}</Text>

      {/* Tabs */}
      <div className="mt-8 border-b border-slate-200 flex gap-6 overflow-x-auto">
        <button onClick={() => setActiveTab("info")} className={tabClass("info")}>
          <Building2 className="w-4 h-4" />
          Información
        </button>
        <button onClick={() => setActiveTab("users")} className={tabClass("users")}>
          <Users className="w-4 h-4" />
          Usuarios
        </button>
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {activeTab === "info" ? (
          <div className="space-y-6">
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

            <div className="flex flex-wrap items-center gap-3">
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
        ) : (
          <UsersTable
            users={users}
            buildingSlug={building.slug}
            onAdd={handleAddUser}
            onDelete={handleDeleteUser}
            onImport={handleImportCsv}
          />
        )}
      </div>
    </div>
  );
}
