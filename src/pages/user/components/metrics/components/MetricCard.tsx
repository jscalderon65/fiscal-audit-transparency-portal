import type { LucideIcon } from "lucide-react";
import { Card } from "./Card";

export interface IMetric {
  title: string;
  value: string | number;
  subtitle: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
}

export interface IMetricCardProps {
  metric: IMetric;
  index?: number;
}

const MetricCard: React.FC<IMetricCardProps> = ({ metric, index = 0 }) => {
  const { title, value, subtitle, icon: Icon } = metric;

  return (
    <Card
      delay={index * 0.05}
      className="flex flex-col h-full p-4 border border-slate-200 bg-white"
      hoverEffect={true}
    >
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex gap-3 min-w-0">
            {Icon && (
              <div className="mt-1 shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
            )}
            <span className="font-bold text-lg leading-tight text-slate-900 line-clamp-2" title={title}>
              {title}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="text-2xl font-extrabold tracking-tight text-slate-900 truncate" title={`${value}`}>
          {value}
        </div>
        <div className="text-sm font-medium mt-1 text-slate-500 truncate" title={subtitle}>
          {subtitle}
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;
