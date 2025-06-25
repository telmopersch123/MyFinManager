import { $Enums } from "@prisma/client";

// Interface que simula $TransactionPayload com amount como number
export interface ClientTransaction {
  id: string;
  name: string;
  type: $Enums.TransactionType;
  amount: number; // Alterado de Prisma.Decimal para number
  category: $Enums.TransactionCategory;
  paymentMethod: $Enums.TransactionPaymentMethod;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
