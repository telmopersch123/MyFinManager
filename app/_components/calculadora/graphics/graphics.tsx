import { Calculo, MonthlyData } from "@/app/_interfaces/interface";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "../../ui/chart";
import ReutilizavelFormat, { formatToBRL } from "../formatFunctions";

import CurrentDate, {
  getSelectedIndices,
  useDeviceType,
} from "./_reutilizavel";
import { generateMonths } from "./mesesDinamicos";
import { CustomTooltip } from "./tooltipspersonalizados";

interface GraphicsSimplesProps {
  montante: string;
  capital: string;
  isCalculated: boolean;
  historicoCalculos: Calculo[];
  catchDate: string;
}

interface GraphicsCompostoProps {
  isCalculated: boolean;
  catchDate: string;
  monthlyData: MonthlyData[];
}

interface GraphicsSimuladorProps {
  jurosGraphics: string[];
  amortizacaoGraphics: string[];
  saldoDevedoGraphics: string[];
  dataVencimentoGraphics: string[];
}

export default function GraphicsSimples({
  montante,
  capital,
  isCalculated,
  historicoCalculos,
  catchDate,
}: GraphicsSimplesProps) {
  const [montantNumber, setMontantNumber] = useState(0);
  const [capitalNumber, setCapitalNumber] = useState(0);

  useEffect(() => {
    // Só recalcula quando clickCopy, isCalculated ou montante mudarem
    setCapitalNumber(parseFloat(capital.replace(/\./g, "").replace(",", ".")));
    if (!isCalculated) {
      setMontantNumber(
        parseFloat(montante.replace(/\./g, "").replace(",", ".")),
      );
    } else {
      setMontantNumber(parseFloat(montante.replace(",", ".")));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCalculated, historicoCalculos]); // Dependências
  const chartData = [
    {
      month: "Valor Investido",
      value: capitalNumber,
      color: "rgba(100, 100, 100, 0.5)",
    },
    {
      month: "Valor Total Final",
      value: montantNumber,
      color: "#22C55E",
    },
  ];

  const chartConfig = {
    value: {
      label: "R$",
      color: "#000000",
    },
  } satisfies ChartConfig;

  return (
    <Card className={`mt-4`}>
      <CardHeader>
        <CardTitle>Análise Gráfica</CardTitle>
        <CardDescription>
          {isCalculated ? <CurrentDate /> : ReutilizavelFormat(catchDate)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 20)}
            />
            <ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (!payload?.length) return null;

                const item = payload[0];
                const value = item?.value ?? 0;
                const month = item?.payload?.month;

                // Define nome personalizado com base no "month"
                let label = "";
                if (month === "Valor Investido") {
                  label = "Valor Investido";
                } else if (month === "Valor Total Final") {
                  label = "Valor Total Final";
                }
                return (
                  <div className="rounded border bg-black/50 p-2 shadow">
                    <p>{label}</p>
                    <p className="font-semibold text-white">
                      {formatToBRL(
                        Array.isArray(value) ? value[0] : (value ?? 0),
                      )}
                    </p>
                  </div>
                );
              }}
            />
            <Bar
              dataKey="value"
              radius={8}
              barSize={100} // Ajuste o tamanho da barra
              fill="#000000" // Placeholder, sobrescrito por data.color
              data={chartData.map((entry) => ({
                ...entry,
                fill: entry.color, // Usa a cor definida em chartData
              }))}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function GraphicsCompostos({
  isCalculated,
  catchDate,
  monthlyData,
}: GraphicsCompostoProps) {
  const NewmonthlyData = monthlyData.map((value) => value.valorAcumulado);

  const meses = generateMonths(
    NewmonthlyData.length,
    new Date().getFullYear(),
    1,
  );

  const deviceType = useDeviceType();
  const limitedValoresMensais = NewmonthlyData.slice(0, meses.length);
  const selectedIndices = getSelectedIndices(
    limitedValoresMensais.length,
    deviceType,
  );

  const chartData = selectedIndices.map((index) => ({
    month: meses[index] || `Mês ${index + 1}`, // Associa o mês correspondente
    desktop: Number(limitedValoresMensais[index]), // Converte o valor para número
    mobile: 0, // Placeholder (pode ser removido se não usar mobile)
    originalIndex: index,
  }));

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#22C55E",
    },
    mobile: {
      label: "Mobile",
      color: "#22C55E",
    },
  } satisfies ChartConfig;
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Análise Gráfica</CardTitle>
        <CardDescription>
          {" "}
          {isCalculated ? <CurrentDate /> : ReutilizavelFormat(catchDate)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={1}
              tickFormatter={(value) => value.slice(0, 4)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <CustomTooltip
                  chartConfig={chartConfig}
                  info={false}
                  monthlyData={monthlyData}
                />
              }
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
            ></Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function GraphicsParcelamento({
  jurosGraphics,
  amortizacaoGraphics,
  saldoDevedoGraphics,
  dataVencimentoGraphics,
}: GraphicsSimuladorProps) {
  const deviceType = useDeviceType();
  const limitedValoresParcelamento = jurosGraphics.slice(
    0,
    dataVencimentoGraphics.length,
  );

  const selectedIndices = getSelectedIndices(
    limitedValoresParcelamento.length,
    deviceType,
  );

  const chartData = selectedIndices.map((realIndex) => ({
    parcela: realIndex + 1,
    vencimento: dataVencimentoGraphics[realIndex],
    juros: jurosGraphics[realIndex],
    amortizacao: amortizacaoGraphics[realIndex],
    saldo: saldoDevedoGraphics[realIndex],
  }));

  const chartConfig = {
    juros: {
      label: "Juros",
      color: "rgba(100, 100, 100, 0.5)", // Cinza opaco
    },
    amortizacao: {
      label: "Amortização",
      color: "#22C55E", // Azul vibrante
    },
    saldo: {
      label: "Saldo Devedor",
      color: "#ff4500", // Vermelho para a linha
    },
  } satisfies ChartConfig;

  return (
    <Card className={`mt-4`}>
      <CardHeader>
        <CardTitle>Simulador de Parcelamento</CardTitle>
        <CardDescription>Evolução das Parcelas</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="parcela"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `Parcela ${value}`}
            />
            <YAxis yAxisId="left" orientation="left" stroke="#888" />
            <YAxis yAxisId="right" orientation="right" stroke="#ff4500" />
            <ChartTooltip
              content={<CustomTooltip chartConfig={chartConfig} info={true} />}
            />
            <Bar
              yAxisId="left"
              dataKey="juros"
              stackId="a"
              fill="var(--color-juros)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              yAxisId="left"
              dataKey="amortizacao"
              stackId="a"
              fill="var(--color-amortizacao)"
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="saldo"
              stroke="var(--color-saldo)"
              strokeWidth={2}
              dot={true}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
