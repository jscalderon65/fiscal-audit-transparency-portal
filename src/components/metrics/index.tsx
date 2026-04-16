import React from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  IMetricsSectionProps,
  IMetricData,
} from "./interfaces/metrics-section.interface";

const MetricCard: React.FC<{
  metric: IMetricData;
  showSensitiveData: boolean;
}> = ({ metric, showSensitiveData }) => (
  <div
    className={`rounded-2xl p-6 border ${metric.border} ${metric.bg} flex flex-col gap-2 shadow-sm`}
  >
    <div className={`flex items-center gap-3 mb-2`}>
      <metric.icon className={`w-7 h-7 ${metric.color}`} />
      <span className="font-bold text-lg text-slate-900">{metric.title}</span>
    </div>
    <div className="text-2xl font-extrabold tracking-tight text-slate-900">
      {showSensitiveData ? metric.value : "••••••••"}
    </div>
    <div className="text-slate-500 text-sm font-medium">{metric.subtitle}</div>
  </div>
);

export const MetricsSection: React.FC<IMetricsSectionProps> = ({
  title,
  subtitle,
  metrics,
  showSensitiveData,
  onToggleSensitive,
}) => {
  return (
    <section>
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 tracking-tight">
            {metrics[0]?.icon &&
              React.createElement(metrics[0].icon, {
                className: "w-8 h-8 text-emerald-600",
              })}
            {title}
          </h2>
          <p className="text-slate-500 mt-2 text-lg">{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onToggleSensitive}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all border ${showSensitiveData ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100" : "bg-slate-900 text-white border-slate-800 hover:bg-slate-800 shadow-md"}`}
        >
          {showSensitiveData ? (
            <>
              <EyeOff className="w-4 h-4" /> Ocultar Valores Sensibles
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" /> Mostrar Valores Reales
            </>
          )}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <MetricCard
            key={idx}
            metric={metric}
            showSensitiveData={showSensitiveData}
          />
        ))}
      </div>
    </section>
  );
};

export default MetricsSection;
