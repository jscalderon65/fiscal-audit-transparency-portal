import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Building2,
  Wallet,
  PiggyBank,
  HardHat,
  ShieldCheck,
} from "lucide-react";
import Footer from "../../../ui/Footer";
import { ContactForm } from "../components/contact-form";
import { ReportsSection } from "../components/reports";
import { MetricsSection } from "../components/metrics";
import { Banner } from "../components/banner";
import type { Building } from "../../../db/types/building";

interface Session {
  userDocumentNumber: string;
  building: Building;
}

export const UserDashboard = () => {
  const { buildingCode } = useParams<{ buildingCode: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

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

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin w-8 h-8 rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const building = session.building;
  const metrics = [
    {
      title: "Excedente Acumulado",
      value: "$ 35.450.000",
      subtitle: "Cierre Fiscal 2025",
      icon: Wallet,
    },
    {
      title: "Recaudo Cuota Extra.",
      value: "$ 487.575.200",
      subtitle: "Fondo Obra Ascensores",
      icon: HardHat,
    },
    {
      title: "Estado de Cartera",
      value: "$ 28.350.000",
      subtitle: "Cartera vencida > 60 días",
      icon: Building2,
    },
    {
      title: "Fondo de Imprevistos",
      value: "$ 42.150.000",
      subtitle: "Cuenta de ahorros (Ley 675)",
      icon: PiggyBank,
    },
  ];

  const reports = [
    {
      id: 1,
      month: "Marzo 2026",
      title: "Dictamen Revisoría Fiscal - Marzo 2026",
      status: "Auditado",
      topics: "Revisión extractos, Cartera y Anticipos de Obra",
    },
    {
      id: 2,
      month: "Febrero 2026",
      title: "Dictamen Revisoría Fiscal - Febrero 2026",
      status: "Auditado",
      topics: "Preparación Asamblea Ordinaria, Cierre 2025",
    },
    {
      id: 3,
      month: "Enero 2026",
      title: "Dictamen Revisoría Fiscal - Enero 2026",
      status: "Auditado",
      topics: "Ejecución Presupuestal Final, Conciliaciones",
    },
    {
      id: 4,
      month: "Diciembre 2025",
      title: "Dictamen Revisoría Fiscal - Diciembre 2025",
      status: "Auditado",
      topics: "Pago de Primas, Mantenimiento Preventivo",
    },
    {
      id: 5,
      month: "Noviembre 2025",
      title: "Dictamen Revisoría Fiscal - Noviembre 2025",
      status: "Auditado",
      topics: "Recaudo Cuota Extraordinaria, Seguros",
    },
    {
      id: 6,
      month: "Octubre 2025",
      title: "Dictamen Revisoría Fiscal - Octubre 2025",
      status: "Auditado",
      topics: "Renovación Póliza Zonas Comunes, Cartera",
    },
  ];

  const handleDownloadReport = () => {
    alert("Descargando PDF del reporte.");
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-primary-200">
      <Banner info={bannerInfo} profile={bannerProfile} />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-16 space-y-24">
        <MetricsSection
          title="Métricas Financieras"
          subtitle="Saldos reales de las cuentas del conjunto (Expresados en COP)."
          metrics={metrics}
        />

        <ReportsSection
          title="Archivo de Dictámenes (2025 - 2026)"
          subtitle="Acceso directo a las auditorías mensuales presentadas al Consejo."
          reports={reports}
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
