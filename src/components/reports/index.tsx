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
import { PALETTE } from "../../constants/theme";

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
          <motion.div
            key={report.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="rounded-2xl p-6 shadow-sm transition-all group flex flex-col justify-between"
            style={{
              backgroundColor: PALETTE.background.surface,
              border: `1px solid ${PALETTE.neutral[200]}`,
            }}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-lg"
                  style={{
                    color: PALETTE.text.muted,
                    backgroundColor: PALETTE.neutral[100],
                  }}
                >
                  <CalendarDays className="w-4 h-4" />
                  {report.month}
                </div>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: PALETTE.primary.shade50,
                    border: `1px solid ${PALETTE.primary.shade200}`,
                    color: PALETTE.primary.shade700,
                  }}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {report.status}
                </span>
              </div>
              <h3
                className="font-bold text-xl mb-3 leading-snug transition-colors"
                style={{ color: PALETTE.text.default }}
              >
                {report.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: PALETTE.neutral[600] }}
              >
                <strong style={{ color: PALETTE.text.default }}>
                  Enfoque de auditoría:
                </strong>{" "}
                {report.topics}.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onDownload && onDownload(report)}
              className="w-full flex items-center justify-center gap-2 font-semibold py-3 px-5 rounded-xl transition-colors mt-4"
              style={{
                backgroundColor: PALETTE.neutral[900],
                color: PALETTE.text.inverted,
              }}
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
