import { motion } from "framer-motion";
import { CalendarDays, ShieldCheck, Download } from "lucide-react";
import type { IReportData } from "../interfaces/reports-section.interface";
import { downloadPdf } from "../../../../../db/repositories/report.repository";

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
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-lg text-slate-500 bg-slate-100">
            <CalendarDays className="w-4 h-4" />
            {report.month}
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-50 border border-primary-200 text-primary-dark">
            <ShieldCheck className="w-3.5 h-3.5" />
            {report.status}
          </span>
        </div>
        <h3 className="font-bold text-xl mb-3 leading-snug transition-colors text-slate-900">
          {report.title}
        </h3>
        <p className="text-sm leading-relaxed mb-6 text-slate-600">
          <strong className="text-slate-900">Enfoque de auditoría:</strong>{" "}
          {report.topics}.
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          if (onDownload) onDownload(report);
          else downloadPdf("", `${report.month}-${report.title}.pdf`);
        }}
        className="w-full flex items-center justify-center gap-2 font-semibold py-3 px-5 rounded-xl transition-colors mt-4 bg-slate-900 text-white hover:bg-slate-800"
      >
        <Download className="w-5 h-5" />
        Descargar PDF Oficial
      </button>
    </motion.div>
  );
};

export default ReportCard;
