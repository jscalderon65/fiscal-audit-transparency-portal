import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import {
  Building2, Wallet, PiggyBank, HardHat, ShieldCheck,
  DollarSign, TrendingUp, TrendingDown, BarChart3,
  PieChart, CreditCard, Landmark, Calculator,
  Percent, ArrowUpRight, ArrowDownRight, Scale,
  ClipboardList, FileText, Receipt, Banknote,
} from "lucide-react";
import Footer from "../../../ui/Footer";
import Toast from "../../../ui/Toast";
import { ContactForm } from "../components/contact-form";
import { ReportsSection } from "../components/reports";
import { MetricsSection } from "../components/metrics";
import { Banner } from "../components/banner";
import type { Building } from "../../../db/types/building";
import type { BuildingMetric } from "../../../db/types/metric";
import type { BuildingReport } from "../../../db/types/report";
import { getMetricsByBuildingCode } from "../../../db/repositories/metric.repository";
import { getReportsByBuildingCode, downloadPdf } from "../../../db/repositories/report.repository";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wallet, PiggyBank, HardHat, Building2,
  DollarSign, TrendingUp, TrendingDown, BarChart3,
  PieChart, CreditCard, Landmark, Calculator,
  Percent, ArrowUpRight, ArrowDownRight, Scale,
  ClipboardList, FileText, Receipt, Banknote,
};

interface Session {
  userDocumentNumber: string;
  building: Building;
  expiresAt?: number;
}

export const UserDashboard = () => {
  const { buildingCode } = useParams<{ buildingCode: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [metrics, setMetrics] = useState<BuildingMetric[]>([]);
  const [reports, setReports] = useState<BuildingReport[]>([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("session");
    if (!raw) {
      navigate(`/user/${buildingCode}/login`, { replace: true });
      return;
    }
    const parsed: Session = JSON.parse(raw);
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      localStorage.removeItem("session");
      navigate(`/user/${buildingCode}/login`, { replace: true });
      return;
    }
    if (parsed.building.code !== buildingCode) {
      navigate(`/user/${buildingCode}/login`, { replace: true });
      return;
    }
    setSession(parsed);
  }, [buildingCode, navigate]);

  useEffect(() => {
    if (!buildingCode) return;
    Promise.all([
      getMetricsByBuildingCode(buildingCode),
      getReportsByBuildingCode(buildingCode),
    ]).then(([fetchedMetrics, fetchedReports]) => {
      setMetrics(fetchedMetrics);
      setReports(fetchedReports);
    }).catch(() => {
      setToast?.({ message: "Error al cargar los datos del dashboard", type: "error" });
    }).finally(() => setDashboardLoading(false));
  }, [buildingCode]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin w-8 h-8 rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (dashboardLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-20">
          <div className="animate-pulse space-y-6">
            <div className="h-40 bg-slate-200 rounded-2xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-32 bg-slate-200 rounded-2xl" />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const building = session.building;

  const mappedMetrics = metrics.map((metric) => ({
    title: metric.title,
    value: metric.value,
    subtitle: metric.subtitle,
    icon: iconMap[metric.icon] || Building2,
  }));

  const mappedReports = reports.map((report) => ({
    id: report.id ? parseInt(report.id, 36) % 10000 : Math.random(),
    month: report.month,
    title: report.title,
    status: report.status,
    topics: report.topics,
    pdfUrl: report.pdfUrl,
  }));

  const handleDownloadReport = (report: { month: string; title: string; pdfUrl?: string }) => {
    if (report.pdfUrl) {
      downloadPdf(report.pdfUrl, `${report.month}-${report.title}.pdf`);
    } else {
      setToast({ message: "No hay PDF disponible para este reporte.", type: "error" });
    }
  };

  function handleLogout() {
    localStorage.removeItem("session");
    navigate(`/user/${buildingCode}/login`, { replace: true });
  }

  const bannerInfo = {
    title: building.name,
    subtitle: "Transparencia, Orden y Confianza.",
    badge: "Portal Oficial Validado",
    badgeIcon: ShieldCheck,
  };

  const bannerProfile = {
    initials: "BB",
    name: "Bertha Zaray Bravo",
    role: "Revisora Fiscal Senior",
    description: "Supervisando rigurosamente la gestión financiera de la copropiedad.",
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Banner info={bannerInfo} profile={bannerProfile} />

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-16 space-y-24">
        <div className="flex justify-end -mt-8 mb-4">
          <button onClick={handleLogout} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 transition-colors">
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>

        {mappedMetrics.length === 0 && mappedReports.length === 0 ? (
          <div className="text-center py-12 max-w-lg mx-auto">
            <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-5 bg-slate-100">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-3">Portal de Transparencia</h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Este es el portal oficial de transparencia financiera de tu copropiedad. Aquí se publicarán las métricas financieras, dictámenes de revisoría fiscal y demás información relevante para los copropietarios, una vez sea cargada por la administración.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Mientras tanto, puedes usar el formulario de contacto para comunicarte de forma segura y confidencial con la Revisoría Fiscal.
            </p>
          </div>
        ) : (
          <>
            {mappedMetrics.length > 0 && (
              <MetricsSection
                title="Métricas Financieras"
                subtitle="Saldos reales de las cuentas del conjunto (Expresados en COP)."
                metrics={mappedMetrics}
              />
            )}

            {mappedReports.length > 0 && (
              <ReportsSection
                title="Reportes"
                subtitle="Acceso directo a las auditorías mensuales presentadas al Consejo."
                reports={mappedReports}
                onDownload={handleDownloadReport}
              />
            )}
          </>
        )}

        <section className="pb-16">
          <ContactForm buildingCode={buildingCode} />
        </section>
      </main>

      <Footer year={new Date().getFullYear()} portalName="Portal de Transparencia" residentialName={building.name} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default UserDashboard;
