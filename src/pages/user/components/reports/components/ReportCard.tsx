import { motion } from "framer-motion";
import { CalendarDays, ShieldCheck, Download } from "lucide-react";
import type { IReportData } from "../interfaces/reports-section.interface";

export interface ReportCardProps {
  report: IReportData;
  index?: number;
  onDownload?: (report: IReportData) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({
  report,
  index = 0,
  onDownload,
}) => {
  return (
    <motion.div
      key={report.id}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="rounded-2xl p-6 shadow-sm transition-all group flex flex-col justify-between bg-white border border-slate-200"
    >
      <div>
        <div className="flex justify-between items-start mb-4 gap-2">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-lg text-slate-500 bg-slate-100 min-w-0">
            <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate" title={report.month}>{report.month}</span>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-primary-50 border border-primary-200 text-primary-dark shrink-0 whitespace-nowrap">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            {report.status}
          </span>
        </div>
        <div className="h-[3rem] sm:h-[3.25rem] overflow-hidden mb-2">
          <h3 className="font-bold text-base sm:text-xl leading-snug text-slate-900 line-clamp-2" title={report.title}>
            {report.title}
          </h3>
        </div>
        <div className="h-[2.5rem] sm:h-[3rem] overflow-hidden mb-3 sm:mb-4">
          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-2" title={report.topics}>
            <strong className="text-slate-900">Enfoque de auditoría:</strong>{" "}
            {report.topics}.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          if (onDownload) onDownload(report);
          else if (report.pdfUrl) window.open(report.pdfUrl, "_blank");
        }}
        className="w-full flex items-center justify-center gap-2 font-semibold py-3 px-5 rounded-xl transition-colors mt-4 bg-slate-900 text-white hover:bg-slate-800 shrink-0"
      >
        <Download className="w-5 h-5 shrink-0" />
        Descargar PDF Oficial
      </button>
    </motion.div>
  );
};

export default ReportCard;
