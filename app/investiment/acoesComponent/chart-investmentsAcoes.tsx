"use client";

import { CartesianGrid, Line, LineChart } from "recharts";

import { formatToBRL } from "@/app/_components/calculadora/formatFunctions";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/app/_components/ui/chart";
import { SimulationResult } from "./page";

const chartConfig = {
  desktop: {
    label: "Valores Mensais Estimado",
    color: "#22c55e",
  },
  mobile: {
    label: "Mobile",
    color: "#22c55e",
  },
} satisfies ChartConfig;

export function ChartInvestimentAcoes(simulationStatus: SimulationResult) {
  const chartData =
    simulationStatus?.monthlyValues.map((value, index) => ({
      month: index + 1,
      desktop: value,
    })) || [];

  return (
    <Card className="w-full border-none">
      <CardHeader></CardHeader>
      <CardContent>
        <ChartContainer className="h-[200px] w-full" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 5,
              left: 24,
              right: 24,
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
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
