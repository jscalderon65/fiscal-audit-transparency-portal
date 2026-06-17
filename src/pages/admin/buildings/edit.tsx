import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
import { formatCurrency } from "../../../helpers/parseDocuments";
import { getBuildingById, updateBuilding, deleteBuilding } from "../../../db/repositories/building.repository";
import { getUsersByBuildingCode, createUser, deleteUser, importUsers } from "../../../db/repositories/user.repository";
import { getMetricsByBuildingCode, createMetric, deleteMetric } from "../../../db/repositories/metric.repository";
import {
  getReportsByBuildingCode, createReport as createReportRepo,
  updateReport as updateReportRepo, deleteReport,
  downloadPdf,
} from "../../../db/repositories/report.repository";
import type { Building } from "../../../db/types/building";
import type { BuildingMetric } from "../../../db/types/metric";
import type { BuildingReport } from "../../../db/types/report";
import type { LucideIcon } from "lucide-react";
import Modal from "../../../ui/Modal";
import UsersTable from "./components/UsersTable";
import MetricCard from "../../../pages/user/components/metrics/components/MetricCard";
import ReportCard from "../../../pages/user/components/reports/components/ReportCard";
import type { IMetric } from "../../../pages/user/components/metrics/components/MetricCard";
import type { IReportData } from "../../../pages/user/components/reports/interfaces/reports-section.interface";

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

const MAX_PDF_SIZE = 10 * 1024 * 1024;

const MONTHS = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"] as const;
const YEARS = Array.from({ length: 11 }, (_, i) => (2020 + i).toString());

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
  const [newReport, setNewReport] = useState<BuildingReport & { pdfUrlInput?: string }>({ month: "", title: "", status: "Auditado", topics: "", pdfUrlInput: "", createdAt: new Date() });
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
    setName(value.toUpperCase());
    setHasChanges(value.toUpperCase() !== building?.name);
    if (showError) setShowError(false);
  }

  async function handleSave() {
    if (name.trim().length < 3 || !id) { setShowError(true); return; }
    setSaving(true);
    try {
      await updateBuilding(id, { name: name.trim() });
      setToast({ message: "Edificio actualizado correctamente" });
      setHasChanges(false);
    } catch { setToast({ message: "Error al guardar los cambios", type: "error" }); }
    setSaving(false);
  }

  async function handleAddUser(userDocumentNumber: string) {
    if (!building?.code) return;
    await createUser({ userDocumentNumber, buildingCode: building.code });
    setUsers((prev) => [...prev, { userDocumentNumber }]);
    setToast({ message: "Usuario agregado correctamente" });
  }

  async function handleDeleteUser(userDocumentNumber: string) {
    await deleteUser(userDocumentNumber);
    setUsers((prev) => prev.filter((u) => u.userDocumentNumber !== userDocumentNumber));
    setToast({ message: "Usuario eliminado correctamente" });
  }

  async function handleImportCsv(documents: string[]) {
    if (!building?.code) return;
    const newUsers = documents.map((d) => ({ userDocumentNumber: d, buildingCode: building.code }));
    await importUsers(newUsers);
    setUsers((prev) => {
      const existing = new Set(prev.map((u) => u.userDocumentNumber));
      return [...prev, ...newUsers.filter((u) => !existing.has(u.userDocumentNumber))];
    });
    setToast({ message: `${documents.length} usuarios importados correctamente` });
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
    } catch { setToast({ message: "Error al agregar la métrica", type: "error" }); }
    setAddingMetric(false);
  }

  async function handleDeleteMetric(metricId: string) {
    setDeletingMetricId(metricId);
    try { await deleteMetric(metricId); setMetrics((prev) => prev.filter((m) => m.id !== metricId)); setToast({ message: "Métrica eliminada correctamente" }); }
    catch { setToast({ message: "Error al eliminar la métrica", type: "error" }); }
    setDeletingMetricId(null);
  }

  function validateReport(): string | null {
    if (!newReport.month) return "Debes seleccionar un mes y año";
    if (!newReport.title.trim() || newReport.title.trim().length < 5) return "El título debe tener al menos 5 caracteres";
    if (!newReport.topics.trim() || newReport.topics.trim().length < 5) return "Los temas deben tener al menos 5 caracteres";
    if (newReport.pdfUrlInput && !/^https?:\/\//.test(newReport.pdfUrlInput.trim())) return "La URL del PDF debe empezar con https://";
    return null;
  }

  async function handleAddReport() {
    const validationError = validateReport();
    if (validationError) { setReportError(validationError); return; }
    setReportError("");
    setAddingReport(true);
    try {
      const reportId = await createReportRepo({
        month: newReport.month.trim(), title: newReport.title.trim(),
        status: "Auditado", topics: newReport.topics.trim(),
        pdfUrl: newReport.pdfUrlInput?.trim() || undefined,
        createdAt: new Date(), buildingCode: building.code!,
      });
      setReports((prev) => [...prev, { id: reportId, month: newReport.month.trim(), title: newReport.title.trim(), status: "Auditado", topics: newReport.topics.trim(), pdfUrl: newReport.pdfUrlInput?.trim() || undefined, createdAt: new Date() }]);
      setNewReport({ month: "", title: "", status: "Auditado", topics: "", pdfUrlInput: "", createdAt: new Date() });
      setToast({ message: "Reporte agregado correctamente" });
    } catch { setToast({ message: "Error al agregar el reporte", type: "error" }); }
    setAddingReport(false);
  }

  async function handleDeleteReport(reportId: string) {
    setDeletingReportId(reportId);
    try { await deleteReport(reportId); setReports((prev) => prev.filter((r) => r.id !== reportId)); setToast({ message: "Reporte eliminado correctamente" }); }
    catch { setToast({ message: "Error al eliminar el reporte", type: "error" }); }
    setDeletingReportId(null);
  }

  async function handleDeleteBuilding() {
    if (!id) return;
    setDeleting(true);
    try { await deleteBuilding(id); navigate(ROUTES.PANEL_BUILDINGS, { state: { toast: "Edificio eliminado" } }); }
    catch { setShowError(true); }
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
    `flex-1 flex items-center justify-center gap-0 sm:gap-2 px-1 sm:px-4 py-3 text-[11px] sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
      activeTab === tab ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
    }`;

  const previewMetrics: IMetric[] = metrics.map((m) => ({
    title: m.title,
    value: m.value,
    subtitle: m.subtitle,
    icon: iconMap[m.icon],
  }));

  const previewReports: IReportData[] = reports.map((r) => ({
    id: r.id || "",
    month: r.month,
    title: r.title,
    status: r.status,
    topics: r.topics,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button onClick={() => navigate(ROUTES.PANEL_BUILDINGS)} className="flex items-center gap-2 text-sm text-slate-500 mb-6 hover:text-slate-900 transition-colors"><ArrowLeft className="w-4 h-4" /> Volver a edificios</button>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Editar edificio</h1>

      <div className="mt-8 border-b border-slate-200 flex overflow-x-auto">
        <button onClick={() => setActiveTab("info")} className={tabClass("info")}><Building2 className="w-4 h-4" /> Información</button>
        <button onClick={() => setActiveTab("users")} className={tabClass("users")}><Users className="w-4 h-4" /> Usuarios</button>
        <button onClick={() => setActiveTab("metrics")} className={tabClass("metrics")}><BarChart3 className="w-4 h-4" /> Métricas</button>
        <button onClick={() => setActiveTab("reports")} className={tabClass("reports")}><FileText className="w-4 h-4" /> Reportes</button>
      </div>

      <div className="mt-6 max-w-4xl mx-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
        {activeTab === "info" && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nombre del edificio *</label>
              <input type="text" value={name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Ej: CONJUNTO RESIDENCIAL LOS ALAMOS" className={`w-full px-4 py-3 rounded-xl outline-none transition-all bg-white text-slate-900 focus:border-primary uppercase ${showError ? "border-danger" : "border-slate-300"}`} />
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
          <div className="space-y-8">
            {/* Add form with live preview */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <p className="font-bold text-slate-900 mb-3">Agregar métrica</p>

              {/* Live preview */}
              <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Vista previa en vivo</p>
                <div className="max-w-xs mx-auto">
                  <MetricCard
                    metric={{
                      title: newMetric.title || "TÍTULO",
                      value: newMetric.value || "$ 0",
                      subtitle: newMetric.subtitle || "SUBTÍTULO",
                      icon: (newMetric.title || newMetric.value ? iconMap[newMetric.icon] : iconMap["Wallet"]),
                    }}
                    index={0}
                  />
                </div>
              </div>

              {metricError && (
                <div className="mb-3 p-3 rounded-lg text-sm flex items-center gap-2 bg-danger/10 text-danger">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {metricError}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <input type="text" value={newMetric.title} onChange={(e) => { setNewMetric((prev) => ({ ...prev, title: e.target.value.toUpperCase() })); setMetricError(""); }} placeholder="TÍTULO *" maxLength={50} className="uppercase px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary bg-white text-slate-900" />
                <input type="text" value={newMetric.value} onChange={(e) => { setNewMetric((prev) => ({ ...prev, value: formatCurrency(e.target.value) })); setMetricError(""); }} placeholder="$ *" className="px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary bg-white text-slate-900" />
                <input type="text" value={newMetric.subtitle} onChange={(e) => { setNewMetric((prev) => ({ ...prev, subtitle: e.target.value.toUpperCase() })); setMetricError(""); }} placeholder="SUBTÍTULO *" maxLength={60} className="uppercase px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary bg-white text-slate-900" />
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Icono</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {METRIC_ICONS.map((iconName) => {
                  const IconComponent = iconMap[iconName];
                  const isSelected = newMetric.icon === iconName;
                  return (
                    <button key={iconName} type="button" onClick={() => setNewMetric((prev) => ({ ...prev, icon: iconName }))}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all border-2 ${isSelected ? "border-primary bg-primary/10 text-primary" : "border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600"}`} title={iconName}>
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-center">
                <Button variant="primary" leftIcon={Plus} onClick={handleAddMetric} loading={addingMetric} disabled={!newMetric.title || !newMetric.value}>Agregar</Button>
              </div>
            </div>

            {/* Created metrics */}
            <div className="max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Métricas creadas ({previewMetrics.length})</p>
              {previewMetrics.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {previewMetrics.map((metric, index) => (
                    <div key={index} className="relative group">
                      <MetricCard metric={metric} index={index} />
                      <button onClick={() => metrics[index]?.id && handleDeleteMetric(metrics[index].id!)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1.5 shadow border border-slate-200 text-slate-400 hover:text-danger">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 text-center py-8">No hay métricas registradas.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="space-y-8">
            {/* Add form with live preview */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <p className="font-bold text-slate-900 mb-3">Agregar reporte</p>

              {/* Live preview */}
              <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Vista previa en vivo</p>
                <div className="max-w-sm mx-auto">
                    <ReportCard
                    report={{
                      id: "preview",
                      month: newReport.month || "MES AÑO",
                      title: newReport.title || "TÍTULO DEL REPORTE",
                      status: "Auditado",
                      topics: newReport.topics || "TEMAS ABORDADOS",
                    }}
                    index={0}
                    onDownload={() => {}}
                  />
                </div>
              </div>

              {reportError && (
                <div className="mb-3 p-3 rounded-lg text-sm flex items-center gap-2 bg-danger/10 text-danger">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {reportError}
                </div>
              )}
              <div className="space-y-3 mb-3">
                <div className="flex gap-2">
                  <select
                    value={newReport.month ? newReport.month.split(" ")[0] : ""}
                    onChange={(e) => {
                      const month = e.target.value;
                      const year = newReport.month?.split(" ")[1] || "";
                      setNewReport((prev) => ({ ...prev, month: month ? `${month} ${year}` : "" }));
                      setReportError("");
                    }}
                    className={`flex-1 px-3 py-2.5 rounded-lg border text-sm outline-none focus:border-primary bg-white font-semibold uppercase ${newReport.month ? "text-slate-900 border-slate-200" : "text-slate-400 border-slate-200"}`}
                  >
                    <option value="">SELECCIONA UN MES</option>
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select
                    value={newReport.month ? newReport.month.split(" ")[1] || "" : ""}
                    onChange={(e) => {
                      const year = e.target.value;
                      const month = newReport.month?.split(" ")[0] || "";
                      setNewReport((prev) => ({ ...prev, month: year ? `${month} ${year}` : "" }));
                      setReportError("");
                    }}
                    className={`w-28 px-3 py-2.5 rounded-lg border text-sm outline-none focus:border-primary bg-white font-semibold ${newReport.month ? "text-slate-900 border-slate-200" : "text-slate-400 border-slate-200"}`}
                  >
                    <option value="">AÑO</option>
                    {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <input type="text" value={newReport.title} onChange={(e) => { setNewReport((prev) => ({ ...prev, title: e.target.value.toUpperCase() })); setReportError(""); }} placeholder="TÍTULO *" maxLength={80} className="w-full uppercase px-3 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary bg-white text-slate-900" />
                <input type="text" value={newReport.topics} onChange={(e) => { setNewReport((prev) => ({ ...prev, topics: e.target.value.toUpperCase() })); setReportError(""); }} placeholder="DESCRIPCIÓN *" maxLength={120} className="w-full uppercase px-3 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary bg-white text-slate-900" />
                <div>
                  <input type="url" value={newReport.pdfUrlInput || ""} onChange={(e) => { setNewReport((prev) => ({ ...prev, pdfUrlInput: e.target.value })); setReportError(""); }} placeholder="Link del PDF (Google Drive, Dropbox, etc.)" className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary bg-white text-slate-900" />
                </div>
                <div className="flex justify-center">
                  <Button variant="primary" leftIcon={Plus} onClick={handleAddReport} loading={addingReport} disabled={!newReport.month || !newReport.title || !newReport.topics}>Agregar</Button>
                </div>
              </div>
            </div>

            {/* Created reports */}
            <div className="max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Reportes creados ({previewReports.length})</p>
              {previewReports.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {previewReports.map((report, index) => (
                    <div key={index} className="relative group">
                      <ReportCard report={report} index={index} onDownload={(r) => reports[index]?.pdfUrl ? downloadPdf(reports[index].pdfUrl!, `${r.month}-${r.title}.pdf`) : setToast({ message: "No hay PDF disponible para este reporte", type: "error" })} />
                      <button onClick={() => reports[index]?.id && handleDeleteReport(reports[index].id!)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1.5 shadow border border-slate-200 text-slate-400 hover:text-danger z-10">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 text-center py-8">No hay reportes registrados.</p>
              )}
            </div>
          </div>
        )}
          </motion.div>
      </div>

      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Eliminar edificio" message="¿Estás seguro de eliminar este edificio? Esta acción no se puede deshacer. Todos los usuarios y datos asociados se perderán." confirmLabel="Sí, eliminar" variant="danger" loading={deleting} onConfirm={handleDeleteBuilding} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
