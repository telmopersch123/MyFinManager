"use client";

import TimeSelect from "@/app/(home)/_components/time-select";
import AddTransactionButton from "@/app/_components/add-transaction-button";
import { DataTable } from "@/app/_components/ui/data-table";

import { useHandleMensage } from "@/app/(home)/_components/handleMensage";
import Loading from "@/app/(home)/_components/loading";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { transactionsColumns } from "../_columns";

import { formatToBRL } from "@/app/_components/calculadora/formatFunctions";
import GetCalculator from "@/app/_components/calculadora/get-calculadora";
import { useEffect, useState } from "react";
import PopoverFiltered from "./components/Popover-Filtered";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface TransactionsClientProps {
  hasPremiumPlan: boolean;
}

export function TransactionsClient({
  hasPremiumPlan,
}: TransactionsClientProps) {
  const [colorBack, setColorBack] = useState("bg-white");
  const [selectType, setSelectType] = useState<
    "EXPENSE" | "DEPOSIT" | "INVESTMENT" | undefined
  >(undefined);
  const searchParams = useSearchParams();
  const month =
    searchParams.get("month") ??
    (new Date().getMonth() + 1).toString().padStart(2, "0");
  const { data, isLoading, error } = useSWR(
    `/api/dashboard?month=${month}${selectType ? `&type=${selectType}` : ""}`,
    fetcher,
  );
  const [limit, setLimit] = useState<number | null>(15);

  const { handleFunctionAlert, handleMessage, AlertComponent } =
    useHandleMensage();

  const handleFilterChange = (
    type: "EXPENSE" | "DEPOSIT" | "INVESTMENT" | undefined,
  ) => {
    setSelectType(type);
  };

  useEffect(() => {
    if (selectType === "EXPENSE") {
      setColorBack("bg-iconsBackRed");
    } else if (selectType === "DEPOSIT") {
      setColorBack("bg-iconsBackGreen");
    } else if (selectType === "INVESTMENT") {
      setColorBack("bg-yellow-500");
    }
    if (selectType === undefined) {
      setColorBack("bg-white");
    }
  }, [selectType]);

  if (isLoading || !data) return <Loading />;
  if (error) return <div>Erro ao carregar dados.</div>;

  const filteredTransactions = (
    selectType
      ? data.dashboard.lastTransaction.filter(
          (transaction: { type: string }) => transaction.type === selectType,
        )
      : data.dashboard.lastTransaction
  ).slice(0, limit ?? data.dashboard.lastTransaction.length);

  const balance = filteredTransactions.reduce(
    (total: number, transaction: { type: string; amount: number }) => {
      const amount = transaction.amount;

      if (transaction.type === "DEPOSIT") {
        return total + amount;
      } else if (transaction.type === "EXPENSE") {
        return total - amount;
      } else if (transaction.type === "INVESTMENT") {
        return total + amount;
      }

      return total;
    },
    0,
  );

  return (
    <>
      {AlertComponent}
      <div className="overflow-none grid justify-center space-y-6 p-6 sm:justify-stretch">
        <div className="flex w-full flex-wrap items-center justify-center gap-4 md:justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">Transações</h1>
            <TimeSelect month={month} pathUrl="/transactions" />
          </div>

          <div className="flex items-center space-x-4">
            <PopoverFiltered
              handleFilterChange={handleFilterChange}
              handleLimitChange={setLimit}
              selectedLimit={limit}
            />
            <AddTransactionButton
              location="transactions"
              month={month}
              handleMessage={handleMessage}
              handleFunctionAlert={handleFunctionAlert}
              userCanAddTransaction={data.userCanAddTransaction}
              hasPremiumPlan={hasPremiumPlan}
            />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-md bg-zinc-900 bg-opacity-15 p-4">
          <h3 className="text-2xl font-semibold">
            {selectType === "DEPOSIT"
              ? "Saldo Depositado"
              : selectType === "EXPENSE"
                ? "Saldo Despesas"
                : selectType === "INVESTMENT"
                  ? "Saldo Investido"
                  : "Possível Patrimônio"}
          </h3>
          <h3
            className={`rounded-sm bg-opacity-25 p-1 text-xl dark:bg-opacity-10 ${colorBack}`}
          >
            {formatToBRL(balance)}
          </h3>
        </div>
        <div className="w-full overflow-x-auto rounded-xl border border-opacity-10 md:rounded-none md:border-none md:border-opacity-0">
          <div className="overflow-auto">
            <DataTable
              columns={transactionsColumns(
                month,
                handleMessage,
                handleFunctionAlert,
                hasPremiumPlan,
              )}
              data={filteredTransactions}
            />
          </div>
        </div>
      </div>
      <GetCalculator />
    </>
  );
}
