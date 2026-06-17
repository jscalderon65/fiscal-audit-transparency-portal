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
      className="flex flex-col p-4 sm:p-5 border border-slate-200 bg-white"
      hoverEffect={true}
    >
      <div className="flex items-center gap-3 mb-3 sm:mb-4">
        {Icon && (
          <div className="shrink-0">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
        )}
        <span className="font-bold text-xs sm:text-sm md:text-base text-slate-900 leading-tight line-clamp-1" title={title}>
          {title}
        </span>
      </div>

      <div className="font-extrabold tracking-tight text-slate-900 text-base sm:text-lg md:text-xl lg:text-2xl mb-0.5 sm:mb-1">
        {value}
      </div>

      <div className="text-[10px] sm:text-xs md:text-sm font-medium text-slate-500 truncate" title={subtitle}>
        {subtitle}
      </div>
    </Card>
  );
};

export default MetricCard;
