import { FileCheck } from "lucide-react";
import type { IReportData } from "./interfaces/reports-section.interface";
import ReportCard from "./components/ReportCard";

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
          <h2 className="text-xl sm:text-3xl font-bold flex items-center gap-3 tracking-tight text-slate-900">
            <FileCheck className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            {title}
          </h2>
          <p className="mt-2 text-sm sm:text-lg text-slate-500">{subtitle}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {reports.map((report, index) => (
          <ReportCard
            key={String(report.id)}
            report={report}
            index={index}
            onDownload={onDownload}
          />
        ))}
      </div>
    </section>
  );
};

export default ReportsSection;
