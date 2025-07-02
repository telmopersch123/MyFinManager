"use client";
import Loading from "@/app/(home)/_components/loading";
import GetCalculator from "@/app/_components/calculadora/get-calculadora";
import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { AlertTriangle, CheckIcon, XIcon } from "lucide-react";
import useSWR from "swr";
import AcquireButton from "./acquire-plan-button";

export default function SubscriptionClient({
  hasPremiumPlan,
}: {
  hasPremiumPlan: boolean;
}) {
  const { data, error, isLoading } = useSWR(
    `/api/subscription`,
    async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    },
  );

  const { data: investmentCount, error: investmentError } = useSWR(
    `/api/investment/count`,
    async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      return data.quantidade;
    },
  );

  if (error || investmentError) {
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
  if (isLoading || !data)
    return (
      <div>
        <Loading />
      </div>
    );

  const currentMonthTransactions = data.count;

  return (
    <>
      <div className="space-y-6 overflow-auto p-6 lg:overflow-hidden">
        <h1 className="text-center text-2xl font-bold sm:text-left">
          Assinatura
        </h1>

        <div className="flex flex-wrap gap-6">
          <Card className="w-full lg:w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {!hasPremiumPlan && (
                <Badge className="absolute left-4 top-4 bg-primary/10 text-primary hover:text-black">
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Plano Básico
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="font-sewmibold text-6xl">0</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p className="text-sm">
                  Apenas 30 transações por mês (
                  {hasPremiumPlan !== true
                    ? currentMonthTransactions > 30
                      ? 30
                      : currentMonthTransactions
                    : 0}
                  /30)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p className="text-sm">
                  Apenas 10 simulações por dia (
                  {hasPremiumPlan !== true ? investmentCount : 0}/10)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <XIcon className="text-danger" />
                <p className="text-sm">Relatórios e Cálculos com IA limitada</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full lg:w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {hasPremiumPlan && (
                <Badge className="absolute left-4 top-4 bg-primary/10 text-primary hover:text-black">
                  Ativo
                </Badge>
              )}

              <h2 className="text-center text-2xl font-semibold">
                Plano Premium
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="font-sewmibold text-6xl">3,99</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p className="text-sm">Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p className="text-sm">Simulações ilimitadas</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p className="text-sm">
                  Relatórios e Cálculos com IA ilimitada
                </p>
              </div>
              <AcquireButton />
            </CardContent>
          </Card>
        </div>
      </div>
      <GetCalculator />
    </>
  );
}
