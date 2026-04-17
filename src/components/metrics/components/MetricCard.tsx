import { LucideIcon } from "lucide-react";
import { Card } from "./Card";

export interface IMetric {
  title: string;
  value: string | number;
  subtitle: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  color?: string;
  bg?: string;
  border?: string;
}

export interface IMetricCardProps {
  metric: IMetric;
  index?: number;
}

const MetricCard: React.FC<IMetricCardProps> = ({ metric, index = 0 }) => {
  const {
    title,
    value,
    subtitle,
    icon: Icon,
    color = "text-slate-600",
    bg = "bg-white",
    border = "border-slate-200",
  } = metric;

  return (
    <Card
      delay={index * 0.05}
      className={`flex flex-col h-full ${bg} ${border} p-4`}
      hoverEffect={true}
    >
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex gap-3">
            {Icon && (
              <div className="mt-1">
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
            )}
            <span className="font-bold text-lg text-slate-900 leading-tight">
              {title}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="text-2xl font-extrabold tracking-tight text-slate-900">
          {value}
        </div>
        <div className="text-slate-500 text-sm font-medium mt-1">
          {subtitle}
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;
