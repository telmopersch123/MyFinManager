"use client";

import GetCalculator from "@/app/_components/calculadora/get-calculadora";
import { AlertTriangle, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import useSWR from "swr";

import { useEffect, useRef, useState } from "react";
import AiReportButton from "./ai-report-button";
import { useHandleMensage } from "./handleMensage";
import LastTransactions from "./last-transaction";
import Loading from "./loading";
import SummaryCards from "./summary-cards";
import TimeSelect from "./time-select";

const TransactionsPierChart = dynamic(
  () => import("./transactions-pier-charts"),
  {
    loading: () => (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={24} />
      </div>
    ),
    ssr: false,
  },
);

const ExpensePerCategory = dynamic(() => import("./expenses-per-category"), {
  loading: () => (
    <div className="flex h-40 items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={24} />
    </div>
  ),
  ssr: false,
});

interface Props {
  month: string;
}

export default function ClientDashboard({ month }: Props) {
  const valueDiv = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState<{ height: number }>({
    height: 0,
  });

  const { data, error, isLoading } = useSWR(
    `/api/dashboard?month=${month}`,
    async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Falha na requisição do dashboard");
      }
      return response.json();
    },
    {
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    if (!data) return;
    const element = valueDiv.current;

    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        if (height > 0) {
          setDimensions({ height });
        }
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [data]);

  const { handleFunctionAlert, handleMessage, AlertComponent } =
    useHandleMensage();

  if (error) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="flex items-center gap-2 rounded-md border border-red-500/30 bg-red-50/80 px-4 py-3 text-sm text-red-700 shadow-sm dark:border-red-600/30 dark:bg-red-900/20 dark:text-red-300">
          <AlertTriangle className="h-5 w-5 shrink-0 text-red-500 dark:text-red-400" />
          <span>
            Ops! Algo deu errado ao carregar os dados. Atualize a página
          </span>
        </div>
      </div>
    );
  }

  if (isLoading || !data) {
    return <Loading />;
  }

  const { dashboard, userCanAddTransaction, user } = data;

  return (
    <>
      {AlertComponent}
      <div className="flex flex-col space-y-2 bg-background p-2 text-foreground">
        <div className="flex flex-wrap items-center justify-center gap-5 sm:justify-between">
          <h1 className="mb-4 w-full rounded-full bg-muted/10 p-2 text-center text-2xl font-bold 1xl-custom:mb-0 1xl-custom:w-auto 1xl-custom:rounded-none 1xl-custom:bg-transparent 1xl-custom:text-left">
            Resumo Mensal
          </h1>
          <div className="item-center flex flex-wrap justify-center gap-3">
            <AiReportButton
              month={month}
              hasPremiumPlan={
                user?.publicMetadata.subscriptionPlan === "premium"
              }
              category="dashboard"
            />
            <TimeSelect month={month} pathUrl={""} />
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
          {/* ESQUERDO */}
          <div ref={valueDiv} className="flex-2 flex flex-col 3xl-custom:gap-0">
            <SummaryCards
              {...dashboard}
              userCandAddTransaction={userCanAddTransaction}
              month={month}
              handleFunctionAlert={handleFunctionAlert}
              handleMessage={handleMessage}
              hasPremiumPlan={
                user?.publicMetadata.subscriptionPlan === "premium"
              }
            />
            <div className="!m-0 grid w-full grid-cols-1 gap-0 2xl-custom:grid-cols-3 2xl-custom:gap-6">
              <TransactionsPierChart {...dashboard} />
              <ExpensePerCategory
                initialExpensesPerCategory={dashboard.totalExpensePerCategory}
                month={month}
              />
            </div>
          </div>
          {/* DIREITO */}
          <div
            style={{
              height: dimensions?.height,
            }}
            className="flex !max-h-[500px] flex-1 flex-col gap-3 sm:!min-w-[500px] lg:!max-h-full"
          >
            <LastTransactions lastTransaction={dashboard.lastTransaction} />
          </div>
        </div>
      </div>
      <GetCalculator />
    </>
  );
}
