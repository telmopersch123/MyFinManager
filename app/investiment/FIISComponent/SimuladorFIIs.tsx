"use client";

import { useEffect, useState } from "react";

import {
  ArrowDown,
  Building2,
  DollarSign,
  PieChart,
  Sparkles,
} from "lucide-react";

import {
  FIIsInputs,
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
import { Switch } from "@/app/_components/ui/switch";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatarNumeroVirgulasOne } from "../_components/functions";

import AiSimulationButton from "@/app/(home)/_components/ai-simuation-button";
import AlertLimit from "../_components/alertLimit";
import { CalculeInvestmentFundos } from "./calculeInvestimentFundos";
import { ChartInvestimentFundos } from "./chart-investmentsFundos";

export interface SimulationResults {
  finalValue: number;
  monthlyDividends: number;
  capitalGain: number;
  annualizedYield: number;
  dataPoints: {
    valueSub1: number;
    valueSub2: number;
    valueSub3: number;
    grossDividend: number; // Dividendo líquido mensal
    sharePrice: number; // Preço da cota no mês
    capitalGain: number; // Ganho de capital mensal bruto
    totalFees: number; // Taxas pagas no mês
    nominalValue: number; // Valor do portfólio sem ajuste pela inflação
  }[];
}

interface InvestimentGeralProps {
  month: string;
  hasPremiumPlan: boolean;
  setInvestmentAction: React.Dispatch<
    React.SetStateAction<RelatorioInvestimento[]>
  >;
  investiment: RelatorioInvestimento[];
  setFiisInputsAction: React.Dispatch<React.SetStateAction<FIIsInputs[]>>;
  fiisInputs: FIIsInputs[];
  setQuantityAction: React.Dispatch<React.SetStateAction<number | null>>;
  quantity: number | null;
  setUpdateAction: React.Dispatch<
    React.SetStateAction<RelatorioInvestimento[]>
  >;
  update: RelatorioInvestimento[];
}

export function SimuladorFIIs({
  month,
  hasPremiumPlan,
  setInvestmentAction,
  investiment,
  setFiisInputsAction,
  fiisInputs,
  setQuantityAction,
  quantity,
  setUpdateAction,
  update,
}: InvestimentGeralProps) {
  // Estados
  const [fiiType, setFiiType] = useState<"tijolo" | "papel" | "hibrido">(
    "tijolo",
  );
  const [amount, setAmount] = useState<string>("");
  const [sharePrice, setSharePrice] = useState<string>("");
  const [dividendYield, setDividendYield] = useState<string>("0,8");
  const [appreciationRate, setAppreciationRate] = useState<string>("3");
  const [adminFee, setAdminFee] = useState<string>("1");
  const [performanceFee, setPerformanceFee] = useState<string>("0");
  const [inflationRate, setInflationRate] = useState<string>("4");
  const [taxRate, setTaxRate] = useState<string>("20");
  const [period, setPeriod] = useState<string>("12");
  const [periodUnit, setPeriodUnit] = useState<"meses" | "anos">("meses");
  const [marketScenario, setMarketScenario] = useState<
    "otimista" | "neutro" | "pessimista"
  >("neutro");
  const [reinvestDividends, setReinvestDividends] = useState<boolean>(false);
  const [results, setResults] = useState<SimulationResults>({
    finalValue: 0,
    monthlyDividends: 0,
    capitalGain: 0,
    annualizedYield: 0,
    dataPoints: [],
  });
  const [position, setPosition] = useState<"manual" | "IA">("manual");
  const [showAIReport, setShowAIReport] = useState(false);
  const [simulationStatus, setSimulationStatus] = useState<string>("");
  const [validClick, setValidClick] = useState(false);
  // Ajustar Dividend Yield com base no tipo de FII e cenário de mercado
  useEffect(() => {
    let baseYield: number;
    if (fiiType === "tijolo")
      baseYield = 0.75; // 9% a.a. ≈ 0.75% a.m.
    else if (fiiType === "papel")
      baseYield = 0.875; // 10.5% a.a. ≈ 0.875% a.m.
    else baseYield = 0.79; // 9.5% a.a. ≈ 0.79% a.m.

    if (marketScenario === "otimista") baseYield *= 1.1;
    else if (marketScenario === "pessimista") baseYield *= 0.9;

    setDividendYield(baseYield.toFixed(2).replace(".", ","));
  }, [fiiType, marketScenario]);

  // Validação dos inputs
  const validarInputs = () => {
    const amountNumber = Number(amount.replace(".", "").replace(",", "."));
    const sharePriceNumber = Number(
      sharePrice.replace(".", "").replace(",", "."),
    );
    const dividendYieldNumber = Number(dividendYield.replace(",", ".")) / 100; // Dividir por 100 para porcentagem
    const appreciationRateNumber = Number(appreciationRate.replace(",", "."));
    const adminFeeNumber = Number(adminFee.replace(",", "."));
    const performanceFeeNumber = Number(performanceFee.replace(",", "."));
    const inflationRateNumber = Number(inflationRate.replace(",", "."));
    const taxRateNumber = Number(taxRate.replace(",", "."));
    const periodNumber =
      periodUnit === "anos" ? Number(period) * 12 : Number(period);

    if (isNaN(amountNumber) || amountNumber < 100) {
      setSimulationStatus("O valor a investir deve ser no mínimo R$ 100,00.");
      return false;
    }
    if (isNaN(sharePriceNumber) || sharePriceNumber <= 0) {
      setSimulationStatus("O preço por cota deve ser maior que R$ 0,00.");
      return false;
    }
    if (
      isNaN(dividendYieldNumber) ||
      dividendYieldNumber < 0 ||
      dividendYieldNumber > 0.05
    ) {
      setSimulationStatus("O Dividend Yield mensal deve estar entre 0% e 5%.");
      return false;
    }
    if (
      isNaN(appreciationRateNumber) ||
      appreciationRateNumber < -10 ||
      appreciationRateNumber > 20
    ) {
      setSimulationStatus(
        "A taxa de valorização anual deve estar entre -10% e 20%.",
      );
      return false;
    }
    if (isNaN(adminFeeNumber) || adminFeeNumber < 0 || adminFeeNumber > 5) {
      setSimulationStatus("A taxa de administração deve estar entre 0% e 5%.");
      return false;
    }
    if (
      isNaN(performanceFeeNumber) ||
      performanceFeeNumber < 0 ||
      performanceFeeNumber > 20
    ) {
      setSimulationStatus("A taxa de performance deve estar entre 0% e 20%.");
      return false;
    }
    if (
      isNaN(inflationRateNumber) ||
      inflationRateNumber < 0 ||
      inflationRateNumber > 10
    ) {
      setSimulationStatus("A taxa de inflação deve estar entre 0% e 10%.");
      return false;
    }
    if (isNaN(taxRateNumber) || taxRateNumber < 0 || taxRateNumber > 30) {
      setSimulationStatus("A taxa de imposto deve estar entre 0% e 30%.");
      return false;
    }
    if (isNaN(periodNumber) || periodNumber < 1) {
      setSimulationStatus("O prazo deve ser pelo menos 1 mês.");
      return false;
    }
    setSimulationStatus("");
    return true;
  };

  const resetar = () => {
    setAmount("");
    setSharePrice("");
    setDividendYield("0,75");
    setAppreciationRate("3");
    setAdminFee("1");
    setPerformanceFee("0");
    setInflationRate("4");
    setTaxRate("20");
    setPeriod("12");
    setPeriodUnit("meses");
    setMarketScenario("neutro");
    setShowAIReport(false);
    setInvestmentAction([]);
  };

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
        setQuantityAction((prev) => (prev !== null ? prev : 0) + 1);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [investiment, validClick]);

  return (
    <div className="mt-4 flex min-h-screen flex-col space-y-10 bg-[hsl(var(--background))] p-4">
      {/* Título da Página */}
      <div className="text-center lg:text-left">
        <h1 className="flex items-center justify-center text-3xl font-bold text-[hsl(var(--foreground))] sm:text-4xl lg:justify-start">
          <Building2 className="mr-2 text-[hsl(var(--primary))]" size={32} />
          Simulador de Fundos Imobiliários
        </h1>
        <p className="mx-auto mt-2 text-base text-[hsl(var(--muted-foreground))] sm:mx-0 lg:max-w-2xl">
          Planeje seus investimentos em <strong>FIIs</strong> e descubra o
          potencial de renda passiva mensal com base em rendimentos e
          valorização de cotas.
        </p>
      </div>

      {/* Seção Simulador */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
        {/* Lista de Tipos de FIIs */}
        <div className="space-y-6">
          <h2 className="flex items-center text-2xl font-semibold text-[hsl(var(--foreground))]">
            <PieChart className="mr-2 text-[hsl(var(--primary))]" size={24} />
            Tipos de Fundos Imobiliários
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Card className="relative border border-[hsl(var(--border))] bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-green-600/20 dark:bg-zinc-900/50">
              <CardHeader className="border-b border-[hsl(var(--border))] py-4 dark:border-green-600/10">
                <h3 className="text-lg font-semibold text-[hsl(var(--card-foreground))]">
                  FII de Tijolo
                </h3>
                <Badge className="absolute right-4 top-4 !bg-yellow-600/80 text-[hsl(var(--primary-foreground))] dark:text-white">
                  Médio Risco
                </Badge>
              </CardHeader>
              <CardContent className="py-4 text-[hsl(var(--card-foreground))]">
                <p className="text-sm">
                  Fundos que investem em imóveis físicos (ex.: KNRI11, HGLG11),
                  como shoppings ou galpões, gerando renda via aluguéis.
                  Dividend Yield: ~8-10% a.a.
                </p>
              </CardContent>
            </Card>
            <Card className="relative border border-[hsl(var(--border))] bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-yellow-600/20 dark:bg-zinc-900/50">
              <CardHeader className="border-b border-[hsl(var(--border))] py-4 dark:border-yellow-600/10">
                <h3 className="text-lg font-semibold text-[hsl(var(--card-foreground))]">
                  FII de Papel
                </h3>
                <Badge className="absolute right-4 top-4 bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] dark:bg-yellow-500/80 dark:text-white">
                  Médio a Alto Risco
                </Badge>
              </CardHeader>
              <CardContent className="py-4 text-[hsl(var(--card-foreground))]">
                <p className="text-sm">
                  Fundos que investem em títulos imobiliários (ex.: MXRF11,
                  XPCI11), como CRIs, com retornos atrelados a juros. Dividend
                  Yield: ~9-12% a.a.
                </p>
              </CardContent>
            </Card>
            <Card className="relative border border-[hsl(var(--border))] bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-green-600/20 dark:bg-zinc-900/50">
              <CardHeader className="border-b border-[hsl(var(--border))] py-4 dark:border-green-600/10">
                <h3 className="text-lg font-semibold text-[hsl(var(--card-foreground))]">
                  FII Híbrido
                </h3>
                <Badge className="absolute right-4 top-4 !bg-yellow-600/80 text-[hsl(var(--primary-foreground))] dark:text-white">
                  Médio Risco
                </Badge>
              </CardHeader>
              <CardContent className="py-4 text-[hsl(var(--card-foreground))]">
                <p className="text-sm">
                  Combinam imóveis e títulos (ex.: BRCR11, HGRE11), equilibrando
                  renda e valorização. Dividend Yield: ~8-11% a.a.
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
              fiisInputs={fiisInputs}
              category="Calcular-FIIs"
              openExternally={showAIReport}
              onOpenChange={setShowAIReport}
              setValidClick={setValidClick}
              quantity={quantity}
            />
            <AiReportButton
              month={month}
              hasPremiumPlan={hasPremiumPlan}
              investiment={investiment}
              category="FIIS"
              quantity={quantity}
              setValidClick={setValidClick}
            />
          </div>
          <Card className="border border-[hsl(var(--border))] bg-white shadow-2xl backdrop-blur-md dark:border-green-600/20 dark:bg-zinc-900/60">
            <CardHeader className="rounded-lg border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary))] py-4 dark:border-green-600/10 dark:bg-[#1f1f1f]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[hsl(var(--primary))]">
                  Simulador de FIIs
                </h2>
                <DollarSign className="text-[hsl(var(--primary))]" size={24} />
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="fii-type"
                    className="text-[hsl(var(--foreground))]"
                  >
                    Tipo de Fundo Imobiliário
                  </Label>
                  <Select
                    value={fiiType}
                    onValueChange={(value: string) =>
                      setFiiType(value as "tijolo" | "papel" | "hibrido")
                    }
                  >
                    <SelectTrigger
                      id="fii-type"
                      className="border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100"
                    >
                      <SelectValue placeholder="Selecione o tipo de FII" />
                    </SelectTrigger>
                    <SelectContent className="border border-[hsl(var(--border))] bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))] dark:border-green-600/20 dark:bg-zinc-900 dark:text-green-100">
                      <SelectItem value="tijolo">FII de Tijolo</SelectItem>
                      <SelectItem value="papel">FII de Papel</SelectItem>
                      <SelectItem value="hibrido">FII Híbrido</SelectItem>
                    </SelectContent>
                  </Select>
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
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) => {
                      customHandleCapitalChange(e, setAmount);
                      setSimulationStatus("");
                    }}
                    placeholder="R$ 1.000,00"
                    className="border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100 dark:placeholder:text-green-300 dark:focus:ring-2 dark:focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="share-price"
                    className="text-[hsl(var(--foreground))]"
                  >
                    Preço Inicial por Cota (R$)
                  </Label>
                  <Input
                    id="share-price"
                    type="text"
                    min="0"
                    step="0.01"
                    value={sharePrice}
                    onChange={(e) => {
                      customHandleCapitalChange(e, setSharePrice);
                      setSimulationStatus("");
                    }}
                    placeholder="R$ 100,00"
                    className="border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100 dark:placeholder:text-green-300 dark:focus:ring-2 dark:focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="dividend-yield"
                    className="text-[hsl(var(--foreground))]"
                  >
                    Dividend Yield Mensal Estimado (%)
                  </Label>
                  <Input
                    id="dividend-yield"
                    type="text"
                    min="0"
                    step="0.01"
                    value={dividendYield}
                    onChange={(e) => {
                      const valueFormatado = formatarNumeroVirgulasOne(
                        e.target.value,
                      );
                      setDividendYield(valueFormatado);
                      setSimulationStatus("");
                    }}
                    placeholder="Ex: 0,8"
                    className="border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100 dark:placeholder:text-green-300 dark:focus:ring-2 dark:focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="appreciation-rate"
                    className="text-[hsl(var(--foreground))]"
                  >
                    Taxa de Valorização Anual da Cota (%)
                  </Label>
                  <Input
                    id="appreciation-rate"
                    type="text"
                    min="0"
                    step="0.1"
                    value={appreciationRate}
                    onChange={(e) => {
                      const valueFormatado = formatarNumeroVirgulasOne(
                        e.target.value,
                      );
                      setAppreciationRate(valueFormatado);
                      setSimulationStatus("");
                    }}
                    placeholder="3"
                    className="border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100 dark:placeholder:text-green-300 dark:focus:ring-2 dark:focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="admin-fee"
                    className="text-[hsl(var(--foreground))]"
                  >
                    Taxa de Administração Anual (%)
                  </Label>
                  <Input
                    id="admin-fee"
                    type="text"
                    min="0"
                    step="0.1"
                    value={adminFee}
                    onChange={(e) => {
                      const valueFormatado = formatarNumeroVirgulasOne(
                        e.target.value,
                      );
                      setAdminFee(valueFormatado);
                      setSimulationStatus("");
                    }}
                    placeholder="1"
                    className="border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100 dark:placeholder:text-green-300 dark:focus:ring-2 dark:focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="performance-fee"
                    className="text-[hsl(var(--foreground))]"
                  >
                    Taxa de Performance Anual (%)
                  </Label>
                  <Input
                    id="performance-fee"
                    type="text"
                    min="0"
                    step="0.1"
                    value={performanceFee}
                    onChange={(e) => {
                      const valueFormatado = formatarNumeroVirgulasOne(
                        e.target.value,
                      );
                      setPerformanceFee(valueFormatado);
                      setSimulationStatus("");
                    }}
                    placeholder="0"
                    className="border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100 dark:placeholder:text-green-300 dark:focus:ring-2 dark:focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="inflation-rate"
                    className="text-[hsl(var(--foreground))]"
                  >
                    Taxa de Inflação Anual (%)
                  </Label>
                  <Input
                    id="inflation-rate"
                    type="text"
                    min="0"
                    step="0.1"
                    value={inflationRate}
                    onChange={(e) => {
                      const valueFormatado = formatarNumeroVirgulasOne(
                        e.target.value,
                      );
                      setInflationRate(valueFormatado);
                      setSimulationStatus("");
                    }}
                    placeholder="4"
                    className="border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100 dark:placeholder:text-green-300 dark:focus:ring-2 dark:focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="tax-rate"
                    className="text-[hsl(var(--foreground))]"
                  >
                    Taxa de Imposto sobre Ganho de Capital (%)
                  </Label>
                  <Input
                    id="tax-rate"
                    type="text"
                    min="0"
                    step="0.1"
                    value={taxRate}
                    onChange={(e) => {
                      setTaxRate(e.target.value);
                      setSimulationStatus("");
                    }}
                    placeholder="20"
                    className="border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100 dark:placeholder:text-green-300 dark:focus:ring-2 dark:focus:ring-green-500"
                  />
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
                      type="text"
                      min="1"
                      value={period}
                      onChange={(e) => {
                        setPeriod(e.target.value);
                        setSimulationStatus("");
                      }}
                      placeholder="12"
                      className="border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100 dark:placeholder:text-green-300 dark:focus:ring-2 dark:focus:ring-green-500"
                    />
                    <Select
                      value={periodUnit}
                      onValueChange={(value: string) => {
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
                    onValueChange={(value: string) =>
                      setMarketScenario(
                        value as "otimista" | "neutro" | "pessimista",
                      )
                    }
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
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="reinvest"
                    className="text-[hsl(var(--foreground))]"
                  >
                    Reinvestir Dividendos
                  </Label>
                  <Switch
                    id="reinvest"
                    checked={reinvestDividends}
                    onCheckedChange={(checked: boolean) =>
                      setReinvestDividends(checked)
                    }
                    className="dark:data-[state=checked]:bg-green-500 dark:data-[state=unchecked]:bg-zinc-700"
                  />
                </div>
                {simulationStatus && (
                  <p className="text-xs text-[hsl(var(--destructive))] dark:text-red-400">
                    {simulationStatus}
                  </p>
                )}
                <div className="flex gap-2">
                  <div className="relative w-full">
                    <Button
                      disabled={(quantity ?? 0) >= 10 && !hasPremiumPlan}
                      onClick={() => {
                        if (validarInputs()) {
                          if (position === "manual") {
                            CalculeInvestmentFundos({
                              amount,
                              sharePrice,
                              dividendYield,
                              appreciationRate,
                              adminFee,
                              performanceFee,
                              inflationRate,
                              taxRate,
                              periodUnit,
                              period,
                              reinvestDividends,
                              setResults,
                              setInvestment: setInvestmentAction ?? (() => {}),
                            });
                          } else if (position === "IA") {
                            setShowAIReport(true);
                            setFiisInputsAction((prev) => [
                              ...prev,
                              {
                                fiiType,
                                amount,
                                sharePrice,
                                dividendYield,
                                appreciationRate,
                                adminFee,
                                performanceFee,
                                inflationRate,
                                taxRate,
                                reinvestDividends,
                                periodUnit,
                                period,
                                marketScenario,
                              },
                            ]);
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
                        <span className="flex items-center gap-2 italic tracking-wide drop-shadow">
                          Simular com IA{" "}
                          <Sparkles className="h-5 w-5 animate-pulse" />
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Simular <DollarSign className="h-4 w-4" />
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
              {/* Medidor de Vacância */}
              <div className="space-y-2">
                <Label className="flex items-center text-[hsl(var(--foreground))]">
                  <Building2
                    className="mr-2 text-[hsl(var(--destructive))] dark:text-yellow-400"
                    size={16}
                  />
                  Taxa de Vacância Estimada
                </Label>
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-[hsl(var(--muted))] dark:bg-zinc-700/50">
                  <div
                    className={`h-full transition-all duration-500 ${
                      marketScenario === "otimista"
                        ? "w-1/5 bg-[hsl(var(--primary))] dark:bg-green-500"
                        : marketScenario === "neutro"
                          ? "w-2/5 bg-yellow-500"
                          : "w-3/5 bg-[hsl(var(--destructive))] dark:bg-red-500"
                    }`}
                  />
                </div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  {marketScenario === "otimista"
                    ? "Baixa vacância: ~5% (alta ocupação)."
                    : marketScenario === "neutro"
                      ? "Vacância moderada: ~15% (estabilidade)."
                      : "Alta vacância: ~25% (mercado em baixa)."}
                </p>
              </div>
              {/* Resultado da Simulação */}
              {results.finalValue > 0 && (
                <div className="space-y-4">
                  <div className="rounded-md border border-green-400/30 bg-green-50/30 p-4 shadow-inner dark:border-green-600/20 dark:bg-zinc-900/40">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-300">
                      Resumo da Simulação (Ajustado pela inflação)
                    </h3>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-md border border-green-400/30 bg-green-50/20 p-3 dark:border-green-600/20 dark:bg-zinc-800/40">
                        <p className="text-sm text-green-700 dark:text-green-200">
                          Valor Final Estimado
                        </p>
                        <p className="text-xl font-bold text-green-600 dark:text-green-400">
                          {formatToBRL(results.finalValue.toFixed(2))}
                        </p>
                      </div>
                      <div className="rounded-md border border-green-400/30 bg-green-50/20 p-3 dark:border-green-600/20 dark:bg-zinc-800/40">
                        <p className="text-sm text-green-700 dark:text-green-200">
                          Rendimentos Mensais
                        </p>
                        <p className="text-xl font-bold text-green-600 dark:text-green-400">
                          {formatToBRL(results.monthlyDividends.toFixed(2))}
                        </p>
                      </div>
                      <div className="rounded-md border border-green-400/30 bg-green-50/20 p-3 dark:border-green-600/20 dark:bg-zinc-800/40">
                        <p className="text-sm text-green-700 dark:text-green-200">
                          Ganho de Capital
                        </p>
                        <p className="text-xl font-bold text-green-500 dark:text-green-400">
                          {formatToBRL(results.capitalGain.toFixed(2))}
                        </p>
                      </div>
                      <div className="rounded-md border border-green-400/30 bg-green-50/20 p-3 dark:border-green-600/20 dark:bg-zinc-800/40">
                        <p className="text-sm text-green-700 dark:text-green-200">
                          Dividend Yield Anual
                        </p>
                        <p className="text-xl font-bold text-green-600 dark:text-green-300">
                          {results.annualizedYield.toFixed(2)}% a.a.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="max-h-[300px] overflow-auto rounded-md border border-green-400/30 dark:border-green-600/20">
                    <table className="min-w-full divide-y divide-green-400/20 dark:divide-green-600/20">
                      <thead className="bg-green-50 dark:bg-[#1f1f1f]">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-green-700 dark:text-green-200">
                            Mês
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-green-700 dark:text-green-200">
                            Valor Nominal (R$)
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-green-700 dark:text-green-200">
                            Valor Ajustado (R$)
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-green-700 dark:text-green-200">
                            Preço da Cota (R$)
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-green-700 dark:text-green-200">
                            Dividendos Mensais (R$)
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-green-700 dark:text-green-200">
                            Ganho de Capital (R$)
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-green-700 dark:text-green-200">
                            Taxas Pagas (R$)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-green-400/20 bg-green-50/20 dark:divide-green-600/20 dark:bg-zinc-900/40">
                        {results.dataPoints.map((point, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0
                                ? "bg-white/30 dark:bg-zinc-900/30"
                                : "bg-white/10 dark:bg-zinc-900/10"
                            }
                          >
                            <td className="whitespace-nowrap px-4 py-2 text-sm text-green-700 dark:text-green-100">
                              {point.valueSub1}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-sm text-green-700 dark:text-green-100">
                              {formatToBRL(point.nominalValue.toFixed(2))}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-sm text-green-700 dark:text-green-100">
                              {formatToBRL(point.valueSub2.toFixed(2))}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-sm text-green-700 dark:text-green-100">
                              {formatToBRL(point.sharePrice.toFixed(2))}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-sm text-green-600 dark:text-green-400">
                              {formatToBRL(point.grossDividend.toFixed(2))}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-sm text-green-600 dark:text-green-400">
                              {formatToBRL(point.capitalGain.toFixed(2))}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-sm text-red-500 dark:text-red-400">
                              {formatToBRL(point.totalFees.toFixed(2))}
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
      {results.dataPoints.length > 0 && (
        <Card className="border border-[hsl(var(--border))] bg-white shadow-2xl dark:border-green-600/20 dark:bg-zinc-900/60">
          <CardHeader className="border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary))] dark:border-green-600/10 dark:bg-[#1f1f1f]">
            <h3 className="text-lg font-semibold text-[hsl(var(--primary))] dark:text-green-300">
              Projeção de Renda Passiva
            </h3>
          </CardHeader>
          <CardContent className="py-6">
            <div className="flex h-64 w-full items-center justify-center rounded-md bg-[hsl(var(--muted))] dark:bg-zinc-800/40">
              <ChartInvestimentFundos {...results} />
            </div>
          </CardContent>
        </Card>
      )}

      <div
        className={`rounded-md border p-4 text-sm text-[hsl(var(--muted-foreground))] dark:text-gray-400 ${
          fiiType === "tijolo"
            ? "border-[hsl(var(--border))] bg-[hsl(var(--card))] dark:border-green-600/20 dark:bg-zinc-900/40"
            : fiiType === "papel"
              ? "border-[hsl(var(--border))] bg-[hsl(var(--card))] dark:border-yellow-600/20 dark:bg-zinc-900/40"
              : "border-[hsl(var(--border))] bg-[hsl(var(--card))] dark:border-blue-600/20 dark:bg-zinc-900/40"
        }`}
      >
        <p>
          Simulação realizada em {format(new Date(), "PP", { locale: ptBR })}.
          Valores meramente ilustrativos.
        </p>
        <p className="mt-2">
          {fiiType === "tijolo"
            ? "FIIs de Tijolo investem em imóveis físicos, como shoppings e galpões, gerando renda via aluguéis. Consulte cotações e vacância na B3 ou em plataformas como Status Invest."
            : fiiType === "papel"
              ? "FIIs de Papel investem em títulos imobiliários, como CRIs, com rendimentos atrelados a juros. Verifique taxas e riscos na B3 ou em corretoras."
              : "FIIs Híbridos combinam imóveis e títulos, equilibrando renda e diversificação. Consulte detalhes em plataformas como Status Invest ou na B3."}
        </p>
      </div>
    </div>
  );
}
