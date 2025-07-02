"use client";

import { useState } from "react";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import UpsertTransactionDialog from "./upsert-transactions-dialog";

interface addTransactionButtonProps {
  location: string;
  dashBoardCssButton?: boolean;
  month: string;
  userCanAddTransaction: boolean;
  handleFunctionAlert?: () => void;
  handleMessage?: (message: string, color: string) => void;
  hasPremiumPlan: boolean | null;
}

const AddTransactionButton = ({
  location,
  dashBoardCssButton,
  month,
  userCanAddTransaction,
  handleFunctionAlert,
  handleMessage,
  hasPremiumPlan,
}: addTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button
                className={`!z-20 rounded-full font-bold ${
                  location === "dashboard"
                    ? "bg-white text-black hover:bg-green-200 hover:!text-black dark:bg-primary dark:text-white dark:hover:bg-white"
                    : "bg-primary text-white"
                } ${dashBoardCssButton === true ? "w-full rounded-md 1xl-custom:w-[200px] 1xl-custom:rounded-full" : ""}`}
                onClick={() => setDialogIsOpen(true)}
                disabled={!userCanAddTransaction}
              >
                Adicionar Transação
                <ArrowDownUpIcon />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransaction ? (
              <p className="text-center">
                Limite de transações atingido. <br />
                Acesse a aba de <strong>Assinatura</strong> <br />
                para mais informações.
              </p>
            ) : (
              <p className="text-center">Adicionar uma nova transação</p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertTransactionDialog
        month={month}
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        handleFunctionAlert={handleFunctionAlert}
        handleMessage={handleMessage}
        hasPremiumPlan={hasPremiumPlan ?? null}
      />
    </>
  );
};

export default AddTransactionButton;
