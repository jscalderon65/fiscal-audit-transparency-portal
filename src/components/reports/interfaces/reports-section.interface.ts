export interface IReportData {
  id: number | string;
  month: string;
  title: string;
  status: string;
  topics: string;
}

export interface IReportsSectionProps {
  title: string;
  subtitle: string;
  reports: IReportData[];
  onDownload?: (report: IReportData) => void;
  onViewHistory?: () => void;
}
