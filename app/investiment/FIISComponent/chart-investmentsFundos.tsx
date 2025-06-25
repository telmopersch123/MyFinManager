"use client";

import { formatToBRL } from "@/app/_components/calculadora/formatFunctions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/app/_components/ui/chart";
import { CartesianGrid, Line, LineChart } from "recharts";
import { SimulationResults } from "./page";

const chartConfig = {
  Dividendos: {
    label: "Total Dividendos",
    color: "#22c55e",
  },
  Valor_Original: {
    label: "Valor ajustado pela inflação",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChartInvestimentFundos(results: SimulationResults) {
  const chartData = results.dataPoints.map((fund) => ({
    month: fund.valueSub1,
    Dividendos: fund.valueSub2,
    Valor_Original: fund.valueSub3,
  }));

  return (
    <Card className="w-full border-none">
      <CardHeader></CardHeader>
      <CardContent>
        <ChartContainer className="h-[200px] w-full" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />

            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                return (
                  <div className="rounded-lg border border-gray-700 bg-gray-800 p-2 shadow-md">
                    <p className="mb-1 text-sm font-semibold text-gray-200">
                      Investimentos Fixos
                    </p>
                    {payload.map((entry) => {
                      const name = entry.dataKey as keyof typeof chartConfig;
                      const config = chartConfig[name];
                      return (
                        <div
                          key={name}
                          className="flex items-center text-sm text-gray-300"
                        >
                          <span
                            className="mr-2 h-2 w-2 rounded-full"
                            style={{ backgroundColor: config.color }}
                          />
                          <span>
                            {config.label}: {formatToBRL(Number(entry.value))}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            />
            <Line
              dataKey="Dividendos"
              type="monotone"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Valor_Original"
              type="monotone"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
