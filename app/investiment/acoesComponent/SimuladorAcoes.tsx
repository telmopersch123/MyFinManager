"use client";

import {
  AcoesInputs,
  RelatorioInvestimento,
} from "@/app/(home)/_actions/generate-ai-report/interfaces";
import AiReportButton from "@/app/(home)/_components/ai-report-button";
import {
  customHandleCapitalChange,
  formatToBRL,
} from "@/app/_components/calculadora/formatFunctions";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  AlertTriangle,
  ArrowDown,
  BarChart2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  formatarNumeroVirgulas,
  notCaracteres,
} from "../_components/functions";

import AiSimulationButton from "@/app/(home)/_components/ai-simuation-button";
import AlertLimit from "../_components/alertLimit";
import { CalculeInvestimentoAcoes } from "./calculeInvestimento-acoes";
import { ChartInvestimentAcoes } from "./chart-investmentsAcoes";

export type SimulationResult = {
  finalValue: number;
  capitalGain: number;
  annualRate: number;
  numberOfShares: number;
  monthlyValues: number[];
  monthlyGains: number[];
  monthlyTaxes: number[];
  monthlyBrokerageFees: number[];
};

interface InvestimentGeralProps {
  month: string;
  hasPremiumPlan: boolean;
  setInvestmentAction: React.Dispatch<
    React.SetStateAction<RelatorioInvestimento[]>
  >;
  investiment: RelatorioInvestimento[];
  setAcoesInputsAction: React.Dispatch<React.SetStateAction<AcoesInputs[]>>;
  acoesInputs: AcoesInputs[];
  setQuantityAction: React.Dispatch<React.SetStateAction<number | null>>;
  quantity: number | null;
  setUpdateAction: React.Dispatch<
    React.SetStateAction<RelatorioInvestimento[]>
  >;
  update: RelatorioInvestimento[];
}

export function SimuladorAcoes({
  month,
  hasPremiumPlan,
  setInvestmentAction,
  investiment,
  setAcoesInputsAction,
  acoesInputs,
  setQuantityAction,
  quantity,
  setUpdateAction,
  update,
}: InvestimentGeralProps) {
  // Estados para os campos do formulário
  const [stockPrice, setStockPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [returnRate, setReturnRate] = useState("10");
  const [period, setPeriod] = useState("12");
  const [periodUnit, setPeriodUnit] = useState<"meses" | "anos">("meses");
  const [marketScenario, setMarketScenario] = useState<
    "otimista" | "neutro" | "pessimista"
  >("neutro");
  const [brokerageFee, setBrokerageFee] = useState("10");
  const [taxRate, setTaxRate] = useState("15");
  const [simulationResult, setSimulationResult] =
    useState<SimulationResult | null>(null);
  const [simulationStatus, setSimulationStatus] = useState<string | null>("");
  const [position, setPosition] = useState<"manual" | "IA">("manual");
  const [showAIReport, setShowAIReport] = useState(false);
  const [validClick, setValidClick] = useState(false);
  // Validação dos inputs
  const validarInputs = () => {
    const stockPriceNumber = Number(stockPrice.replace(",", "."));
    const amountNumber = Number(amount.replace(/\./g, "").replace(",", "."));
    const returnRateNumber = Number(returnRate);
    const periodNumber =
      periodUnit === "anos" ? Number(period) * 12 : Number(period);
    const brokerageFeeNumber = Number(brokerageFee);
    const taxRateNumber = Number(taxRate);

    if (isNaN(stockPriceNumber) || stockPriceNumber <= 0) {
      setSimulationStatus("O preço por ação deve ser maior que R$ 0,00.");
      return false;
    }

    if (isNaN(amountNumber) || amountNumber < 100) {
      setSimulationStatus("O valor a investir deve ser no mínimo R$ 100,00.");
      return false;
    }
    if (
      isNaN(returnRateNumber) ||
      returnRateNumber < -50 ||
      returnRateNumber > 50
    ) {
      setSimulationStatus("A taxa de retorno deve estar entre -50% e 50%.");
      return false;
    }
    if (isNaN(periodNumber) || periodNumber < 1) {
      setSimulationStatus("O prazo deve ser pelo menos 1 mês.");
      return false;
    }
    if (isNaN(brokerageFeeNumber) || brokerageFeeNumber < 0) {
      setSimulationStatus("A taxa de corretagem não pode ser negativa.");
      return false;
    }
    if (isNaN(taxRateNumber) || taxRateNumber < 0 || taxRateNumber > 100) {
      setSimulationStatus("A taxa de imposto deve estar entre 0% e 100%.");
      return false;
    }
    setSimulationStatus("");
    return true;
  };

  // Resetar formulário e resultados
  const resetar = () => {
    setStockPrice("");
    setAmount("");
    setReturnRate("10");
    setPeriod("12");
    setPeriodUnit("meses");
    setMarketScenario("neutro");
    setBrokerageFee("10");
    setTaxRate("15");
    setSimulationResult(null);
    setSimulationStatus("");
    setInvestmentAction([]);
  };
  useEffect(() => {
    if (hasPremiumPlan) return;
    setUpdateAction(investiment);
    if (
      (quantity !== null &&
        quantity < 10 &&
        JSON.stringify(investiment) !== JSON.stringify(update) &&
        investiment.length !== 0) ||
      position === "IA"
    ) {
      setQuantityAction((prev) => (prev ?? 0) + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [investiment, validClick]);

  return (
    <div className="mt-4 flex min-h-screen flex-col space-y-10 overflow-auto bg-[hsl(var(--background))] p-2 2xl-custom:overflow-hidden">
      {/* Título da Página */}
      <div className="text-center lg:text-left">
        <h1 className="flex items-center justify-center text-3xl font-bold text-[hsl(var(--foreground))] sm:text-4xl lg:justify-start">
          <TrendingUp className="mr-2 text-[hsl(var(--primary))]" size={32} />
          Simulador de Investimento em Ações
        </h1>
        <p className="mx-auto mt-2 text-base text-[hsl(var(--muted-foreground))] sm:mx-0 lg:max-w-2xl">
          Simule investimentos em ações com projeções realistas para o mercado
          brasileiro!
        </p>
      </div>

      {/* Seção Simulador */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
        {/* Lista de Tipos de Ações */}
        <div className="space-y-6">
          <h2 className="flex items-center text-2xl font-semibold text-[hsl(var(--foreground))]">
            <BarChart2 className="mr-2 text-[hsl(var(--primary))]" size={24} />
            Tipos de Ações
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Card className="relative border border-[hsl(var(--border))] bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-green-600/20 dark:bg-zinc-900/50">
              <CardHeader className="border-b border-[hsl(var(--border))] py-4 dark:border-green-600/10">
                <h3 className="text-lg font-semibold text-[hsl(var(--card-foreground))]">
                  Ações Blue-Chip
                </h3>
                <Badge className="absolute right-4 top-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] dark:bg-green-500 dark:text-white">
                  Baixo Risco
                </Badge>
              </CardHeader>
              <CardContent className="py-4 text-[hsl(var(--card-foreground))]">
                <p className="text-sm">
                  Empresas sólidas como Petrobras (PETR4) ou Vale (VALE3), com
                  estabilidade.
                </p>
              </CardContent>
            </Card>
            <Card className="relative border border-[hsl(var(--border))] bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-yellow-600/20 dark:bg-zinc-900/50">
              <CardHeader className="border-b border-[hsl(var(--border))] py-4 dark:border-yellow-600/10">
                <h3 className="text-lg font-semibold text-[hsl(var(--card-foreground))]">
                  Ações de Crescimento
                </h3>
                <Badge className="absolute right-4 top-4 bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] dark:bg-red-500 dark:text-white">
                  Alto Risco
                </Badge>
              </CardHeader>
              <CardContent className="py-4 text-[hsl(var(--card-foreground))]">
                <p className="text-sm">
                  Empresas como Magazine Luiza (MGLU3) ou Nubank (NUBR4), com
                  alta volatilidade.
                </p>
              </CardContent>
            </Card>
            <Card className="relative border border-[hsl(var(--border))] bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-green-600/20 dark:bg-zinc-900/50">
              <CardHeader className="border-b border-[hsl(var(--border))] py-4 dark:border-green-600/10">
                <h3 className="text-lg font-semibold text-[hsl(var(--card-foreground))]">
                  Ações de Dividendos
                </h3>
                <Badge className="absolute right-4 top-4 bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] dark:bg-yellow-500 dark:text-white">
                  Médio Risco
                </Badge>
              </CardHeader>
              <CardContent className="py-4 text-[hsl(var(--card-foreground))]">
                <p className="text-sm">
                  Empresas como Itaú (ITUB4) ou Ambev (ABEV3), ideais para renda
                  passiva.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Formulário do Simulador */}
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
              acoesInputs={acoesInputs}
              category="Calcular-acoes"
              openExternally={showAIReport}
              onOpenChange={setShowAIReport}
              setValidClick={setValidClick}
              quantity={quantity}
            />
            <AiReportButton
              month={month}
              hasPremiumPlan={hasPremiumPlan}
              investiment={investiment}
              category="acoes"
              quantity={quantity}
              setValidClick={setValidClick}
            />
          </div>
          <Card className="border border-[hsl(var(--border))] bg-white shadow-2xl backdrop-blur-md dark:border-green-600/20 dark:bg-zinc-900/60">
            <CardHeader className="rounded-lg border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary))] py-4 dark:border-green-600/10 dark:bg-[#1f1f1f]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[hsl(var(--primary))]">
                  Simulador de Ações
                </h2>
                <TrendingUp className="text-[hsl(var(--primary))]" size={24} />
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-6">
              {/* Formulário */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="stock-price"
                    className="text-[hsl(var(--foreground))]"
                  >
                    Preço por Ação (R$)
                  </Label>
                  <Input
                    id="stock-price"
                    type="text"
                    min="0.01"
                    step="0.01"
                    value={stockPrice}
                    onChange={(e) => {
                      const valueFormat = formatarNumeroVirgulas(
                        e.target.value,
                      );
                      setStockPrice(valueFormat);
                      setSimulationStatus("");
                    }}
                    placeholder="Ex.: 35,50"
                    className="border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100 dark:placeholder:text-green-300 dark:focus:ring-2 dark:focus:ring-green-500"
                    aria-required="true"
                  />
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    Consulte o preço em Status Invest ou sua corretora.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="amount"
                    className="text-[hsl(var(--foreground))]"
                  >
                    Valor a Investir (R$)
                  </Label>
                  <Input
                    id="amount"
                    type="text"
                    min="0.01"
                    step="0.01"
                    value={amount}
                    onChange={(e) => {
                      customHandleCapitalChange(e, setAmount);
                      setSimulationStatus("");
                    }}
                    placeholder="R$ 1.000,00"
                    className="border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100 dark:placeholder:text-green-300 dark:focus:ring-2 dark:focus:ring-green-500"
                    aria-required="true"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="return-rate"
                    className="text-[hsl(var(--foreground))]"
                  >
                    Taxa de Retorno Anual Estimada (%)
                  </Label>
                  <Input
                    id="return-rate"
                    type="text"
                    value={returnRate}
                    onChange={(e) => {
                      const value = notCaracteres(e.target.value || "0");
                      setReturnRate(value);
                      setSimulationStatus("");
                    }}
                    placeholder="10"
                    className="border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100 dark:placeholder:text-green-300 dark:focus:ring-2 dark:focus:ring-green-500"
                    aria-required="true"
                  />
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    {marketScenario === "otimista"
                      ? "Taxa sugerida: +15% a.a."
                      : marketScenario === "neutro"
                        ? "Taxa sugerida: +8% a.a."
                        : "Taxa sugerida: -5% a.a."}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="period"
                    className="text-[hsl(var(--foreground))]"
                  >
                    Prazo ({periodUnit})
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="period"
                      type="number"
                      min="1"
                      max={periodUnit === "anos" ? "30" : "360"}
                      value={period}
                      onChange={(e) => {
                        setPeriod(e.target.value);
                        setSimulationStatus("");
                      }}
                      placeholder="12"
                      className="border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100 dark:placeholder:text-green-300 dark:focus:ring-2 dark:focus:ring-green-500"
                      aria-required="true"
                    />
                    <Select
                      value={periodUnit}
                      onValueChange={(value) => {
                        setPeriodUnit(value as "meses" | "anos");
                        setSimulationStatus("");
                      }}
                    >
                      <SelectTrigger className="w-[120px] border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border border-[hsl(var(--border))] bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))] dark:border-green-600/20 dark:bg-zinc-900 dark:text-green-100">
                        <SelectItem value="meses">Meses</SelectItem>
                        <SelectItem value="anos">Anos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="market-scenario"
                    className="text-[hsl(var(--foreground))]"
                  >
                    Cenário de Mercado
                  </Label>
                  <Select
                    value={marketScenario}
                    onValueChange={(value) => {
                      setMarketScenario(
                        value as "otimista" | "neutro" | "pessimista",
                      );
                      setSimulationStatus("");
                    }}
                  >
                    <SelectTrigger
                      id="market-scenario"
                      className="border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100 dark:focus:ring-2 dark:focus:ring-green-500"
                    >
                      <SelectValue placeholder="Selecione o cenário" />
                    </SelectTrigger>
                    <SelectContent className="border border-[hsl(var(--border))] bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))] dark:border-green-600/20 dark:bg-zinc-900 dark:text-green-100">
                      <SelectItem value="otimista">Otimista (Alta)</SelectItem>
                      <SelectItem value="neutro">Neutro (Estável)</SelectItem>
                      <SelectItem value="pessimista">
                        Pessimista (Baixa)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="brokerage-fee"
                    className="text-[hsl(var(--foreground))]"
                  >
                    Taxa de Corretagem (R$)
                  </Label>
                  <Input
                    id="brokerage-fee"
                    type="text"
                    value={brokerageFee}
                    onChange={(e) => {
                      const valueFormat = formatarNumeroVirgulas(
                        e.target.value,
                      );
                      setBrokerageFee(valueFormat);
                      setSimulationStatus("");
                    }}
                    placeholder="Ex.: 10,00"
                    className="border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100 dark:placeholder:text-green-300 dark:focus:ring-2 dark:focus:ring-green-500"
                    aria-required="true"
                  />
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    Insira 0 se sua corretora não cobra corretagem.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="tax-rate"
                    className="text-[hsl(var(--foreground))]"
                  >
                    Imposto sobre Ganho de Capital (%)
                  </Label>
                  <Input
                    id="tax-rate"
                    type="text"
                    value={taxRate}
                    onChange={(e) => {
                      const valueFormat = formatarNumeroVirgulas(
                        e.target.value,
                      );
                      setTaxRate(valueFormat);
                      setSimulationStatus("");
                    }}
                    placeholder="Ex.: 15,0"
                    className="border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100 dark:placeholder:text-green-300 dark:focus:ring-2 dark:focus:ring-green-500"
                    aria-required="true"
                  />
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    Padrão: 15% para operações normais na B3.
                  </p>
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
                        if (validarInputs()) {
                          if (position === "manual") {
                            CalculeInvestimentoAcoes({
                              stockPrice: Number(stockPrice.replace(",", ".")),
                              amount: Number(
                                amount.replace(/\./g, "").replace(",", "."),
                              ),
                              period: Number(period),
                              brokerageFee: Number(
                                brokerageFee.replace(",", "."),
                              ),
                              annualReturnRate: Number(
                                returnRate.replace(",", "."),
                              ),
                              taxRate: Number(taxRate.replace(",", ".")),
                              periodUnit:
                                periodUnit === "meses" ? "months" : "years",
                              marketScenario:
                                marketScenario === "otimista"
                                  ? "optimistic"
                                  : marketScenario === "neutro"
                                    ? "neutral"
                                    : "pessimistic",
                              setSimulationResult,
                              setError: setSimulationStatus,
                              setInvestment: setInvestmentAction ?? (() => {}),
                            });
                          } else if (position === "IA") {
                            setShowAIReport(true);
                            setAcoesInputsAction?.((prev) => ({
                              ...prev,
                              stockPrice,
                              amount,
                              returnRate,
                              brokerageFee,
                              taxRate,
                              marketScenario,
                              period,
                              periodUnit,
                            }));
                          }
                        }
                      }}
                      className={`w-full bg-[hsl(var(--primary))] font-semibold text-[hsl(var(--primary-foreground))] shadow-md transition hover:brightness-110 ${
                        position === "IA"
                          ? "from-emerald-500 via-emerald-600 to-emerald-700 dark:bg-gradient-to-r"
                          : "dark:bg-gradient-to-r dark:from-green-500 dark:via-green-600 dark:to-green-700"
                      }`}
                    >
                      {position === "IA" ? (
                        <span className="flex items-center gap-2 italic tracking-wide text-[hsl(var(--primary-foreground))] drop-shadow">
                          Simular com IA{" "}
                          <Sparkles className="h-5 w-5 animate-pulse" />
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Simular <TrendingUp className="h-4 w-4" />
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
              <div className="space-y-2">
                <Label className="flex items-center text-[hsl(var(--foreground))]">
                  <AlertTriangle
                    className="mr-2 text-[hsl(var(--destructive))] dark:text-yellow-400"
                    size={16}
                  />
                  Volatilidade Estimada
                </Label>
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-[hsl(var(--muted))] dark:bg-zinc-700/50">
                  <div
                    className={`h-full transition-all duration-500 ${
                      marketScenario === "otimista"
                        ? "w-1/3 bg-[hsl(var(--primary))] dark:bg-green-500"
                        : marketScenario === "neutro"
                          ? "w-2/3 bg-[hsl(var(--warning))] dark:bg-yellow-500"
                          : "w-full bg-[hsl(var(--destructive))] dark:bg-red-500"
                    }`}
                  />
                </div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  {marketScenario === "otimista"
                    ? "Baixa volatilidade: mercado em alta."
                    : marketScenario === "neutro"
                      ? "Volatilidade moderada: mercado estável."
                      : "Alta volatilidade: mercado em baixa."}
                </p>
              </div>
              {/* Resultado da Simulação */}
              {simulationResult && (
                <div className="space-y-4">
                  <div className="rounded-md border border-green-400/30 bg-green-50/30 p-4 shadow-inner dark:border-green-600/20 dark:bg-zinc-900/40">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-300">
                      Resumo da Simulação
                    </h3>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-md border border-green-400/30 bg-green-50/20 p-3 dark:border-green-600/20 dark:bg-zinc-800/40">
                        <p className="text-sm text-green-700 dark:text-green-200">
                          Número de Ações
                        </p>
                        <p className="text-xl font-bold text-green-600 dark:text-green-400">
                          {simulationResult.numberOfShares}
                        </p>
                      </div>
                      <div className="rounded-md border border-green-400/30 bg-green-50/20 p-3 dark:border-green-600/20 dark:bg-zinc-800/40">
                        <p className="text-sm text-green-700 dark:text-green-200">
                          Valor Final Estimado
                        </p>
                        <p className="text-xl font-bold text-green-600 dark:text-green-400">
                          {formatToBRL(simulationResult.finalValue.toFixed(2))}
                        </p>
                      </div>
                      <div className="rounded-md border border-green-400/30 bg-green-50/20 p-3 dark:border-green-600/20 dark:bg-zinc-800/40">
                        <p className="text-sm text-green-700 dark:text-green-200">
                          Ganho de Capital Líquido
                        </p>
                        <p className="text-xl font-bold text-green-500 dark:text-green-400">
                          {formatToBRL(simulationResult.capitalGain.toFixed(2))}
                        </p>
                      </div>
                      <div className="rounded-md border border-green-400/30 bg-green-50/20 p-3 dark:border-green-600/20 dark:bg-zinc-800/40">
                        <p className="text-sm text-green-700 dark:text-green-200">
                          Taxa Anual Estimada
                        </p>
                        <p className="text-xl font-bold text-green-600 dark:text-green-300">
                          {simulationResult.annualRate.toFixed(2)}% a.a.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="max-h-[300px] overflow-auto rounded-md border border-green-400/30 dark:border-green-600/20">
                    <table className="min-w-full divide-y divide-green-400/20 dark:divide-green-600/20">
                      <thead className="bg-green-50 dark:bg-[#1f1f1f]">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-green-700 dark:text-green-200"
                          >
                            Mês
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-green-700 dark:text-green-200"
                          >
                            Valor
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-green-700 dark:text-green-200"
                          >
                            Ganhos
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-green-700 dark:text-green-200"
                          >
                            Impostos
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-green-700 dark:text-green-200"
                          >
                            Corretagem
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-green-400/20 bg-green-50/20 dark:divide-green-600/20 dark:bg-zinc-900/40">
                        {simulationResult.monthlyValues.map((value, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0
                                ? "bg-white/30 dark:bg-zinc-900/30"
                                : "bg-white/10 dark:bg-zinc-900/10"
                            }
                          >
                            <td className="whitespace-nowrap px-4 py-2 text-sm text-green-700 dark:text-green-100">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-sm text-green-700 dark:text-green-100">
                              {formatToBRL(value.toFixed(2))}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-sm text-green-600 dark:text-green-400">
                              {formatToBRL(
                                simulationResult.monthlyGains[index].toFixed(2),
                              )}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-sm text-red-500 dark:text-red-400">
                              {formatToBRL(
                                simulationResult.monthlyTaxes[index].toFixed(2),
                              )}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-sm text-red-500 dark:text-red-400">
                              {formatToBRL(
                                simulationResult.monthlyBrokerageFees[
                                  index
                                ].toFixed(2),
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Gráfico de Projeção */}
      {simulationResult && simulationResult.numberOfShares > 0 && (
        <Card className="mt-6 rounded-lg border border-[hsl(var(--border))] bg-white shadow-2xl dark:border-green-600/20 dark:bg-zinc-900/60">
          <CardHeader className="border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary))] py-4 dark:border-green-600/10 dark:bg-[#1f1f1f]">
            <h3 className="text-lg font-semibold text-[hsl(var(--primary))] dark:text-green-300">
              Projeção de Crescimento
            </h3>
            <span className="text-sm text-[hsl(var(--muted-foreground))]">
              Valor Final Estimado
            </span>
          </CardHeader>
          <CardContent className="py-6">
            <div className="flex h-64 w-full items-center justify-center rounded-md bg-[hsl(var(--muted))] dark:bg-zinc-800/40">
              <ChartInvestimentAcoes {...simulationResult} />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 text-[hsl(var(--muted-foreground))] dark:border-green-600/20 dark:bg-zinc-900/40 dark:text-gray-400">
        <p>
          Simulação realizada em {format(new Date(), "PP", { locale: ptBR })}.
          Valores meramente ilustrativos.
        </p>
        <p className="mt-2">
          Ações como as da Petrobras (PETR4) são populares entre investidores
          brasileiros, mas seu valor pode oscilar bastante. Avalie o risco e
          busque diversificação antes de investir.
        </p>
      </div>
    </div>
  );
}
