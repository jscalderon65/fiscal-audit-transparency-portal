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
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex gap-2 min-w-0">
            {Icon && (
              <div className="mt-1 shrink-0">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
            )}
            <div className="h-[2.5rem] sm:h-[3.25rem] overflow-hidden">
              <span className="font-bold text-sm sm:text-lg leading-tight text-slate-900 line-clamp-2" title={title}>
                {title}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex flex-col justify-center">
          <div className="text-[11px] sm:text-sm md:text-lg lg:text-2xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap overflow-hidden text-ellipsis" title={`${value}`}>
            {value}
          </div>
        </div>
        <div className="flex flex-col justify-center mt-0.5 sm:mt-1">
          <div className="text-[10px] sm:text-xs md:text-sm font-medium text-slate-500 truncate" title={subtitle}>
            {subtitle}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;
