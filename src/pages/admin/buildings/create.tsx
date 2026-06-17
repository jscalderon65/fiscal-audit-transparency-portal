import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle, ArrowLeft, Upload, FileText, Check, Plus, X,
  Wallet, PiggyBank, HardHat, Building2,
  DollarSign, TrendingUp, TrendingDown, BarChart3,
  PieChart, CreditCard, Landmark, Calculator,
  Percent, ArrowUpRight, ArrowDownRight, Scale,
  ClipboardList, FileText as FileTextIcon, Receipt, Banknote,
} from "lucide-react";
import { Text } from "../../../ui/Typography";
import Button from "../../../ui/Button";
import { ROUTES } from "../../../constants/routes";
import { slugify } from "../../../helpers/slug";
import { parseUserDocuments, formatCurrency } from "../../../helpers/parseDocuments";
import { createBuilding, generateCode } from "../../../db/repositories/building.repository";
import { importUsers } from "../../../db/repositories/user.repository";
import { createMetric } from "../../../db/repositories/metric.repository";
import { createReport } from "../../../db/repositories/report.repository";
import type { BuildingMetric } from "../../../db/types/metric";
import type { BuildingReport } from "../../../db/types/report";
import type { LucideIcon } from "lucide-react";
import MetricCard from "../../../pages/user/components/metrics/components/MetricCard";
import type { IMetric } from "../../../pages/user/components/metrics/components/MetricCard";

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
  ClipboardList, FileText: FileTextIcon, Receipt, Banknote,
};

const MONTHS = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"] as const;
const YEARS = Array.from({ length: 11 }, (_, i) => (2020 + i).toString());

const emptyMetric = (): BuildingMetric => ({
  title: "", value: "", subtitle: "", icon: "Wallet", order: 0,
});

const emptyReport = (): BuildingReport & { pdfUrlInput?: string } => ({
  month: "", title: "", status: "Auditado", topics: "", pdfUrlInput: "", createdAt: new Date(),
});

export default function CreateBuilding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [name, setName] = useState("");
  const [showError, setShowError] = useState(false);
  const [creating, setCreating] = useState(false);
  const [pendingDocuments, setPendingDocuments] = useState<string[]>([]);
  const [csvStatus, setCsvStatus] = useState<{ type: "ok" | "warn"; message: string } | null>(null);
  const [pendingMetrics, setPendingMetrics] = useState<BuildingMetric[]>([]);
  const [pendingReports, setPendingReports] = useState<(BuildingReport & { file?: File })[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleNameChange(value: string) {
    setName(value.toUpperCase());
    if (showError) setShowError(false);
  }

  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvStatus(null);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const { valids, invalids } = parseUserDocuments(text);
      if (valids.length === 0) { setCsvStatus({ type: "warn", message: "No se encontraron cédulas válidas en el archivo." }); setPendingDocuments([]); return; }
      setPendingDocuments(valids);
      setCsvStatus({ type: "ok", message: `${valids.length} cédulas válidas encontradas${invalids > 0 ? `, ${invalids} ignoradas` : ""}.` });
    };
    reader.readAsText(file);
    if (fileRef.current) fileRef.current.value = "";
  }

  function clearCsv() { setPendingDocuments([]); setCsvStatus(null); }

  function addMetric() { setPendingMetrics((prev) => [...prev, { ...emptyMetric(), order: prev.length }]); }
  function updateMetric(index: number, field: keyof BuildingMetric, value: string | number) {
    setPendingMetrics((prev) => prev.map((m, i) => (i === index ? { ...m, [field]: value } : m)));
  }
  function removeMetric(index: number) { setPendingMetrics((prev) => prev.filter((_, i) => i !== index)); }

  function addReport() { setPendingReports((prev) => [...prev, emptyReport()]); }
  function updateReport(index: number, field: keyof (BuildingReport & { pdfUrlInput?: string }), value: any) {
    setPendingReports((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  }
  function removeReport(index: number) { setPendingReports((prev) => prev.filter((_, i) => i !== index)); }

  async function handleSave() {
    const code = generateCode();
    const slug = slugify(name);
    setCreating(true);
    try {
      await createBuilding({ code, slug, name, createdAt: new Date(), data: {} });
      if (pendingDocuments.length > 0) await importUsers(pendingDocuments.map((doc) => ({ userDocumentNumber: doc, buildingCode: code })));
      for (const metric of pendingMetrics) { if (metric.title && metric.value) await createMetric({ ...metric, buildingCode: code }); }
      for (const report of pendingReports) {
        if (report.month && report.title) {
          await createReport({
            month: report.month, title: report.title, status: report.status,
            topics: report.topics, pdfUrl: report.pdfUrlInput?.trim() || undefined,
            createdAt: new Date(), buildingCode: code,
          });
        }
      }
      navigate(ROUTES.PANEL_BUILDINGS, { state: { toast: "Edificio creado correctamente" } });
    } catch { setShowError(true); }
    setCreating(false);
  }

  const stepCircle = (num: number, label: string, active: boolean, completed: boolean) => (
    <div className={`flex items-center gap-2 text-sm font-semibold ${active ? "text-primary" : "text-slate-400"}`}>
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${completed || active ? "bg-primary text-white" : "bg-slate-200 text-slate-500"}`}>
        {completed ? <Check className="w-3.5 h-3.5" /> : num}
      </span>
      <span className="hidden sm:inline">{label}</span>
    </div>
  );

  const stepLine = (active: boolean) => <div className={`flex-1 h-px ${active ? "bg-primary" : "bg-slate-200"}`} />;

  const previewMetrics: IMetric[] = pendingMetrics.map((m) => ({ title: m.title, value: m.value, subtitle: m.subtitle, icon: iconMap[m.icon] }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button onClick={() => navigate(ROUTES.PANEL_BUILDINGS)} className="flex items-center gap-2 text-sm text-slate-500 mb-6 hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Volver a edificios
      </button>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Crear edificio</h1>
      <Text className="text-slate-500">Registra un nuevo conjunto residencial en el portal de transparencia.</Text>

      <div className="mt-8 flex items-center gap-2 sm:gap-3">
        {stepCircle(1, "Información", step === 1, step > 1)}
        {stepLine(step >= 2)}
        {stepCircle(2, "Residentes", step === 2, step > 2)}
        {stepLine(step >= 3)}
        {stepCircle(3, "Métricas", step === 3, step > 3)}
        {stepLine(step >= 4)}
        {stepCircle(4, "Reportes", step === 4, step > 4)}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.15 }}
        >

      {/* Step 1: Información */}
      {step === 1 && (
        <div className="mt-8 space-y-6 max-w-2xl mx-auto">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nombre del edificio *</label>
            <input type="text" value={name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Ej: CONJUNTO RESIDENCIAL LOS ALAMOS" className={`w-full px-4 py-3 rounded-xl outline-none transition-all bg-white text-slate-900 focus:border-primary uppercase ${showError ? "border-danger" : "border-slate-300"}`} />
            {showError && <div className="mt-2 flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5 text-danger" /><span className="text-sm text-danger">El nombre debe tener al menos 3 caracteres</span></div>}
          </div>
          <div className="flex justify-end">
            <Button variant="primary" onClick={() => { if (name.trim().length < 3) setShowError(true); else setStep(2); }} disabled={name.trim().length < 3}>Siguiente →</Button>
          </div>
        </div>
      )}

      {/* Step 2: Residentes */}
      {step === 2 && (
        <div className="mt-8 space-y-6 max-w-2xl mx-auto">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
              Importar residentes <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Opcional</span>
            </h3>
            <Text className="text-slate-500 text-sm mb-4">Sube un archivo CSV o TXT con las cédulas de los residentes. Una cédula por línea o en la primera columna. Solo números.</Text>
            <div className="flex flex-wrap items-center gap-3">
              <input ref={fileRef} type="file" accept=".csv,.txt" onChange={handleFileSelected} className="hidden" />
              <Button variant="outline" leftIcon={Upload} onClick={() => fileRef.current?.click()}>Seleccionar archivo</Button>
              {pendingDocuments.length > 0 && <button onClick={clearCsv} className="text-sm text-slate-400 hover:text-slate-600 transition-colors">Limpiar</button>}
            </div>
            {csvStatus && <div className="mt-3 flex items-center gap-1.5 text-sm"><FileText className="w-4 h-4 shrink-0" /><span className={csvStatus.type === "ok" ? "text-primary font-medium" : "text-danger font-medium"}>{csvStatus.message}</span></div>}
          </div>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setStep(1)}>← Anterior</Button>
            <Button variant="primary" onClick={() => setStep(3)}>Siguiente →</Button>
          </div>
        </div>
      )}

      {/* Step 3: Métricas */}
      {step === 3 && (
        <div className="mt-8 space-y-8">
          {previewMetrics.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Vista previa — cómo lo verán los residentes</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {previewMetrics.map((metric, index) => (
                  <div key={index} className="relative group">
                    <MetricCard metric={metric} index={index} />
                    <button onClick={() => removeMetric(index)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1.5 shadow border border-slate-200 text-slate-400 hover:text-danger">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-2xl mx-auto">
            <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
              Agregar métricas <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Opcional</span>
            </h3>

            {pendingMetrics.map((metric, index) => (
              <div key={index} className="mb-4 p-4 rounded-xl bg-slate-50 border border-slate-200 relative">
                <button onClick={() => removeMetric(index)} className="absolute top-3 right-3 text-slate-400 hover:text-danger transition-colors"><X className="w-4 h-4" /></button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                  <input type="text" value={metric.title} onChange={(e) => updateMetric(index, "title", e.target.value.toUpperCase())} placeholder="TÍTULO" maxLength={50} className="uppercase px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary bg-white text-slate-900" />
                  <input type="text" value={metric.value} onChange={(e) => updateMetric(index, "value", formatCurrency(e.target.value))} placeholder="$" className="px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary bg-white text-slate-900" />
                  <input type="text" value={metric.subtitle} onChange={(e) => updateMetric(index, "subtitle", e.target.value.toUpperCase())} placeholder="SUBTÍTULO" maxLength={60} className="uppercase px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary bg-white text-slate-900" />
                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">ICONO</p>
                    <div className="flex flex-wrap gap-1.5">
                      {METRIC_ICONS.map((iconName) => {
                        const IconComponent = iconMap[iconName];
                        const isSelected = metric.icon === iconName;
                        return (
                          <button key={iconName} type="button" onClick={() => updateMetric(index, "icon", iconName)}
                            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all border-2 ${isSelected ? "border-primary bg-primary/10 text-primary" : "border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600"}`} title={iconName}>
                            {IconComponent && <IconComponent className="w-4 h-4" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button variant="outline" leftIcon={Plus} onClick={addMetric}>Agregar métrica</Button>
          </div>

          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <Button variant="ghost" onClick={() => setStep(2)}>← Anterior</Button>
            <Button variant="primary" onClick={() => setStep(4)}>Siguiente →</Button>
          </div>
        </div>
      )}

      {/* Step 4: Reportes */}
      {step === 4 && (
        <div className="mt-8 space-y-8">
          {pendingReports.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Vista previa — cómo lo verán los residentes</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingReports.map((report, index) => (
                  <div key={index} className="relative group">
                    <div className="rounded-2xl p-6 shadow-sm bg-white border border-slate-200">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-lg text-slate-500 bg-slate-100"><FileText className="w-4 h-4" />{report.month}</div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-50 border border-primary-200 text-primary-dark"><Check className="w-3.5 h-3.5" />{report.status}</span>
                      </div>
                      <h3 className="font-bold text-xl mb-3 leading-snug text-slate-900">{report.title}</h3>
                      <p className="text-sm leading-relaxed mb-6 text-slate-600"><strong className="text-slate-900">Enfoque de auditoría:</strong> {report.topics}.</p>
                    </div>
                    <button onClick={() => removeReport(index)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1.5 shadow border border-slate-200 text-slate-400 hover:text-danger z-10"><X className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-2xl mx-auto">
            <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
              Agregar reportes <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Opcional</span>
            </h3>

            {pendingReports.map((report, index) => (
              <div key={index} className="mb-4 p-4 rounded-xl bg-slate-50 border border-slate-200 relative">
                <button onClick={() => removeReport(index)} className="absolute top-3 right-3 text-slate-400 hover:text-danger transition-colors"><X className="w-4 h-4" /></button>
                <div className="space-y-3 pr-8">
                  <div className="flex gap-2">
                    <select value={report.month ? report.month.split(" ")[0] : ""} onChange={(e) => { const m = e.target.value; const y = report.month?.split(" ")[1] || ""; updateReport(index, "month", m ? `${m} ${y}` : ""); }} className={`flex-1 px-3 py-2.5 rounded-lg border text-sm outline-none focus:border-primary bg-white font-semibold uppercase ${report.month ? "text-slate-900 border-slate-200" : "text-slate-400 border-slate-200"}`}>
                      <option value="">SELECCIONA UN MES</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select value={report.month ? report.month.split(" ")[1] || "" : ""} onChange={(e) => { const y = e.target.value; const m = report.month?.split(" ")[0] || ""; updateReport(index, "month", y ? `${m} ${y}` : ""); }} className={`w-28 px-3 py-2.5 rounded-lg border text-sm outline-none focus:border-primary bg-white font-semibold ${report.month ? "text-slate-900 border-slate-200" : "text-slate-400 border-slate-200"}`}>
                      <option value="">AÑO</option>
                      {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <input type="text" value={report.title} onChange={(e) => updateReport(index, "title", e.target.value.toUpperCase())} placeholder="TÍTULO *" maxLength={80} className="w-full uppercase px-3 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary bg-white text-slate-900" />
                  <input type="text" value={report.topics} onChange={(e) => updateReport(index, "topics", e.target.value.toUpperCase())} placeholder="DESCRIPCIÓN *" maxLength={120} className="w-full uppercase px-3 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary bg-white text-slate-900" />
                  <div>
                    <input type="url" value={report.pdfUrlInput || ""} onChange={(e) => updateReport(index, "pdfUrlInput", e.target.value)} placeholder="Link del PDF (Google Drive, Dropbox, etc.)" className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary bg-white text-slate-900" />
                  </div>
                </div>
              </div>
            ))}

            <Button variant="outline" leftIcon={Plus} onClick={addReport}>Agregar reporte</Button>
          </div>

          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <Button variant="ghost" onClick={() => setStep(3)}>← Anterior</Button>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate(ROUTES.PANEL_BUILDINGS)}>Cancelar</Button>
              <Button variant="primary" loading={creating} onClick={handleSave}>Guardar edificio</Button>
            </div>
          </div>
        </div>
      )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
