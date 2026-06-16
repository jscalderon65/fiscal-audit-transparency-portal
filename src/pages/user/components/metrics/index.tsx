import MetricCard, { type IMetric } from "./components/MetricCard";
import { Wallet } from "lucide-react";

export interface IMetricsSectionProps {
  title: string;
  subtitle: string;
  metrics: IMetric[];
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
          <h2 className="text-3xl font-bold flex items-center gap-3 tracking-tight text-slate-900">
            <Wallet className="w-8 h-8 text-primary" />
            {title}
          </h2>
          <p className="mt-2 text-lg text-slate-500">{subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} index={index} />
        ))}
      </div>
    </section>
  );
};

export default MetricsSection;
