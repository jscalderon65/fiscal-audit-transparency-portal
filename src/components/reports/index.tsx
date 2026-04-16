import React from "react";
import { motion } from "framer-motion";
import {
  FileCheck,
  ArrowRight,
  CalendarDays,
  ShieldCheck,
  Download,
} from "lucide-react";
import { IReportsSectionProps } from "./interfaces/reports-section.interface";

export const ReportsSection: React.FC<IReportsSectionProps> = ({
  title,
  subtitle,
  reports,
  onDownload,
  onViewHistory,
}) => {
  return (
    <section>
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 tracking-tight">
            <FileCheck className="w-8 h-8 text-emerald-600" />
            {title}
          </h2>
          <p className="text-slate-500 mt-2 text-lg">{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onViewHistory}
          className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-2 transition-colors"
        >
          Ver histórico completo <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-lg">
                  <CalendarDays className="w-4 h-4" />
                  {report.month}
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {report.status}
                </span>
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-3 leading-snug group-hover:text-emerald-700 transition-colors">
                {report.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                <strong className="text-slate-900">
                  Enfoque de auditoría:
                </strong>{" "}
                {report.topics}.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onDownload && onDownload(report)}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-emerald-600 text-white font-semibold py-3 px-5 rounded-xl transition-colors mt-4"
            >
              <Download className="w-5 h-5" />
              Descargar PDF Oficial
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ReportsSection;
