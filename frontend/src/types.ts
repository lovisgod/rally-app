export type TransactionType = "Request" | "Transfer";

export interface Transaction {
  id: string;
  type: TransactionType;
  item: string;
  targetSpace?: string;
  createdAt: Date;
}

export interface Space {
  id: string;
  name: string;
  assignedUsers?: string[];
  transactions: Transaction[];
}