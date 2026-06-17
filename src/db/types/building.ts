export interface Building {
  id: string;
  code: string;
  slug: string;
  name: string;
  createdAt: Date;
  data: Record<string, any>;
}
