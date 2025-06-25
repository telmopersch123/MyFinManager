"use client";

import { Area, AreaChart, CartesianGrid } from "recharts";

import { formatToBRL } from "@/app/_components/calculadora/formatFunctions";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/app/_components/ui/chart";

export const description = "An interactive area chart";

const chartConfig = {
  desktop: {
    label: "Valor R$",
    color: "#F97316",
  },
} satisfies ChartConfig;

interface ChartAreaInteractiveProps {
  investmentData: Array<{ timestamp: string; bid: number }>;
  timeRange: "360d" | "180d" | "90d" | "7d" | "30d";
}

export function ChartAreaInteractive({
  investmentData,
  timeRange,
}: ChartAreaInteractiveProps) {
  const chartData = investmentData

    .filter((item) => item.timestamp && item.bid !== undefined)
    .map((item) => {
      const [day, month, year] = item.timestamp.split("/");
      const parsedDate = new Date(`${year}/${month}/${day}`);
      return {
        date: parsedDate,
        desktop: item.bid,
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const filteredData = chartData.filter((item) => {
    const date = item.date;
    const referenceDate = new Date();
    let daysToSubtract = 360;
    if (timeRange === "360d") {
      daysToSubtract = 360;
    } else if (timeRange === "180d") {
      daysToSubtract = 180;
    } else if (timeRange === "90d") {
      daysToSubtract = 90;
    } else if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate && date <= referenceDate;
  });

  const formattedData = filteredData.map((item) => ({
    ...item,
    date: item.date.toLocaleDateString("pt-BR"),
  }));

  return (
    <Card className="h-[200px] w-full border-none sm:h-[250px]">
      <CardContent className="px-0">
        <ChartContainer
          config={chartConfig}
          className="mt-7 h-[200px] w-full sm:mt-1 sm:h-[250px]"
        >
          <AreaChart
            margin={{ top: 30, right: 0, bottom: 0, left: 0 }}
            data={formattedData}
          >
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                return (
                  <div className="rounded-lg border border-gray-700 bg-gray-800 p-2 shadow-md">
                    <p className="mb-1 text-sm font-semibold text-gray-200">
                      Cotação Bitcoin
                    </p>
                    {payload.map((entry) => {
                      const name = entry.dataKey as keyof typeof chartConfig;
                      const config = chartConfig[name];
                      return (
                        <>
                          <div>
                            <div className="mb-1 text-xs text-gray-400">
                              {(() => {
                                const dateStr = payload[0]?.payload?.date;
                                if (!dateStr) return "Data não disponível";
                                const [day, month, year] = dateStr.split("/");
                                const parsedDate = new Date(
                                  `${year}/${month}/${day}`,
                                );
                                return parsedDate.toLocaleDateString("pt-BR", {
                                  month: "short",
                                  day: "numeric",
                                });
                              })()}
                            </div>
                          </div>
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
                        </>
                      );
                    })}
                  </div>
                );
              }}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
