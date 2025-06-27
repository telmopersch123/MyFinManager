"use client";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionPercentageType } from "@/app/_data/get-dashboard/type";

import { TransactionType } from "@prisma/client";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";
import PercentageItem from "./percentage-item";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFFFFF ",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  typesPercentage: TransactionPercentageType;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

export const TransactionsPieChart = ({
  typesPercentage,
  depositsTotal,
  investmentsTotal,
  expensesTotal,
}: TransactionsPieChartProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: isDarkMode ? "#ffffff" : "#d3d3d3",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
  ];

  return (
    <Card className="my-4 flex h-[450px] w-full flex-col p-0 2xl-custom:my-0">
      <CardContent className="flex-1 p-0">
        <ChartContainer
          config={chartConfig}
          className="h-[300px] w-full max-w-full"
        >
          {depositsTotal !== 0 ? (
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="type"
                innerRadius={60}
              />
            </PieChart>
          ) : (
            <div className="relative flex h-full w-full items-center justify-center">
              <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-sm text-gray-500">
                Não há transações suficientes para gerar o gráfico.
              </p>
            </div>
          )}
        </ChartContainer>
        <div className="space-y-2 p-6">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Receita"
            amount={typesPercentage.DEPOSIT}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-danger" />}
            title="Despesas"
            amount={typesPercentage.EXPENSE}
          />
          <PercentageItem
            icon={
              <PiggyBankIcon size={16} className="text-black dark:text-white" />
            }
            title="Investido"
            amount={typesPercentage.INVESTMENT}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsPieChart;
