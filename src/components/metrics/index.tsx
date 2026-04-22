import React from "react";
import MetricCard, { IMetric } from "./components/MetricCard";
import { Wallet } from "lucide-react";
import { PALETTE } from "../../constants/theme";

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
          <h2
            className="text-3xl font-bold flex items-center gap-3 tracking-tight"
            style={{ color: PALETTE.text.default }}
          >
            <Wallet
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} index={index} />
        ))}
      </div>
    </section>
  );
};

export default MetricsSection;
