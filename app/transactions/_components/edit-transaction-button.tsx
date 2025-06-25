"use client";

import { Button } from "@/app/_components/ui/button";
import UpsertTransactionDialog from "@/app/_components/upsert-transactions-dialog";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { ClientTransaction } from "../_columns/schema";

interface EditTransactionButtonProps {
  month: string;
  transaction: ClientTransaction;
  handleFunctionAlert: () => void;
  handleMessage: (message: string, color: string) => void;
  hasPremiumPlan: boolean;
}

const EditTransactionButton = ({
  month,
  transaction,
  handleFunctionAlert,
  handleMessage,
  hasPremiumPlan,
}: EditTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="bg-zinc-900/30 text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>

      <UpsertTransactionDialog
        month={month}
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...transaction,
          amount: transaction.amount,
          date: new Date(transaction.date),
        }}
        transactionId={transaction.id}
        handleFunctionAlert={handleFunctionAlert}
        handleMessage={handleMessage}
        hasPremiumPlan={hasPremiumPlan}
      />
    </>
  );
};

export default EditTransactionButton;
