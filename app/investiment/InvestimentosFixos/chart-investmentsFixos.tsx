"use client";

import { formatToBRL } from "@/app/_components/calculadora/formatFunctions";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/app/_components/ui/chart";
import { CartesianGrid, Line, LineChart } from "recharts";
import { SimuladorInvestimentosProps } from "./SimuladorInvestimentos";

const chartConfig = {
  desktop_1: {
    label: "Poupança",
    color: "#60A5FA",
  },
  desktop_2: {
    label: "Tesouro Selic",
    color: "#C084FC",
  },
  desktop_3: {
    label: "CDB",
    color: "#4ADE80",
  },
} satisfies ChartConfig;

export function ComponentChartFixos(
  resultadosGraphics: SimuladorInvestimentosProps,
) {
  const poupancaLength = resultadosGraphics.poupanca.length;
  const tesourodiretoLength = resultadosGraphics.tesouroSelic.length;
  const cdbLength = resultadosGraphics.cdb.length;
  const dataLength = Math.max(poupancaLength, tesourodiretoLength, cdbLength);
  const chartData = Array.from({ length: dataLength }, (_, index) => ({
    month: `Mês ${index + 1}`,
    desktop_1: resultadosGraphics.poupanca[index]?.valorAtual,
    desktop_2: resultadosGraphics.tesouroSelic[index]?.valorAtual,
    desktop_3: resultadosGraphics.cdb[index]?.valorAtual,
  }));

  return (
    <Card className="w-full border-none">
      <CardHeader></CardHeader>
      <CardContent>
        <ChartContainer className="h-[200px] w-full" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 5, right: 12, left: 12, bottom: 5 }}
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
              dataKey="desktop_1"
              type="monotone"
              stroke="var(--color-desktop_1)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="desktop_2"
              type="monotone"
              stroke="var(--color-desktop_2)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="desktop_3"
              type="monotone"
              stroke="var(--color-desktop_3)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
