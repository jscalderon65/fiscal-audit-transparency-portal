export interface IMetricData {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
}

export interface IMetricsSectionProps {
  title: string;
  subtitle: string;
  metrics: IMetricData[];
  showSensitiveData: boolean;
  onToggleSensitive: () => void;
}
