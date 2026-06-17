import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-slate-200 bg-white flex flex-col items-center text-center gap-1.5 sm:gap-2"
    >
      {Icon && (
        <div className="mb-1">
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
        </div>
      )}

      <div className="font-bold text-slate-700 text-sm sm:text-base md:text-lg leading-tight">
        {title}
      </div>

      <div className="font-extrabold tracking-tight text-slate-900 text-base sm:text-lg md:text-xl whitespace-nowrap">
        {value}
      </div>

      <div className="font-medium text-slate-500 text-xs sm:text-sm">
        {subtitle}
      </div>
    </motion.div>
  );
};

export default MetricCard;
