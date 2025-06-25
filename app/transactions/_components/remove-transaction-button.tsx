"use client";

import { Button } from "@/app/_components/ui/button";
import { TrashIcon } from "lucide-react";

import { useState, useTransition } from "react";
import { mutate } from "swr";
import { ClientTransaction } from "../_columns/schema";
import Alert_Dialog from "./components/alert-dialog";

interface DashboardData {
  dashboard: {
    lastTransaction: ClientTransaction[];
  };
}

interface RemoveTransactionButtonProps {
  month: string;
  transaction: ClientTransaction;
  handleMessage: (message: string, color: string) => void;
  handleFunctionAlert: () => void;
}

const RemoveTransactionButton = ({
  month,
  transaction,
  handleMessage,
  handleFunctionAlert,
}: RemoveTransactionButtonProps) => {
  const [isPending] = useTransition();
  const [, setOkState] = useState(false);
  const [open, setOpen] = useState<{ type: string; isOpen: boolean }>({
    type: "",
    isOpen: false,
  });

  const handleRemove = async () => {
    try {
      const res = await fetch(`/api/transactions/${transaction.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setOkState(true);
        mutate(
          `/api/dashboard?month=${month}`,
          (currentData?: DashboardData) => {
            if (!currentData?.dashboard?.lastTransaction) {
              return currentData;
            }
            const updatedTransactions =
              currentData.dashboard.lastTransaction.filter(
                (t) => t.id !== transaction.id,
              );
            return {
              ...currentData,
              dashboard: {
                ...currentData.dashboard,
                lastTransaction: updatedTransactions,
              },
            };
          },
          { revalidate: false },
        );

        return true;
      }
      setOkState(false);
      return false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      setOkState(false);
      return false;
    }
  };

  const handleConfirm = async () => {
    const success = await handleRemove();
    handleMessage(
      success
        ? "Transação removida com sucesso."
        : "Erro ao remover transação.",
      success ? "green" : "red",
    );
    if (success && handleFunctionAlert) {
      handleFunctionAlert();
    }
    setOpen({ type: "", isOpen: false });
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="bg-zinc-900/30 text-muted-foreground"
        onClick={() => {
          setOpen({ type: "alert-1", isOpen: true });
        }}
        disabled={isPending}
      >
        <TrashIcon className={isPending ? "animate-pulse" : ""} />
      </Button>
      <Alert_Dialog
        open={open}
        setOpen={setOpen}
        handleConfirm={handleConfirm}
      />
    </>
  );
};

export default RemoveTransactionButton;
