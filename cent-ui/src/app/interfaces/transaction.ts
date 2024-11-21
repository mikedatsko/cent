export interface Transaction {
  id?: string;
  sourceId: string;
  categoryId: string;
  type: string;
  name: string;
  date: string;
  value: number;
  currency: string;
  rate: number;
}
