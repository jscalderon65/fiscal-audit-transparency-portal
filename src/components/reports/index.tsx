import { motion } from "framer-motion";
import {
  FileCheck,
  ArrowRight,
  CalendarDays,
  ShieldCheck,
  Download,
} from "lucide-react";
import { IReportData } from "./interfaces/reports-section.interface";
import { PALETTE } from "../../constants/theme";
import ReportCard from "./components/ReportCard";

// Props interface moved here per architecture rule: props interfaces must live in the component file
export interface IReportsSectionProps {
  title: string;
  subtitle: string;
  reports: IReportData[];
  onDownload?: (report: IReportData) => void;
}

export const ReportsSection: React.FC<IReportsSectionProps> = ({
  title,
  subtitle,
  reports,
  onDownload,
}) => {
  return (
    <section>
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2
            className="text-3xl font-bold flex items-center gap-3 tracking-tight"
            style={{ color: PALETTE.text.default }}
          >
            <FileCheck
              className="w-8 h-8"
              style={{ color: PALETTE.primary.DEFAULT }}
            />
            {title}
          </h2>
          <p className="mt-2 text-lg" style={{ color: PALETTE.text.muted }}>
            {subtitle}
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {reports.map((report, index) => (
          <ReportCard key={String(report.id)} report={report} index={index} onDownload={onDownload} />
        ))}
      </div>
    </section>
  );
};

export default ReportsSection;
