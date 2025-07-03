"use client";

import AiReportButton from "@/app/(home)/_components/ai-report-button";
import {
  customHandleCapitalChange,
  formatToBRL,
} from "@/app/_components/calculadora/formatFunctions";
import { Alert, AlertDescription } from "@/app/_components/ui/alert";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  AlertTriangle,
  ArrowDown,
  Bitcoin,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  formatarNumero,
  formatarNumeroVirgulasOne,
} from "../_components/functions";

import {
  BitcoinInputs,
  RelatorioInvestimento,
} from "@/app/(home)/_actions/generate-ai-report/interfaces";
import AiSimulationButton from "@/app/(home)/_components/ai-simuation-button";
import AlertLimit from "../_components/alertLimit";
import { CalculateInvestment } from "./calculateInvestimentCripto";
import { ChartAreaInteractive } from "./chart-investmentsCripto";

interface InvestimentGeralProps {
  month: string;
  hasPremiumPlan: boolean;
  setInvestmentAction: React.Dispatch<
    React.SetStateAction<RelatorioInvestimento[]>
  >;
  investiment: RelatorioInvestimento[];
  setBitcoinInputsAction: React.Dispatch<React.SetStateAction<BitcoinInputs[]>>;
  bitcoinInputs: BitcoinInputs[];
  setQuantityAction: React.Dispatch<React.SetStateAction<number | null>>;
  quantity: number | null;
  setUpdateAction: React.Dispatch<
    React.SetStateAction<RelatorioInvestimento[]>
  >;
  update: RelatorioInvestimento[];
}

export function SimuladorBitcoin({
  month,
  hasPremiumPlan,
  setInvestmentAction,
  investiment,
  setBitcoinInputsAction,
  bitcoinInputs,
  setQuantityAction,
  quantity,
  setUpdateAction,
  update,
}: InvestimentGeralProps) {
  const [timeRange, setTimeRange] = useState<
    "360d" | "180d" | "90d" | "7d" | "30d"
  >("360d");
  const [initialInvestment, setInitialInvestment] = useState<string>("");
  const [results, setResults] = useState<{
    futureValueMean: number;
    futureValueOptimistic: number;
    futureValuePessimistic: number;
    bitcoinAmount: number;
    totalFees: number;
    capitalGainMean: number;
    tax: number;
    netValueMean: number;
    monthlyReturn: number;
  } | null>(null);
  const [periodUnit, setPeriodUnit] = useState<"meses" | "anos">("meses");
  const [period, setPeriod] = useState(12);
  const [marketScenario, setMarketScenario] = useState<
    "bull" | "neutro" | "bear"
  >("neutro");
  const [returnRate, setReturnRate] = useState<string>("20");
  const [exchangeFee, setExchangeFee] = useState<string>("0.5");
  const [position, setPosition] = useState<"manual" | "IA">("manual");
  const [showAIReport, setShowAIReport] = useState(false);
  const [validClick, setValidClick] = useState(false);
  const [investmentData, setInvestmentData] = useState<
    { timestamp: string; bid: number }[]
  >([]);
  const [simulationStatus, setSimulationStatus] = useState<string>("");

  const validateInputs = () => {
    const value = Number(initialInvestment.replace(".", "").replace(",", "."));
    if (!value || value <= 0) {
      setSimulationStatus("Insira um valor inicial válido!");
      return false;
    }
    if (!exchangeFee || Number(exchangeFee) < 0) {
      setSimulationStatus("A taxa de corretagem deve ser maior ou igual a 0!");
      return false;
    }
    return true;
  };

  const resetar = () => {
    setInitialInvestment("");
    setReturnRate("20");
    setExchangeFee("0.5");
    setPeriod(12);
    setPeriodUnit("meses");
    setMarketScenario("neutro");
    setResults(null);
    setInvestmentAction([]);
    setSimulationStatus("");
  };

  useEffect(() => {
    async function handlePeriodChange() {
      try {
        const response = await fetch("/api/investment");
        const investmentDate = await response.json();
        const investmentData = investmentDate
          .filter(
            (item: {
              bid: string | undefined;
              timestamp: number | undefined;
            }) => item.bid !== undefined && item.timestamp !== undefined,
          )
          .map((item: { bid: string; timestamp: number }) => {
            const timestampInMs =
              item.timestamp > 1e12 ? item.timestamp : item.timestamp * 1000;
            const date = new Date(timestampInMs);
            return {
              bid: parseFloat(item.bid),
              timestamp: date.toLocaleDateString("pt-BR", {
                timeZone: "America/Sao_Paulo",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }),
            };
          });
        setInvestmentData(investmentData);
      } catch (error) {
        console.error("Erro ao buscar dados de investimento:", error);
      }
    }
    handlePeriodChange();
    const intervalId = setInterval(handlePeriodChange, 120000);
    return () => clearInterval(intervalId);
  }, []);

  const ValueBitcoin = investmentData.length > 0 ? investmentData[0].bid : null;

  useEffect(() => {
    if (hasPremiumPlan) return;
    setUpdateAction(investiment);
    if (quantity !== null)
      if (
        (quantity < 10 &&
          JSON.stringify(investiment) !== JSON.stringify(update) &&
          investiment.length !== 0) ||
        position === "IA"
      ) {
        setQuantityAction((prev) => (prev !== null ? prev + 1 : 1));
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [investiment, validClick]);

  return (
    <div className="mt-4 flex min-h-screen flex-col space-y-10 overflow-auto bg-[hsl(var(--background))] p-4">
      {/* Título da Página */}
      <div className="text-center lg:text-left">
        <h1 className="flex items-center justify-center text-3xl font-bold text-[hsl(var(--foreground))] sm:text-4xl lg:justify-start">
          <Bitcoin className="mr-2 text-orange-500" size={32} />
          Simulador de Investimento em Bitcoin
        </h1>
        <p className="mx-auto mt-2 text-base text-[hsl(var(--muted-foreground))] sm:mx-0 lg:max-w-2xl">
          Simule seu investimento em <strong>Bitcoin (BTC)</strong> e explore o
          potencial de valorização em diferentes cenários de mercado.
        </p>
      </div>

      {/* Preço Atual do Bitcoin */}
      <Card className="animate-pulse-once relative rounded-lg border border-orange-600/20 bg-gradient-to-r shadow-2xl backdrop-blur-md dark:from-zinc-900/80 dark:to-orange-900/20">
        <CardHeader className="border-b border-orange-600/10 py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-orange-300">
              Preço Atual do Bitcoin
            </CardTitle>
            <Badge className="bg-orange-600/80 text-white">
              Atualizado Agora
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="py-6">
          <div className="flex items-center space-x-4">
            <Bitcoin className="text-orange-400" size={48} />
            <div>
              <p className="text-3xl font-bold">
                {ValueBitcoin ? formatToBRL(ValueBitcoin) : "Carregando..."}
              </p>
              <p className="text-sm text-gray-400">
                Última atualização:{" "}
                {investmentData.length > 0
                  ? investmentData[0].timestamp
                  : "Indísponivel, tente novamente mais tarde."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção Simulador */}
      <div className="grid grid-rows-[auto_1fr] gap-6">
        <div className="-ml-2.5 flex w-full flex-col items-center gap-2 sm:-ml-5 sm:flex-row sm:justify-end">
          {quantity !== null &&
            quantity >= 10 &&
            !hasPremiumPlan &&
            AlertLimit()}

          <AiSimulationButton
            month={month}
            hasPremiumPlan={hasPremiumPlan}
            investiment={investiment}
            bitcoinInputs={bitcoinInputs}
            category="Calcular-Bitcoin"
            openExternally={showAIReport}
            onOpenChange={setShowAIReport}
            setValidClick={setValidClick}
            quantity={quantity}
          />
          <AiReportButton
            month={month}
            hasPremiumPlan={hasPremiumPlan}
            investiment={investiment}
            category="CRIPTO"
            quantity={quantity}
            setValidClick={setValidClick}
          />
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_2fr]">
          {/* Contexto sobre Bitcoin */}

          <div className="space-y-6">
            <h2 className="flex w-full items-center text-2xl font-semibold text-[hsl(var(--foreground))]">
              <TrendingUp className="mr-2 text-orange-400" size={24} />
              Sobre o Bitcoin
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <Card className="relative rounded-lg border border-[hsl(var(--border))] bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-orange-600/20 dark:bg-zinc-900/50">
                <CardHeader className="border-b border-[hsl(var(--border))] py-4 dark:border-orange-600/10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-[hsl(var(--card-foreground))] dark:text-white md:text-xl">
                      Como o Cálculo é Feito
                    </CardTitle>
                    <Badge className="bg-orange-600/80 text-[hsl(var(--primary-foreground))] dark:text-white">
                      Estimativa
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="py-6">
                  <div className="space-y-4 text-sm text-[hsl(var(--card-foreground))] dark:text-gray-300">
                    <p className="font-medium">
                      O simulador projeta seu investimento em Bitcoin com base
                      em:
                    </p>
                    <ul className="list-disc space-y-3 pl-5">
                      <li>
                        <span className="font-semibold">Compra de BTC:</span>{" "}
                        Aquisição ao preço atual, com taxa de corretagem de{" "}
                        {exchangeFee}% deduzida.
                      </li>
                      <li>
                        <span className="font-semibold">
                          Projeção em 3 cenários:
                        </span>
                        <ul className="mt-2 list-[circle] space-y-2 pl-6">
                          <li>
                            <span className="font-semibold text-[hsl(var(--primary))] dark:text-orange-300">
                              Médio:
                            </span>{" "}
                            {marketScenario === "bull"
                              ? "40% ao ano (Bull Market)"
                              : marketScenario === "bear"
                                ? "-20% ao ano (Bear Market)"
                                : `${returnRate}% ao ano (Neutro)`}
                          </li>
                          <li>
                            <span className="font-semibold text-[hsl(var(--secondary))] dark:text-green-300">
                              Otimista:
                            </span>{" "}
                            {marketScenario === "bear"
                              ? "+40% de volatilidade"
                              : "+50% de volatilidade"}
                          </li>
                          <li>
                            <span className="font-semibold text-[hsl(var(--destructive))] dark:text-red-300">
                              Pessimista:
                            </span>{" "}
                            {marketScenario === "bear"
                              ? "-40% de volatilidade"
                              : "-50% de volatilidade"}
                          </li>
                        </ul>
                      </li>
                      <li>
                        <span className="font-semibold">Cálculos finais:</span>{" "}
                        Incluem valor futuro, taxas, ganho de capital e imposto
                        de 15% sobre lucros acima de R$ 35.000.
                      </li>
                    </ul>
                    <p className="text-xs italic text-[hsl(var(--muted-foreground))] dark:text-gray-400">
                      * Projeções baseadas em juros compostos mensais.
                    </p>
                    <Alert
                      variant="destructive"
                      className="mt-6 rounded-md border border-[hsl(var(--destructive))]/30 bg-[hsl(var(--destructive))]/20 p-4 dark:border-red-500/30 dark:bg-red-500/20"
                    >
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 flex-shrink-0 text-[hsl(var(--destructive))] dark:text-red-400" />
                        <AlertDescription className="ml-3 text-sm text-red-700 dark:text-red-200">
                          <span className="font-semibold">Atenção:</span> O
                          Bitcoin é altamente volátil. Estas projeções são
                          ilustrativas e o mercado real pode divergir
                          significativamente. Invista apenas o que pode perder.
                        </AlertDescription>
                      </div>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
              <Card className="relative rounded-lg border border-[hsl(var(--border))] bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-orange-600/20 dark:bg-zinc-900/50">
                <CardHeader className="border-b border-[hsl(var(--border))] py-4 dark:border-orange-600/10">
                  <h3 className="text-lg font-semibold text-[hsl(var(--card-foreground))] dark:text-white">
                    Ciclos de Halving
                  </h3>
                  <Badge className="absolute right-4 top-4 bg-orange-600/80 text-[hsl(var(--primary-foreground))] dark:text-white">
                    Alta Volatilidade
                  </Badge>
                </CardHeader>
                <CardContent className="py-4 text-[hsl(var(--card-foreground))] dark:text-gray-300">
                  <p className="text-sm">
                    A cada ~4 anos, a emissão de novos BTCs é reduzida pela
                    metade, historicamente impulsionando bull runs (ex.: 2020,
                    2024).
                  </p>
                </CardContent>
              </Card>
              <Card className="relative rounded-lg border border-[hsl(var(--border))] bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-orange-600/20 dark:bg-zinc-900/50">
                <CardHeader className="border-b border-[hsl(var(--border))] py-4 dark:border-orange-600/10">
                  <h3 className="text-lg font-semibold text-[hsl(var(--card-foreground))] dark:text-white">
                    Adoção Institucional
                  </h3>
                  <Badge className="absolute right-4 top-4 bg-orange-600/80 text-[hsl(var(--primary-foreground))] dark:text-white">
                    Crescimento
                  </Badge>
                </CardHeader>
                <CardContent className="py-4 text-[hsl(var(--card-foreground))] dark:text-gray-300">
                  <p className="text-sm">
                    Investimentos de empresas (ex.: Tesla, MicroStrategy) e ETFs
                    de BTC aumentam a demanda e o preço a longo prazo.
                  </p>
                </CardContent>
              </Card>
              <Card className="relative rounded-lg border border-[hsl(var(--border))] bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-orange-600/20 dark:bg-zinc-900/50">
                <CardHeader className="border-b border-[hsl(var(--border))] py-4 dark:border-orange-600/10">
                  <h3 className="text-lg font-semibold text-[hsl(var(--card-foreground))] dark:text-white">
                    Riscos
                  </h3>
                  <Badge className="absolute right-4 top-4 !bg-red-500/80 text-[hsl(var(--destructive-foreground))] dark:text-white">
                    Alto Risco
                  </Badge>
                </CardHeader>
                <CardContent className="py-4 text-[hsl(var(--card-foreground))] dark:text-gray-300">
                  <p className="text-sm">
                    Volatilidade extrema, regulamentações, e riscos tecnológicos
                    (ex.: hacks, perda de chaves) podem impactar o investimento.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Formulário do Simulador */}
          <Card className="h-auto rounded-lg border border-[hsl(var(--border))] bg-white shadow-2xl backdrop-blur-md dark:border-orange-600/20 dark:bg-zinc-900/60">
            <CardHeader className="rounded-lg border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary))] py-4 dark:border-orange-600/10 dark:bg-[#1f1f1f]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  Simulador de Bitcoin
                </h2>
                <Bitcoin className="text-orange-400" size={24} />
              </div>
            </CardHeader>
            <CardContent className="py-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="initialInvestment"
                    className="text-sm font-medium text-[hsl(var(--foreground))]"
                  >
                    Valor a Investir (R$)
                  </Label>
                  <Input
                    id="initialInvestment"
                    type="text"
                    value={initialInvestment}
                    onChange={(e) => {
                      customHandleCapitalChange(e, setInitialInvestment);
                      setSimulationStatus("");
                    }}
                    placeholder="R$ 1.000,00"
                    className="rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-orange-600/20 dark:bg-zinc-800/40 dark:text-orange-100 dark:placeholder:text-orange-300 dark:focus:ring-2 dark:focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="return-rate"
                    className="text-sm font-medium text-[hsl(var(--foreground))]"
                  >
                    Taxa de Retorno Anual Estimada (%)
                  </Label>
                  <Input
                    id="return-rate"
                    type="text"
                    step="0.1"
                    value={returnRate}
                    onChange={(e) => {
                      const valueFormat = formatarNumero(e.target.value);
                      setReturnRate(valueFormat);
                    }}
                    placeholder="20"
                    className="rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-orange-600/20 dark:bg-zinc-800/40 dark:text-orange-100 dark:placeholder:text-orange-300 dark:focus:ring-2 dark:focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="exchange-fee"
                    className="text-sm font-medium text-[hsl(var(--foreground))]"
                  >
                    Taxa de Corretagem por Transação (%)
                  </Label>
                  <Input
                    id="exchange-fee"
                    type="text"
                    step="0.1"
                    value={exchangeFee}
                    onChange={(e) => {
                      const valueFormat = formatarNumeroVirgulasOne(
                        e.target.value,
                      );
                      setExchangeFee(valueFormat);
                      setSimulationStatus("");
                    }}
                    placeholder="0.5"
                    className="rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-orange-600/20 dark:bg-zinc-800/40 dark:text-orange-100 dark:placeholder:text-orange-300 dark:focus:ring-2 dark:focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="period"
                    className="text-sm font-medium text-[hsl(var(--foreground))]"
                  >
                    Prazo ({periodUnit === "meses" ? "Meses" : "Anos"})
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="period"
                      type="number"
                      value={period}
                      onChange={(e) => setPeriod(Number(e.target.value))}
                      placeholder="12"
                      className="rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-orange-600/20 dark:bg-zinc-800/40 dark:text-orange-100 dark:placeholder:text-orange-300 dark:focus:ring-2 dark:focus:ring-orange-500"
                    />
                    <Select
                      value={periodUnit}
                      onValueChange={(value) =>
                        setPeriodUnit(value as "meses" | "anos")
                      }
                    >
                      <SelectTrigger className="w-[120px] border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] dark:border-orange-600/20 dark:bg-zinc-800/40 dark:text-orange-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))] dark:border-orange-600/20 dark:bg-zinc-900 dark:text-orange-100">
                        <SelectItem value="meses">Meses</SelectItem>
                        <SelectItem value="anos">Anos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="market-scenario"
                    className="text-sm font-medium text-[hsl(var(--foreground))]"
                  >
                    Cenário de Mercado
                  </Label>
                  <Select
                    value={marketScenario}
                    onValueChange={(value) =>
                      setMarketScenario(value as "bull" | "neutro" | "bear")
                    }
                  >
                    <SelectTrigger
                      id="market-scenario"
                      className="rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-orange-600/20 dark:bg-zinc-800/40 dark:text-orange-100 dark:placeholder:text-orange-200 dark:focus:ring-2 dark:focus:ring-orange-500"
                    >
                      <SelectValue placeholder="Selecione o cenário" />
                    </SelectTrigger>
                    <SelectContent className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))] dark:border-orange-600/20 dark:bg-zinc-900 dark:text-orange-100">
                      <SelectItem value="bull">Bull Run (Alta)</SelectItem>
                      <SelectItem value="neutro">
                        Neutro (Consolidação)
                      </SelectItem>
                      <SelectItem value="bear">Bear Market (Baixa)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {simulationStatus && (
                  <p className="text-xs text-[hsl(var(--destructive))] dark:text-red-400">
                    {simulationStatus}
                  </p>
                )}
                <div className="flex flex-col gap-2 1xl-custom:flex-row">
                  <div className="relative w-full">
                    <Button
                      disabled={(quantity ?? 0) >= 10 && !hasPremiumPlan}
                      onClick={() => {
                        if (!ValueBitcoin || !validateInputs()) return;
                        if (position === "manual") {
                          const calculatedResults = CalculateInvestment(
                            Number(
                              initialInvestment
                                .replace(".", "")
                                .replace(",", "."),
                            ),
                            ValueBitcoin,
                            period,
                            periodUnit,
                            marketScenario,
                            parseFloat(exchangeFee),
                            parseFloat(returnRate),
                          );
                          setInvestmentAction?.([
                            {
                              valor0: "Bitcoin",
                              valor1: [
                                calculatedResults.pushValues.v1,
                                calculatedResults.pushValues.v2,
                                calculatedResults.pushValues.v3,
                              ],
                              valor2: calculatedResults.capitalGainMean,
                              valor3:
                                calculatedResults.futureValueMean -
                                calculatedResults.tax,
                              valor4: calculatedResults.bitcoinAmount,
                              valor5: calculatedResults.totalFees,
                              valor6: initialInvestment,
                            },
                          ]);
                          setResults(calculatedResults);
                        } else if (position === "IA") {
                          setShowAIReport(true);
                          setBitcoinInputsAction((prev) => ({
                            ...prev,
                            initialInvestment: initialInvestment,
                            returnRate: returnRate,
                            exchangeFee: exchangeFee,
                            valueBitcoin: ValueBitcoin,
                            period: period,
                            periodUnit: periodUnit,
                            marketScenario: marketScenario,
                          }));
                        }
                      }}
                      className={`w-full rounded-md font-semibold text-white shadow-md transition hover:brightness-110 ${
                        position === "IA"
                          ? "bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700"
                          : "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700"
                      }`}
                    >
                      {position === "IA" ? (
                        <span className="flex items-center gap-2 italic tracking-wide drop-shadow">
                          Simular com IA{" "}
                          <Sparkles className="h-5 w-5 animate-pulse" />
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Simular <Bitcoin className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="absolute right-0 top-1/2 flex h-full w-12 -translate-y-1/2 items-center justify-center border-none bg-black/30 hover:bg-black/50 dark:bg-white/30 dark:hover:bg-white/50"
                          variant="outline"
                        >
                          <ArrowDown className="h-6 w-6 flex-shrink-0 text-white" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Tipo de Simulação</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={position}
                          onValueChange={(value) =>
                            setPosition(value as "manual" | "IA")
                          }
                        >
                          <DropdownMenuRadioItem value="manual">
                            Calcular manualmente
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="IA">
                            Calcular com IA
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Button
                    onClick={resetar}
                    variant="outline"
                    className="w-full border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] dark:border-green-600/20 dark:text-green-100 dark:hover:bg-green-900/30"
                  >
                    Limpar
                  </Button>
                </div>
              </div>

              {/* Medidor de Volatilidade */}
              <div className="mt-4 space-y-2">
                <Label className="flex items-center text-sm font-medium text-[hsl(var(--foreground))]">
                  <AlertTriangle
                    className="mr-2 text-[hsl(var(--destructive))] dark:text-red-400"
                    size={16}
                  />
                  Risco de Volatilidade
                </Label>
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-[hsl(var(--muted))] dark:bg-zinc-700/50">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      marketScenario === "bull"
                        ? "w-1/3 bg-[hsl(var(--primary))] dark:bg-orange-500"
                        : marketScenario === "neutro"
                          ? "w-2/3 bg-yellow-500"
                          : "w-full bg-[hsl(var(--destructive))] dark:bg-red-500"
                    }`}
                  />
                </div>
                <p className="text-xs text-[hsl(var(--muted-foreground))] dark:text-gray-400">
                  {marketScenario === "bull"
                    ? "Alta: Ganhos altos, mas risco de quedas rápidas."
                    : marketScenario === "neutro"
                      ? "Neutro: Variações moderadas, menos previsível."
                      : "Baixa: Risco de perdas significativas."}
                </p>
              </div>

              {/* Resultado da Simulação */}
              {results && (
                <div className="mt-4">
                  <div className="rounded-md border border-orange-400/30 bg-orange-50/30 p-4 shadow-inner dark:border-orange-600/20 dark:bg-zinc-900/40">
                    <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-300">
                      Resumo da Simulação
                    </h3>
                    <Alert
                      variant="destructive"
                      className="mt-2 rounded-md border border-[hsl(var(--destructive))]/30 bg-[hsl(var(--destructive))]/20 p-2 text-sm dark:border-red-500/30 dark:bg-red-500/20"
                    >
                      <AlertDescription className="text-red-700 dark:text-red-200">
                        <span className="font-semibold">CUIDADO:</span> O
                        Bitcoin é um ativo altamente volátil. Os resultados
                        apresentados são estimativas baseadas em cálculos reais
                        e tendem a ser mais precisos em cenários de lucro, mas
                        não garantem retornos efetivos.
                      </AlertDescription>
                    </Alert>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-md border border-orange-400/30 bg-orange-50/20 p-3 text-center dark:border-orange-600/20 dark:bg-zinc-800/40">
                        <p className="text-sm text-orange-700 dark:text-orange-200">
                          Valor Final Estimado
                        </p>
                        <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                          {formatToBRL(results.futureValueMean)}
                          <span className="text-sm font-normal">
                            {" "}
                            (de {formatToBRL(
                              results.futureValuePessimistic,
                            )} a {formatToBRL(results.futureValueOptimistic)})
                          </span>
                        </p>
                      </div>
                      <div className="rounded-md border border-orange-400/30 bg-orange-50/20 p-3 text-center dark:border-orange-600/20 dark:bg-zinc-800/40">
                        <p className="text-sm text-orange-700 dark:text-orange-200">
                          Ganho de Capital
                        </p>
                        <p className="text-xl font-bold text-orange-500 dark:text-orange-400">
                          {formatToBRL(results.capitalGainMean)}
                        </p>
                      </div>
                      <div className="rounded-md border border-orange-400/30 bg-orange-50/20 p-3 text-center dark:border-orange-600/20 dark:bg-zinc-800/40">
                        <p className="text-sm text-orange-700 dark:text-orange-200">
                          Valor Líquido (após IR)
                        </p>
                        <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                          {formatToBRL(results.netValueMean)}
                        </p>
                      </div>
                      <div className="rounded-md border border-orange-400/30 bg-orange-50/20 p-3 text-center dark:border-orange-600/20 dark:bg-zinc-800/40">
                        <p className="text-sm text-orange-700 dark:text-orange-200">
                          Quantidade de BTC
                        </p>
                        <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                          {results.bitcoinAmount.toFixed(8)} BTC
                        </p>
                      </div>
                      <div className="w-full justify-self-center rounded-md border border-orange-400/30 bg-orange-50/20 p-3 text-center dark:border-orange-600/20 dark:bg-zinc-800/40 sm:col-span-2">
                        <p className="text-sm text-orange-700 dark:text-orange-200">
                          Taxas Pagas
                        </p>
                        <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                          {formatToBRL(results.totalFees)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Gráfico de Projeção */}
      <Card className="mt-6 rounded-md border border-[hsl(var(--border))] bg-white shadow-2xl dark:border-orange-600/20 dark:bg-zinc-900/60">
        <CardHeader className="border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary))] py-4 dark:border-orange-600/10 dark:bg-[#1f1f1f]">
          <h3 className="text-lg font-semibold text-orange-400">
            Projeção de Valorização
          </h3>
        </CardHeader>
        <CardContent className="py-6">
          <div className="flex items-center justify-between space-x-4 py-2">
            <p className="text-sm text-[hsl(var(--muted-foreground))] dark:text-gray-400">
              Gráfico mostrando a projeção de valorização do Bitcoin ao longo do
              tempo, ajustada por cenário de mercado.
            </p>
            <Select
              value={timeRange}
              onValueChange={(value) =>
                setTimeRange(value as "360d" | "180d" | "90d" | "7d" | "30d")
              }
            >
              <SelectTrigger
                className="w-[160px] rounded-lg border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:ring-2 focus:ring-orange-500 dark:border-orange-600/20 dark:bg-zinc-800/40 dark:text-orange-100 dark:focus:ring-2 sm:ml-auto"
                aria-label="Selecionar período"
              >
                <SelectValue placeholder="Últimos 3 meses" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-orange-500 bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))] dark:border-orange-600/20 dark:bg-zinc-900 dark:text-orange-100">
                <SelectItem value="360d" className="rounded-lg">
                  Últimos 360 dias
                </SelectItem>
                <SelectItem value="180d" className="rounded-lg">
                  Últimos 180 dias
                </SelectItem>
                <SelectItem value="90d" className="rounded-lg">
                  Últimos 90 dias
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  Últimos 30 dias
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  Últimos 7 dias
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex h-64 w-full items-center justify-center rounded-md bg-[hsl(var(--muted))] dark:bg-zinc-800/40">
            <ChartAreaInteractive
              investmentData={investmentData}
              timeRange={timeRange}
            />
          </div>
        </CardContent>
      </Card>

      {/* Dicas para Investir */}
      <Card className="mt-6 rounded-lg border border-[hsl(var(--border))] bg-white shadow-2xl dark:border-orange-600/20 dark:bg-zinc-900/60">
        <CardHeader className="border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary))] py-4 dark:border-orange-600/10 dark:bg-[#1f1f1f]">
          <h3 className="text-lg font-semibold text-orange-400">
            Dicas para Investir em Bitcoin
          </h3>
        </CardHeader>
        <CardContent className="py-6">
          <div className="space-y-4 text-sm text-[hsl(var(--card-foreground))] dark:text-gray-300">
            <p>
              <strong>1. HODL:</strong> Mantenha seu BTC a longo prazo para
              aproveitar os ciclos de halving.
            </p>
            <p>
              <strong>2. Gestão de Risco:</strong> Invista apenas o que pode
              perder, devido à alta volatilidade.
            </p>
            <p>
              <strong>3. Carteira Segura:</strong> Use carteiras frias (ex.:
              Ledger) para proteger seus BTCs.
            </p>
            <p>
              <strong>4. Acompanhe o Mercado:</strong> Fique atento a notícias
              sobre adoção e regulamentações.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
