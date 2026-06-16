import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AlertCircle, ArrowLeft, Users, Building2, Trash2, Plus, Upload,
  Wallet, PiggyBank, HardHat, DollarSign, TrendingUp, TrendingDown,
  BarChart3, PieChart, CreditCard, Landmark, Calculator, Percent,
  ArrowUpRight, ArrowDownRight, Scale, ClipboardList, FileText,
  Receipt, Banknote, Loader2,
} from "lucide-react";
import { Text } from "../../../ui/Typography";
import Button from "../../../ui/Button";
import Toast from "../../../ui/Toast";
import { ROUTES } from "../../../constants/routes";
import { formatCurrency, validateMonth } from "../../../helpers/parseDocuments";
import {
  getBuildingById, updateBuilding, deleteBuilding,
} from "../../../db/repositories/building.repository";
import {
  getUsersByBuildingCode, createUser, deleteUser, importUsers,
} from "../../../db/repositories/user.repository";
import {
  getMetricsByBuildingCode, createMetric, deleteMetric,
} from "../../../db/repositories/metric.repository";
import {
  getReportsByBuildingCode, createReport as createReportRepo,
  updateReport as updateReportRepo, deleteReport, uploadReportPdf,
} from "../../../db/repositories/report.repository";
import type { Building } from "../../../db/types/building";
import type { BuildingMetric } from "../../../db/types/metric";
import type { BuildingReport } from "../../../db/types/report";
import Modal from "../../../ui/Modal";
import UsersTable from "./components/UsersTable";
import type { LucideIcon } from "lucide-react";

type Tab = "info" | "users" | "metrics" | "reports";

const METRIC_ICONS = [
  "Wallet", "PiggyBank", "HardHat", "Building2",
  "DollarSign", "TrendingUp", "TrendingDown", "BarChart3",
  "PieChart", "CreditCard", "Landmark", "Calculator",
  "Percent", "ArrowUpRight", "ArrowDownRight", "Scale",
  "ClipboardList", "FileText", "Receipt", "Banknote",
] as const;

const iconMap: Record<string, LucideIcon> = {
  Wallet, PiggyBank, HardHat, Building2,
  DollarSign, TrendingUp, TrendingDown, BarChart3,
  PieChart, CreditCard, Landmark, Calculator,
  Percent, ArrowUpRight, ArrowDownRight, Scale,
  ClipboardList, FileText, Receipt, Banknote,
};

const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB

export default function EditBuilding() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [building, setBuilding] = useState<Building | null>(null);
  const [name, setName] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [showError, setShowError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<{ userDocumentNumber: string }[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [metrics, setMetrics] = useState<BuildingMetric[]>([]);
  const [reports, setReports] = useState<BuildingReport[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [newMetric, setNewMetric] = useState<BuildingMetric>({ title: "", value: "", subtitle: "", icon: "Wallet", order: 0 });
  const [newReport, setNewReport] = useState<BuildingReport & { file?: File }>({ month: "", title: "", status: "Auditado", topics: "", createdAt: new Date() });
  const [addingMetric, setAddingMetric] = useState(false);
  const [deletingMetricId, setDeletingMetricId] = useState<string | null>(null);
  const [addingReport, setAddingReport] = useState(false);
  const [deletingReportId, setDeletingReportId] = useState<string | null>(null);
  const [metricError, setMetricError] = useState("");
  const [reportError, setReportError] = useState("");
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);

  useEffect(() => {
    if (!id) return;
    getBuildingById(id).then((data) => {
      if (data) { setBuilding(data); setName(data.name); }
    }).finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!building?.code) return;
    getUsersByBuildingCode(building.code).then(setUsers);
    getMetricsByBuildingCode(building.code).then(setMetrics);
    getReportsByBuildingCode(building.code).then(setReports);
  }, [building?.code]);

  function handleNameChange(value: string) {
    setName(value);
    setHasChanges(value !== building?.name);
    if (showError) setShowError(false);
  }

  async function handleSave() {
    if (name.trim().length < 3 || !id) { setShowError(true); return; }
    setSaving(true);
    try {
      await updateBuilding(id, { name });
      setToast({ message: "Edificio actualizado correctamente" });
      setHasChanges(false);
    } catch {
      setToast({ message: "Error al guardar los cambios", type: "error" });
    }
    setSaving(false);
  }

  async function handleAddUser(userDocumentNumber: string) {
    if (!building?.code) return;
    await createUser({ userDocumentNumber, buildingCode: building.code });
    setUsers((prev) => [...prev, { userDocumentNumber }]);
  }

  async function handleDeleteUser(userDocumentNumber: string) {
    await deleteUser(userDocumentNumber);
    setUsers((prev) => prev.filter((u) => u.userDocumentNumber !== userDocumentNumber));
  }

  async function handleImportCsv(documents: string[]) {
    if (!building?.code) return;
    const newUsers = documents.map((d) => ({ userDocumentNumber: d, buildingCode: building.code }));
    await importUsers(newUsers);
    setUsers((prev) => {
      const existing = new Set(prev.map((u) => u.userDocumentNumber));
      return [...prev, ...newUsers.filter((u) => !existing.has(u.userDocumentNumber))];
    });
  }

  function validateMetric(): string | null {
    if (!newMetric.title.trim() || newMetric.title.trim().length < 3) return "El título debe tener al menos 3 caracteres";
    if (!newMetric.value.trim()) return "El valor es obligatorio";
    if (!newMetric.subtitle.trim()) return "El subtítulo es obligatorio";
    return null;
  }

  async function handleAddMetric() {
    const validationError = validateMetric();
    if (validationError) { setMetricError(validationError); return; }
    setMetricError("");
    setAddingMetric(true);
    try {
      const metricId = await createMetric({ ...newMetric, buildingCode: building.code! });
      setMetrics((prev) => [...prev, { ...newMetric, id: metricId }]);
      setNewMetric({ title: "", value: "", subtitle: "", icon: "Wallet", order: 0 });
      setToast({ message: "Métrica agregada correctamente" });
    } catch {
      setToast({ message: "Error al agregar la métrica", type: "error" });
    }
    setAddingMetric(false);
  }

  async function handleDeleteMetric(metricId: string) {
    setDeletingMetricId(metricId);
    try {
      await deleteMetric(metricId);
      setMetrics((prev) => prev.filter((m) => m.id !== metricId));
    } catch {
      setToast({ message: "Error al eliminar la métrica", type: "error" });
    }
    setDeletingMetricId(null);
  }

  function validateReport(): string | null {
    if (!newReport.month.trim() || newReport.month.trim().length < 3) return "El mes debe tener al menos 3 caracteres";
    if (!newReport.title.trim() || newReport.title.trim().length < 5) return "El título debe tener al menos 5 caracteres";
    if (!newReport.topics.trim() || newReport.topics.trim().length < 5) return "Los temas deben tener al menos 5 caracteres";
    if (newReport.file && newReport.file.size > MAX_PDF_SIZE) return "El PDF no puede superar los 10MB";
    return null;
  }

  async function handleAddReport() {
    const monthError = validateMonth(newReport.month);
    if (monthError) { setReportError(monthError); return; }
    const validationError = validateReport();
    if (validationError) { setReportError(validationError); return; }
    setReportError("");
    setAddingReport(true);
    try {
      const reportId = await createReportRepo({
        month: newReport.month.trim(),
        title: newReport.title.trim(),
        status: "Auditado",
        topics: newReport.topics.trim(),
        createdAt: new Date(),
        buildingCode: building.code!,
      });
      let pdfUrl: string | undefined;
      if (newReport.file) {
        try {
          const uploadWithTimeout = (promise: Promise<string>, ms: number) =>
            Promise.race([
              promise,
              new Promise<string>((_, reject) =>
                setTimeout(() => reject(new Error("Tiempo de espera agotado. Verifica la configuración de Storage.")), ms)
              ),
            ]);
          pdfUrl = await uploadWithTimeout(uploadReportPdf(building.code!, reportId, newReport.file), 30000);
          await updateReportRepo(reportId, { pdfUrl });
        } catch (uploadError) {
          setToast({
            message: uploadError instanceof Error ? uploadError.message : "Error al subir el PDF",
            type: "error",
          });
        }
      }
      setReports((prev) => [...prev, { id: reportId, month: newReport.month.trim(), title: newReport.title.trim(), status: "Auditado", topics: newReport.topics.trim(), pdfUrl, createdAt: new Date() }]);
      setNewReport({ month: "", title: "", status: "Auditado", topics: "", createdAt: new Date() });
      setToast({ message: "Reporte agregado correctamente" });
    } catch {
      setToast({ message: "Error al agregar el reporte", type: "error" });
    }
    setAddingReport(false);
  }

  async function handleDeleteReport(reportId: string) {
    setDeletingReportId(reportId);
    try {
      await deleteReport(reportId);
      setReports((prev) => prev.filter((r) => r.id !== reportId));
    } catch {
      setToast({ message: "Error al eliminar el reporte", type: "error" });
    }
    setDeletingReportId(null);
  }

  async function handleDeleteBuilding() {
    if (!id) return;
    setDeleting(true);
    try {
      await deleteBuilding(id);
      navigate(ROUTES.PANEL_BUILDINGS, { state: { toast: "Edificio eliminado" } });
    } catch { setShowError(true); }
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
        <button onClick={() => navigate(ROUTES.PANEL_BUILDINGS)} className="flex items-center gap-2 text-sm text-slate-500 mb-6 hover:text-slate-900 transition-colors"><ArrowLeft className="w-4 h-4" /> Volver a edificios</button>
        <Text className="text-slate-500">Edificio no encontrado</Text>
      </div>
    );
  }

  const tabClass = (tab: Tab) =>
    `flex-1 flex items-center justify-center gap-2 px-2 sm:px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
      activeTab === tab ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
    }`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button onClick={() => navigate(ROUTES.PANEL_BUILDINGS)} className="flex items-center gap-2 text-sm text-slate-500 mb-6 hover:text-slate-900 transition-colors"><ArrowLeft className="w-4 h-4" /> Volver a edificios</button>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Editar edificio</h1>

      {/* Tabs */}
      <div className="mt-8 border-b border-slate-200 flex">
        <button onClick={() => setActiveTab("info")} className={tabClass("info")}><Building2 className="w-4 h-4" /> Información</button>
        <button onClick={() => setActiveTab("users")} className={tabClass("users")}><Users className="w-4 h-4" /> Usuarios</button>
        <button onClick={() => setActiveTab("metrics")} className={tabClass("metrics")}><BarChart3 className="w-4 h-4" /> Métricas</button>
        <button onClick={() => setActiveTab("reports")} className={tabClass("reports")}><FileText className="w-4 h-4" /> Reportes</button>
      </div>

      {/* Tab content */}
      <div className="mt-6 max-w-2xl mx-auto">
        {activeTab === "info" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nombre del edificio *</label>
              <input type="text" value={name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Ej: Conjunto Residencial Los Alamos" className={`w-full px-4 py-3 rounded-xl outline-none transition-all bg-white text-slate-900 focus:border-primary ${showError ? "border-danger" : "border-slate-300"}`} />
              {showError && <div className="mt-2 flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5 text-danger" /><span className="text-sm text-danger">El nombre debe tener al menos 3 caracteres</span></div>}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" loading={saving} onClick={handleSave} disabled={!hasChanges || name.trim().length < 3}>Guardar cambios</Button>
              <Button variant="ghost" onClick={() => navigate(ROUTES.PANEL_BUILDINGS)}>Cancelar</Button>
            </div>

            <div className="border-t border-slate-200 pt-6 mt-10">
              <h3 className="text-base font-bold text-slate-900">Eliminar edificio</h3>
              <p className="text-sm text-slate-500 mt-1 mb-4">Al eliminar este edificio se perderá el acceso de todos sus residentes y la información asociada.</p>
              <div className="flex justify-center">
                <button type="button" onClick={() => setShowDeleteModal(true)} className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all py-2 px-4 bg-transparent border-2 border-danger text-danger hover:bg-danger hover:text-white">
                  <Trash2 className="w-4 h-4" /> Eliminar este edificio
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <UsersTable users={users} buildingCode={building.code} onAdd={handleAddUser} onDelete={handleDeleteUser} onImport={handleImportCsv} />
        )}

        {activeTab === "metrics" && (
          <div className="space-y-4">
            {metrics.map((metric) => {
              const IconComponent = iconMap[metric.icon];
              const isDeleting = deletingMetricId === metric.id;
              return (
                <div key={metric.id} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200">
                  {IconComponent && <IconComponent className="w-5 h-5 text-primary shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900 truncate">{metric.title}</div>
                    <div className="text-sm text-slate-500 truncate">{metric.value} — {metric.subtitle}</div>
                  </div>
                  <button
                    onClick={() => metric.id && handleDeleteMetric(metric.id)}
                    disabled={isDeleting}
                    className="text-slate-400 hover:text-danger transition-colors shrink-0 disabled:opacity-50"
                  >
                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              );
            })}
            {metrics.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No hay métricas registradas.</p>}

            {/* Add metric form */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <p className="font-bold text-slate-900 mb-3">Agregar métrica</p>

              {metricError && (
                <div className="mb-3 p-3 rounded-lg text-sm flex items-center gap-2 bg-danger/10 text-danger">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {metricError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div>
                  <input type="text" value={newMetric.title} onChange={(e) => { setNewMetric((prev) => ({ ...prev, title: e.target.value })); setMetricError(""); }} placeholder="Título * (mín. 3 caracteres)" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary bg-white text-slate-900" />
                </div>
                <input type="text" value={newMetric.value} onChange={(e) => { setNewMetric((prev) => ({ ...prev, value: formatCurrency(e.target.value) })); setMetricError(""); }} placeholder="$ *" className="px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary bg-white text-slate-900" />
                <input type="text" value={newMetric.subtitle} onChange={(e) => { setNewMetric((prev) => ({ ...prev, subtitle: e.target.value })); setMetricError(""); }} placeholder="Subtítulo *" className="px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary bg-white text-slate-900" />
              </div>

              {/* Icon picker */}
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Icono</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {METRIC_ICONS.map((iconName) => {
                  const IconComponent = iconMap[iconName];
                  const isSelected = newMetric.icon === iconName;
                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => setNewMetric((prev) => ({ ...prev, icon: iconName }))}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all border-2 ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600"
                      }`}
                      title={iconName}
                    >
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-center">
                <Button variant="primary" leftIcon={Plus} onClick={handleAddMetric} loading={addingMetric} disabled={!newMetric.title || !newMetric.value}>Agregar</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="space-y-4">
            {reports.map((report) => {
              const isDeleting = deletingReportId === report.id;
              return (
                <div key={report.id} className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900 truncate">{report.month} — {report.title}</div>
                    <div className="text-sm text-slate-500 truncate">{report.topics}</div>
                  </div>
                  {report.pdfUrl && (
                    <a href={report.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-semibold hover:underline mr-3 shrink-0">PDF</a>
                  )}
                  <button
                    onClick={() => report.id && handleDeleteReport(report.id)}
                    disabled={isDeleting}
                    className="text-slate-400 hover:text-danger transition-colors shrink-0 disabled:opacity-50"
                  >
                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              );
            })}
            {reports.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No hay reportes registrados.</p>}

            {/* Add report form */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <p className="font-bold text-slate-900 mb-3">Agregar reporte</p>

              {reportError && (
                <div className="mb-3 p-3 rounded-lg text-sm flex items-center gap-2 bg-danger/10 text-danger">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {reportError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <input type="text" value={newReport.month} onChange={(e) => { setNewReport((prev) => ({ ...prev, month: e.target.value })); setReportError(""); }} placeholder="Mes * (Ej: Marzo 2026)" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary bg-white text-slate-900" />
                </div>
                <div>
                  <input type="text" value={newReport.title} onChange={(e) => { setNewReport((prev) => ({ ...prev, title: e.target.value })); setReportError(""); }} placeholder="Título * (mín. 5 caracteres)" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary bg-white text-slate-900" />
                </div>
                <div className="sm:col-span-2">
                  <input type="text" value={newReport.topics} onChange={(e) => { setNewReport((prev) => ({ ...prev, topics: e.target.value })); setReportError(""); }} placeholder="Temas abordados * (mín. 5 caracteres)" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary bg-white text-slate-900" />
                </div>
                <div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && file.size > MAX_PDF_SIZE) {
                        setReportError("El PDF no puede superar los 10MB");
                        e.target.value = "";
                        return;
                      }
                      setNewReport((prev) => ({ ...prev, file }));
                      setReportError("");
                    }}
                    className="w-full text-sm text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
                  />
                  <p className="text-xs text-slate-400 mt-1">Máximo 10MB. Opcional.</p>
                </div>
              </div>
              <div className="flex justify-center">
                <Button variant="primary" leftIcon={Plus} onClick={handleAddReport} loading={addingReport} disabled={!newReport.month || !newReport.title || !newReport.topics}>Agregar</Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Eliminar edificio" message="¿Estás seguro de eliminar este edificio? Esta acción no se puede deshacer. Todos los usuarios y datos asociados se perderán." confirmLabel="Sí, eliminar" variant="danger" loading={deleting} onConfirm={handleDeleteBuilding} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
