export interface BuildingReport {
  id?: string;
  month: string;
  title: string;
  status: string;
  topics: string;
  pdfUrl?: string;
  createdAt: Date;
}
