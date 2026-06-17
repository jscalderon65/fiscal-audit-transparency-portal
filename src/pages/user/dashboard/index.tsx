import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Building2, Wallet, PiggyBank, HardHat, ShieldCheck,
  DollarSign, TrendingUp, TrendingDown, BarChart3,
  PieChart, CreditCard, Landmark, Calculator,
  Percent, ArrowUpRight, ArrowDownRight, Scale,
  ClipboardList, FileText, Receipt, Banknote,
} from "lucide-react";
import Footer from "../../../ui/Footer";
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
}

export const UserDashboard = () => {
  const { buildingCode } = useParams<{ buildingCode: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [metrics, setMetrics] = useState<BuildingMetric[]>([]);
  const [reports, setReports] = useState<BuildingReport[]>([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("session");
    if (!raw) {
      navigate(`/user/${buildingCode}/login`, { replace: true });
      return;
    }
    const parsed: Session = JSON.parse(raw);
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
      alert("No hay PDF disponible para este reporte.");
    }
  };

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
        <MetricsSection
          title="Métricas Financieras"
          subtitle="Saldos reales de las cuentas del conjunto (Expresados en COP)."
          metrics={mappedMetrics}
        />

        <ReportsSection
          title="Reportes"
          subtitle="Acceso directo a las auditorías mensuales presentadas al Consejo."
          reports={mappedReports}
          onDownload={handleDownloadReport}
        />

        <section className="pb-16">
          <ContactForm />
        </section>
      </main>

      <Footer
        year={new Date().getFullYear()}
        portalName="Portal de Transparencia"
        residentialName={building.name}
      />
    </div>
  );
};

export default UserDashboard;
