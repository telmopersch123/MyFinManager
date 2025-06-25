import { TransactionCategory, TransactionType } from "@prisma/client";

export type TransactionPercentageType = {
  [key in TransactionType]: number;
};

export interface TotalExpenseCategory {
  category: TransactionCategory;
  totalAmount: number;
  percentageOfTotal: number;
}
