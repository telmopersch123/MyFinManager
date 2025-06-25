import { Badge } from "@/app/_components/ui/badge";
import { TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";
import { ClientTransaction } from "../_columns/schema";

interface TransactionTypeBadgeProps {
  transaction: ClientTransaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={10}></CircleIcon>
        Depósito
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-danger bg-opacity-10 font-bold text-danger hover:bg-muted">
        <CircleIcon className="mr-2 fill-danger" size={10}></CircleIcon>
        Despesa
      </Badge>
    );
  }
  return (
    <Badge className="bg-muted bg-opacity-10 font-bold text-white hover:bg-muted">
      <CircleIcon className="mr-2 fill-white" size={10}></CircleIcon>
      Investimento
    </Badge>
  );
};
export default TransactionTypeBadge;
