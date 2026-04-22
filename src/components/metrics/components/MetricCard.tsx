import { LucideIcon } from "lucide-react";
import { Card } from "./Card";
import { PALETTE } from "../../../constants/theme";

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
      className={`flex flex-col h-full p-4`}
      hoverEffect={true}
      style={{
        border: `1px solid ${PALETTE.neutral[200]}`,
        backgroundColor: PALETTE.background.surface,
      }}
    >
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex gap-3">
            {Icon && (
              <div className="mt-1">
                <Icon className={`w-6 h-6`} style={{ color: PALETTE.primary.DEFAULT }} />
              </div>
            )}
            <span className="font-bold text-lg leading-tight" style={{ color: PALETTE.text.default }}>
              {title}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="text-2xl font-extrabold tracking-tight" style={{ color: PALETTE.text.default }}>
          {value}
        </div>
        <div className="text-sm font-medium mt-1" style={{ color: PALETTE.text.muted }}>
          {subtitle}
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;
