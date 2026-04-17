import React from "react";
import MetricCard, { IMetric } from "./components/MetricCard";
import { Wallet } from "lucide-react";

export interface IMetricsSectionProps {
  title: string;
  subtitle: string;
  metrics: IMetric[];
  showSensitiveData: boolean;
  onToggleSensitive: () => void;
}

export const MetricsSection: React.FC<IMetricsSectionProps> = ({
  title,
  subtitle,
  metrics,
}) => {
  return (
    <section>
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 tracking-tight">
            <Wallet className="w-8 h-8 text-emerald-600" />
            {title}
          </h2>
          <p className="text-slate-500 mt-2 text-lg">{subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <MetricCard key={idx} metric={metric} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default MetricsSection;
