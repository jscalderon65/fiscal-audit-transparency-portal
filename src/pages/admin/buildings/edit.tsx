import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AlertCircle, ArrowLeft, Users, Building2, Trash2 } from "lucide-react";
import { Text } from "../../../ui/Typography";
import Button from "../../../ui/Button";
import { ROUTES } from "../../../constants/routes";
import {
  getBuildingById,
  updateBuilding,
  deleteBuilding,
} from "../../../db/repositories/building.repository";
import {
  getUsersByBuildingSlug,
  createUser,
  deleteUser,
  importUsers,
} from "../../../db/repositories/user.repository";
import type { Building } from "../../../db/types/building";
import Modal from "../../../ui/Modal";
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
    if (!building?.code) return;
    getUsersByBuildingSlug(building.code).then(setUsers);
  }, [building?.code]);

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
      navigate(ROUTES.PANEL_BUILDINGS, { state: { toast: "Edificio actualizado correctamente" } });
    } catch {
      setShowError(true);
    }
    setSaving(false);
  }

  async function handleAddUser(cedula: string) {
    if (!building?.code) return;
    await createUser({ cedula, buildingSlug: building.code });
    setUsers((prev) => [...prev, { cedula }]);
  }

  async function handleDeleteUser(cedula: string) {
    await deleteUser(cedula);
    setUsers((prev) => prev.filter((u) => u.cedula !== cedula));
  }

  async function handleImportCsv(cedulas: string[]) {
    if (!building?.code) return;
    const newUsers = cedulas.map((c) => ({
      cedula: c,
      buildingSlug: building.code,
    }));
    await importUsers(newUsers);
    setUsers((prev) => {
      const existentes = new Set(prev.map((u) => u.cedula));
      const nuevos = newUsers.filter((u) => !existentes.has(u.cedula));
      return [...prev, ...nuevos];
    });
  }

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!id) return;
    setDeleting(true);
    try {
      await deleteBuilding(id);
      navigate(ROUTES.PANEL_BUILDINGS, { state: { toast: "Edificio eliminado" } });
    } catch {
      setShowError(true);
    }
    setDeleting(false);
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
    `flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
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

      {/* Tabs */}
      <div className="mt-8 border-b border-slate-200 flex">
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
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Nombre del edificio *
              </label>
              <div className="relative">
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

            {/* Mock fields — preview de cómo se vería con más campos */}
            <div className="border-t border-slate-200 pt-6 mt-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Vista previa — campos adicionales
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Dirección
                  </label>
                  <input
                    type="text"
                    defaultValue="Carrera 45 # 23-12"
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 text-sm outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    defaultValue="Bogotá D.C."
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 text-sm outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    NIT
                  </label>
                  <input
                    type="text"
                    defaultValue="901.123.456-7"
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 text-sm outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    defaultValue="601 345 67 89"
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 text-sm outline-none cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
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

            {/* Delete section */}
            <div className="border-t border-slate-200 pt-6 mt-10">
              <h3 className="text-base font-bold text-slate-900">
                Eliminar edificio
              </h3>
              <p className="text-sm text-slate-500 mt-1 mb-4">
                Al eliminar este edificio se perderá el acceso de todos sus
                residentes y la información asociada.
              </p>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all py-2 px-4 bg-transparent border-2 border-danger text-danger hover:bg-danger hover:text-white"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar este edificio
                </button>
              </div>
            </div>
          </div>
        ) : (
          <UsersTable
            users={users}
            buildingSlug={building.code}
            onAdd={handleAddUser}
            onDelete={handleDeleteUser}
            onImport={handleImportCsv}
          />
        )}
      </div>

      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Eliminar edificio"
        message="¿Estás seguro de eliminar este edificio? Esta acción no se puede deshacer. Todos los usuarios y datos asociados se perderán."
        confirmLabel="Sí, eliminar"
        variant="danger"
        loading={deleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}
