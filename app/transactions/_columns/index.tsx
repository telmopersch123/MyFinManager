"use client";

import {
  transactionCategoryMap,
  transactionPaymentMap,
} from "@/app/_constants/transactions";
import { ColumnDef } from "@tanstack/react-table";
import EditTransactionButton from "../_components/edit-transaction-button";
import RemoveTransactionButton from "../_components/remove-transaction-button";
import TransactionTypeBadge from "../_components/type-badge";
import { ClientTransaction } from "./schema";

export function transactionsColumns(
  month: string,
  handleMessage: (message: string, color: string) => void,
  handleFunctionAlert: () => void,
  hasPremiumPlan: boolean,
): ColumnDef<ClientTransaction>[] {
  return [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row: { original: transaction } }) => (
        <TransactionTypeBadge transaction={transaction} />
      ),
    },
    {
      accessorKey: "category",
      header: "Categoria",
      cell: ({ row: { original: transaction } }) =>
        transactionCategoryMap[
          transaction.category as keyof typeof transactionCategoryMap
        ],
    },
    {
      accessorKey: "paymentMethod",
      header: "Método de Pagamento",
      cell: ({ row: { original: transaction } }) =>
        transactionPaymentMap[
          transaction.paymentMethod as keyof typeof transactionPaymentMap
        ],
    },
    {
      accessorKey: "date",
      header: "Data",
      cell: ({ row: { original: transaction } }) =>
        new Date(transaction.date).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
    },
    {
      accessorKey: "amount",
      header: "Valor",
      cell: ({ row: { original: transaction } }) => {
        const amount = transaction.amount;
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(amount);
      },
    },
    {
      accessorKey: "actions",
      header: "Ações",
      cell: ({ row: { original: transaction } }) => {
        return (
          <div className="flex items-center justify-center space-x-1">
            <EditTransactionButton
              month={month}
              transaction={transaction}
              handleFunctionAlert={handleFunctionAlert}
              handleMessage={handleMessage}
              hasPremiumPlan={hasPremiumPlan}
            />
            <RemoveTransactionButton
              month={month}
              transaction={transaction}
              handleMessage={handleMessage}
              handleFunctionAlert={handleFunctionAlert}
            />
          </div>
        );
      },
    },
  ];
}
