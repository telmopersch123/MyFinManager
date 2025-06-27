import { TransactionCategory, TransactionType } from "@prisma/client";

export type TransactionPercentageType = {
  [key in TransactionType]: number;
};

export interface TotalExpenseCategory {
  category: TransactionCategory;
  totalAmount: number;
  percentageOfTotal: number;
}

export interface DashboardData {
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  lastTransaction: Transaction[];
  totalExpensePerCategory: ExpenseCategory[];
  typesPercentage: {
    DEPOSIT: number;
    EXPENSE: number;
    INVESTMENT: number;
  };
}

interface Transaction {
  id: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
  name: string;
  type: "DEPOSIT" | "EXPENSE" | "INVESTMENT";
}

interface ExpenseCategory {
  category: string;
  totalAmount: number;
  percentageOfTotal: number;
}
