"use client";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
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
  Banknote,
  Landmark,
  LineChart,
  PiggyBank,
  Sparkles,
} from "lucide-react";

import {
  customHandleCapitalChange,
  formatToBRL,
} from "@/app/_components/calculadora/formatFunctions";
import { useEffect, useState } from "react";
import {
  formatarNumeroVirgulas,
  notCaracteres,
} from "../_components/functions";

import {
  InvestimentosInputs,
  RelatorioInvestimento,
} from "@/app/(home)/_actions/generate-ai-report/interfaces";
import AiReportButton from "@/app/(home)/_components/ai-report-button";
import AiSimulationButton from "@/app/(home)/_components/ai-simuation-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import AlertLimit from "../_components/alertLimit";
import { CalculosFixosGeral, resetar } from "./calculateInvestimentFixos";
import { ComponentChartFixos } from "./chart-investmentsFixos";

interface InvestimentGeralProps {
  month: string;
  hasPremiumPlan: boolean;
  setInvestmentAction: React.Dispatch<
    React.SetStateAction<RelatorioInvestimento[]>
  >;
  investiment: RelatorioInvestimento[];
  setInvestimentosInputsAction: React.Dispatch<
    React.SetStateAction<InvestimentosInputs[]>
  >;
  investimentosInputs: InvestimentosInputs[];
  tipoInvestimento: string;
  setTipoInvestimentoAction: React.Dispatch<
    React.SetStateAction<"poupanca" | "tesouro" | "cdb">
  >;
  setQuantityAction: React.Dispatch<React.SetStateAction<number | null>>;
  quantity: number | null;
  setUpdateAction: React.Dispatch<
    React.SetStateAction<RelatorioInvestimento[]>
  >;
  update: RelatorioInvestimento[];
}

export interface ResultadoSimulacao {
  mes: number;
  valorAtual: number;
  jurosMensal: number;
  totalInvestido: number;
  totalJuros: number;
  impostoRenda: number;
  taxaCustodia: number;
  iof?: number;
}

export interface SimuladorInvestimentosProps {
  poupanca: ResultadoSimulacao[];
  tesouroSelic: ResultadoSimulacao[];
  cdb: ResultadoSimulacao[];
}

export function SimuladorInvestimentos({
  month,
  hasPremiumPlan,
  setInvestmentAction,
  investiment,
  setInvestimentosInputsAction,
  investimentosInputs,
  tipoInvestimento,
  setTipoInvestimentoAction,
  setQuantityAction,
  quantity,
  setUpdateAction,
  update,
}: InvestimentGeralProps) {
  const [periodoUnidade, setPeriodoUnidade] = useState<"meses" | "anos">(
    "meses",
  );
  const [valorInicial, setValorInicial] = useState<string>("");
  const [aporteMensal, setAporteMensal] = useState<string>("");
  const [tempo, setTempo] = useState(12);
  const [resgateMes, setResgateMes] = useState<string>("0");
  const [resultados, setResultados] = useState<ResultadoSimulacao[]>([]);
  const [position, setPosition] = useState<"IA" | "manual">("manual");
  const [resultadosGraphics, setResultadosGraphics] =
    useState<SimuladorInvestimentosProps>({
      poupanca: [],
      tesouroSelic: [],
      cdb: [],
    });

  const [taxaSelic, setTaxaSelic] = useState<string>("11");
  const [taxaCDB, setTaxaCDB] = useState<string>("100"); // Percentual do CDI
  const [erro, setErro] = useState<string>("");
  const [showAIReport, setShowAIReport] = useState(false);
  const [validClick, setValidClick] = useState(false);

  useEffect(() => {
    if (!resultados || resultados.length === 0) return;

    const ultimosValores = resultados[resultados.length - 1];

    const valoresMensais = {
      valorSub1: resultados.map((item) => item.mes),
      valorSub2: resultados.map((item) => item.totalInvestido),
      valorSub3: resultados.map((item) => item.totalJuros),
      valorSub4: resultados.map((item) => item.valorAtual),
    };

    if (tipoInvestimento === "poupanca") {
      setResultadosGraphics((prev) => ({
        ...prev,
        poupanca: resultados,
      }));
      setInvestmentAction?.((prev) => ({
        ...prev,
        valor0: "Poupança",
        valor1: ultimosValores?.totalInvestido,
        valor2:
          ultimosValores.totalJuros -
          ultimosValores.impostoRenda -
          (ultimosValores.iof || 0),
        valor3: ultimosValores?.valorAtual,
        valor6: valorInicial,
        valor7: aporteMensal,
        valoresMensais,
      }));
    } else if (tipoInvestimento === "tesouro") {
      setResultadosGraphics((prev) => ({
        ...prev,
        tesouroSelic: resultados,
      }));
      setInvestmentAction?.((prev) => ({
        ...prev,
        valor0: "Tesouro Selic",
        valor1: ultimosValores?.totalInvestido,
        valor2:
          ultimosValores.totalJuros -
          ultimosValores.impostoRenda -
          (ultimosValores.iof || 0),
        valor3: ultimosValores?.valorAtual,
        valor6: valorInicial,
        valor7: aporteMensal,
        valoresMensais,
      }));
    } else if (tipoInvestimento === "cdb") {
      setResultadosGraphics((prev) => ({
        ...prev,
        cdb: resultados,
      }));
      setInvestmentAction?.((prev) => ({
        ...prev,
        valor0: "CDB",
        valor1: ultimosValores?.totalInvestido,
        valor2:
          ultimosValores.totalJuros -
          ultimosValores.impostoRenda -
          (ultimosValores.iof || 0),
        valor3: ultimosValores?.valorAtual,
        valor6: valorInicial,
        valor7: aporteMensal,
        valoresMensais,
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoInvestimento, resultados]);

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

  const renderInfoCards = () => {
    if (tipoInvestimento === "poupanca") {
      return (
        <>
          <Card className="relative rounded-lg border border-blue-400/30 bg-white/90 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-blue-600/20 dark:bg-zinc-900/50 dark:shadow-md">
            <CardHeader className="border-b border-blue-600/10 py-4 dark:border-blue-400/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Rendimento Atual
              </h3>
              <Badge className="absolute right-4 top-4 bg-blue-600/80 text-white dark:bg-blue-500 dark:text-gray-800">
                Seguro
              </Badge>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                A poupança rende 0,5% ao mês + TR. Atualmente a TR está zerada,
                então o rendimento é apenas 0,5% ao mês.
              </p>
            </CardContent>
          </Card>
          <Card className="ark:border-blue-600/20 dborder-blue-400/30 relative rounded-lg border bg-white/90 shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-zinc-900/50 dark:shadow-md">
            <CardHeader className="border-b border-blue-600/10 py-4 dark:border-blue-400/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Vantagens
              </h3>
              <Badge className="absolute right-4 top-4 bg-green-600/80 text-white dark:bg-green-500 dark:text-gray-800">
                Protegido
              </Badge>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Seu dinheiro na poupança é garantido pelo FGC até R$ 250 mil por
                CPF e instituição financeira.
              </p>
            </CardContent>
          </Card>
          <Card className="relative rounded-lg border border-blue-400/30 bg-white/90 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-blue-600/20 dark:bg-zinc-900/50 dark:shadow-md">
            <CardHeader className="border-b border-blue-600/10 py-4 dark:border-blue-400/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Liquidez
              </h3>
              <Badge className="absolute right-4 top-4 bg-blue-500/80 text-white dark:bg-blue-400 dark:text-gray-800">
                Imediata
              </Badge>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Você pode sacar seu dinheiro a qualquer momento, sem perda dos
                rendimentos já creditados.
              </p>
            </CardContent>
          </Card>
        </>
      );
    } else if (tipoInvestimento === "tesouro") {
      return (
        <>
          <Card className="relative rounded-lg border border-purple-400/30 bg-white/90 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-purple-600/20 dark:bg-zinc-900/50 dark:shadow-md">
            <CardHeader className="border-b border-purple-600/10 py-4 dark:border-purple-400/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Tesouro Selic
              </h3>
              <Badge className="absolute right-4 top-4 bg-purple-600/80 text-white dark:bg-purple-500 dark:text-gray-800">
                Rentável
              </Badge>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Títulos atrelados à taxa Selic, ideais para liquidez diária.
              </p>
            </CardContent>
          </Card>
          <Card className="relative rounded-lg border border-purple-400/30 bg-white/90 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-purple-600/20 dark:bg-zinc-900/50 dark:shadow-md">
            <CardHeader className="border-b border-purple-600/10 py-4 dark:border-purple-400/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Segurança
              </h3>
              <Badge className="absolute right-4 top-4 bg-green-600/80 text-white dark:bg-green-500 dark:text-gray-800">
                Governo
              </Badge>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Títulos emitidos pelo Tesouro Nacional, considerados os
                investimentos mais seguros do país.
              </p>
            </CardContent>
          </Card>
          <Card className="relative rounded-lg border border-purple-400/30 bg-white/90 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-purple-600/20 dark:bg-zinc-900/50 dark:shadow-md">
            <CardHeader className="border-b border-purple-600/10 py-4 dark:border-purple-400/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Liquidez
              </h3>
              <Badge className="absolute right-4 top-4 bg-yellow-500/80 text-white dark:bg-yellow-400 dark:text-gray-800">
                D+1
              </Badge>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Pode resgatar a qualquer momento no mercado secundário, mas pode
                haver marcação a mercado.
              </p>
            </CardContent>
          </Card>
        </>
      );
    } else {
      // CDB
      return (
        <>
          <Card className="relative rounded-lg border border-green-400/30 bg-white/90 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-green-600/20 dark:bg-zinc-900/50 dark:shadow-md">
            <CardHeader className="border-b border-green-600/10 py-4 dark:border-green-400/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                CDB
              </h3>
              <Badge className="absolute right-4 top-4 bg-green-600/80 text-white dark:bg-green-500 dark:text-gray-800">
                Rentável
              </Badge>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Certificado de Depósito Bancário, com rendimento atrelado ao
                CDI, ideal para diversificação.
              </p>
            </CardContent>
          </Card>
          <Card className="relative rounded-lg border border-green-400/30 bg-white/90 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-green-600/20 dark:bg-zinc-900/50 dark:shadow-md">
            <CardHeader className="border-b border-green-600/10 py-4 dark:border-green-400/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Segurança
              </h3>
              <Badge className="absolute right-4 top-4 bg-green-600/80 text-white dark:bg-green-500 dark:text-gray-800">
                FGC
              </Badge>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Protegido pelo FGC até R$ 250 mil por CPF e instituição
                financeira.
              </p>
            </CardContent>
          </Card>
          <Card className="relative rounded-lg border border-green-400/30 bg-white/90 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-green-600/20 dark:bg-zinc-900/50 dark:shadow-md">
            <CardHeader className="border-b border-green-600/10 py-4 dark:border-green-400/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Liquidez
              </h3>
              <Badge className="absolute right-4 top-4 bg-yellow-500/80 text-white dark:bg-yellow-400 dark:text-gray-800">
                Variável
              </Badge>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Liquidez diária ou no vencimento, dependendo do CDB. Resgates
                antecipados podem estar sujeitos a perdas.
              </p>
            </CardContent>
          </Card>
        </>
      );
    }
  };

  const validarInputs = () => {
    const valorInicialNumber = Number(
      valorInicial.replace(".", "").replace(",", "."),
    );
    const taxaSelicNumber = Number(taxaSelic.replace(",", "."));
    const taxaCDBNumber = Number(taxaCDB.replace(",", "."));

    if (tipoInvestimento === "tesouro" || tipoInvestimento === "cdb") {
      if (isNaN(valorInicialNumber) || valorInicialNumber < 30) {
        setErro("O valor inicial deve ser no mínimo R$ 30,00.");
        return false;
      }
      if (
        tipoInvestimento === "tesouro" &&
        (isNaN(taxaSelicNumber) || taxaSelicNumber <= 0)
      ) {
        setErro("A taxa anual Selic deve ser maior que 0%.");
        return false;
      }
      if (
        tipoInvestimento === "cdb" &&
        (isNaN(taxaCDBNumber) || taxaCDBNumber <= 0)
      ) {
        setErro("A taxa do CDB (% CDI) deve ser maior que 0%.");
        return false;
      }
    }
    if (isNaN(valorInicialNumber) || valorInicialNumber < 0) {
      setErro("O valor inicial deve ser um número válido.");
      return false;
    }
    const tempoEmMeses = periodoUnidade === "anos" ? tempo * 12 : tempo;
    if (isNaN(tempoEmMeses) || tempoEmMeses < 1) {
      setErro("O período deve ser pelo menos 1 mês.");
      return false;
    }
    if (
      resgateMes !== null &&
      (isNaN(Number(resgateMes)) || Number(resgateMes) > Number(tempoEmMeses))
    ) {
      setErro("O mês de resgate deve ser válido e menor ou igual ao período.");
      return false;
    }
    if (tipoInvestimento === "poupanca") {
      const aporteMensalNumber = Number(
        aporteMensal.replace(".", "").replace(",", "."),
      );
      const InicialNumber = Number(
        valorInicial.replace(".", "").replace(",", "."),
      );
      if (InicialNumber === 0) {
        setErro("O valor inicial deve ser diferente de 0.");
        return false;
      }
      if (!isNaN(aporteMensalNumber) && aporteMensalNumber < 0) {
        setErro("O aporte mensal não pode ser negativo.");
        return false;
      }
    }
    setErro("");
    return true;
  };

  return (
    <div className="mt-4 flex flex-col space-y-10 p-2 dark:bg-transparent">
      <div className="text-center lg:text-left">
        <h1 className="flex items-center justify-center text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:justify-start">
          {tipoInvestimento === "poupanca" ? (
            <Banknote
              className="mr-2 text-blue-500 dark:text-blue-400"
              size={32}
            />
          ) : tipoInvestimento === "tesouro" ? (
            <Landmark
              className="mr-2 text-purple-500 dark:text-purple-400"
              size={32}
            />
          ) : (
            <PiggyBank
              className="mr-2 text-green-500 dark:text-green-400"
              size={32}
            />
          )}
          {tipoInvestimento === "poupanca"
            ? "Simulador de Poupança"
            : tipoInvestimento === "tesouro"
              ? "Simulador de Tesouro Selic"
              : "Simulador de CDB"}
        </h1>

        <p className="mx-auto mt-2 text-base text-gray-600 dark:text-gray-300 sm:mx-0 lg:max-w-2xl">
          {tipoInvestimento === "poupanca"
            ? "Simule o rendimento da sua poupança considerando os aportes mensais e visualize como seu dinheiro pode crescer ao longo do tempo."
            : tipoInvestimento === "tesouro"
              ? "Simule investimentos em títulos do Tesouro Selic com projeção de rendimentos."
              : "Simule investimentos em CDB com rendimento atrelado ao CDI."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="space-y-6">
          <h2 className="flex items-center text-2xl font-semibold text-gray-800 dark:text-white">
            <LineChart
              className="mr-2 text-blue-500 dark:text-blue-400"
              size={24}
            />

            {tipoInvestimento === "poupanca"
              ? "Sobre a Poupança"
              : tipoInvestimento === "tesouro"
                ? "Sobre o Tesouro Selic"
                : "Sobre o CDB"}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {renderInfoCards()}
          </div>
        </div>
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
              investimentosInputs={investimentosInputs}
              category="Calcular-investimentos"
              openExternally={showAIReport}
              onOpenChange={setShowAIReport}
              setValidClick={setValidClick}
              quantity={quantity}
            />
            <AiReportButton
              month={month}
              hasPremiumPlan={hasPremiumPlan}
              investiment={investiment}
              category="investimentos"
              quantity={quantity}
              setValidClick={setValidClick}
            />
          </div>
          <Card
            className={`rounded-lg backdrop-blur-md dark:border-blue-600/20 dark:bg-zinc-900/60 ${
              tipoInvestimento === "poupanca"
                ? "border-blue-400/30 bg-white/90"
                : tipoInvestimento === "tesouro"
                  ? "border-purple-400/30 bg-white/90"
                  : "border-green-400/30 bg-white/90"
            }`}
          >
            <CardHeader
              className={`rounded-lg border-b py-4 ${
                tipoInvestimento === "poupanca"
                  ? "border-blue-400/20 bg-blue-50 dark:border-blue-600/10 dark:bg-[#1f1f1f]"
                  : tipoInvestimento === "tesouro"
                    ? "border-purple-400/20 bg-purple-50 dark:border-purple-600/10 dark:bg-[#1f1f1f]"
                    : "border-green-400/20 bg-green-50 dark:border-green-600/10 dark:bg-[#1f1f1f]"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2
                  className={`text-xl font-bold ${
                    tipoInvestimento === "poupanca"
                      ? "text-blue-500 dark:text-blue-400"
                      : tipoInvestimento === "tesouro"
                        ? "text-purple-500 dark:text-purple-400"
                        : "text-green-500 dark:text-green-400"
                  }`}
                >
                  {tipoInvestimento === "poupanca"
                    ? "Simulador de Poupança"
                    : tipoInvestimento === "tesouro"
                      ? "Simulador de Tesouro Selic"
                      : "Simulador de CDB"}
                </h2>
                {tipoInvestimento === "poupanca" ? (
                  <Banknote
                    className="text-blue-500 dark:text-blue-400"
                    size={24}
                  />
                ) : tipoInvestimento === "tesouro" ? (
                  <Landmark
                    className="text-purple-500 dark:text-purple-400"
                    size={24}
                  />
                ) : (
                  <PiggyBank
                    className="text-green-500 dark:text-green-400"
                    size={24}
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-6">
              <div className="space-y-4">
                <div className="w-full">
                  <div className="space-y-2">
                    <Label
                      htmlFor="valor-inicial"
                      className={`text-sm font-medium ${
                        tipoInvestimento === "poupanca"
                          ? "text-blue-600 dark:text-blue-100"
                          : tipoInvestimento === "tesouro"
                            ? "text-purple-600 dark:text-purple-100"
                            : "text-green-600 dark:text-green-100"
                      }`}
                    >
                      Selecione o tipo de investimento
                    </Label>

                    <Select
                      value={tipoInvestimento}
                      onValueChange={(value) => {
                        setTipoInvestimentoAction(
                          value as "poupanca" | "tesouro" | "cdb",
                        );
                        resetar(setResultados);
                        setErro("");
                        if (value !== "poupanca") {
                          setAporteMensal("");
                        }
                      }}
                    >
                      <SelectTrigger className="border-blue-400/30 bg-white text-gray-800 dark:border-blue-600/20 dark:bg-zinc-900/60 dark:text-white">
                        <SelectValue placeholder="Selecione o tipo de investimento" />
                      </SelectTrigger>
                      <SelectContent className="border-blue-400/30 bg-white text-gray-800 dark:border-blue-600/20 dark:bg-zinc-900 dark:text-white">
                        <SelectItem value="poupanca">Poupança</SelectItem>
                        <SelectItem value="tesouro">Tesouro Selic</SelectItem>
                        <SelectItem value="cdb">CDB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="valor-inicial"
                    className={`text-sm font-medium ${
                      tipoInvestimento === "poupanca"
                        ? "text-blue-600 dark:text-blue-100"
                        : tipoInvestimento === "tesouro"
                          ? "text-purple-600 dark:text-purple-100"
                          : "text-green-600 dark:text-green-100"
                    }`}
                  >
                    Valor Inicial (R$)
                  </Label>
                  <Input
                    id="valor-inicial"
                    type="string"
                    min="0"
                    step="0.01"
                    value={valorInicial}
                    placeholder="R$ 1.000,00"
                    onChange={(e) => {
                      customHandleCapitalChange(e, setValorInicial);
                      setErro("");
                    }}
                    className={`rounded-md border placeholder:text-blue-400 focus:ring-2 ${
                      tipoInvestimento === "poupanca"
                        ? "border-blue-400/30 bg-blue-50/50 text-blue-700 focus:ring-blue-500 dark:border-blue-600/20 dark:bg-zinc-800/40 dark:text-blue-100"
                        : tipoInvestimento === "tesouro"
                          ? "border-purple-400/30 bg-purple-50/50 text-purple-700 focus:ring-purple-500 dark:border-purple-600/20 dark:bg-zinc-800/40 dark:text-purple-100"
                          : "border-green-400/30 bg-green-50/50 text-green-700 focus:ring-green-500 dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100"
                    }`}
                  />
                </div>
                {tipoInvestimento === "poupanca" && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="aporte-mensal"
                      className="text-sm font-medium text-blue-600 dark:text-blue-100"
                    >
                      Aporte Mensal (R$, opcional)
                    </Label>
                    <Input
                      id="aporte-mensal"
                      type="string"
                      min="0"
                      step="0.01"
                      placeholder="R$ 100,00"
                      value={aporteMensal}
                      onChange={(e) => {
                        customHandleCapitalChange(e, setAporteMensal);
                        setErro("");
                      }}
                      className="rounded-md border border-blue-400/30 bg-blue-50/50 text-blue-700 placeholder:text-blue-400 focus:ring-2 focus:ring-blue-500 dark:border-blue-600/20 dark:bg-zinc-800/40 dark:text-blue-100"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label
                    htmlFor="tempo"
                    className={`text-sm font-medium ${
                      tipoInvestimento === "poupanca"
                        ? "text-blue-600 dark:text-blue-100"
                        : tipoInvestimento === "tesouro"
                          ? "text-purple-600 dark:text-purple-100"
                          : "text-green-600 dark:text-green-100"
                    }`}
                  >
                    Período em {periodoUnidade === "anos" ? "Anos" : "Meses"}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="tempo"
                      type="number"
                      min="1"
                      max={periodoUnidade === "anos" ? "30" : "360"}
                      value={tempo}
                      onChange={(e) => {
                        setTempo(Number(e.target.value));
                        setErro("");
                      }}
                      className={`flex-1 rounded-md border placeholder:text-blue-400 focus:ring-2 ${
                        tipoInvestimento === "poupanca"
                          ? "border-blue-400/30 bg-blue-50/50 text-blue-700 focus:ring-blue-500 dark:border-blue-600/20 dark:bg-zinc-800/40 dark:text-blue-100"
                          : tipoInvestimento === "tesouro"
                            ? "border-purple-400/30 bg-purple-50/50 text-purple-700 focus:ring-purple-500 dark:border-purple-600/20 dark:bg-zinc-800/40 dark:text-purple-100"
                            : "border-green-400/30 bg-green-50/50 text-green-700 focus:ring-green-500 dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100"
                      }`}
                    />
                    <Select
                      value={periodoUnidade}
                      onValueChange={(value) => {
                        setPeriodoUnidade(value as "meses" | "anos");
                        setErro("");
                      }}
                    >
                      <SelectTrigger className="w-[120px] border-blue-400/30 bg-white text-gray-800 dark:border-blue-600/20 dark:bg-zinc-900/60 dark:text-white">
                        <SelectValue placeholder="Unidade" />
                      </SelectTrigger>
                      <SelectContent className="border-blue-400/30 bg-white text-gray-800 dark:border-blue-600/20 dark:bg-zinc-900 dark:text-white">
                        <SelectItem value="meses">Meses</SelectItem>
                        <SelectItem value="anos">Anos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {(tipoInvestimento === "tesouro" ||
                  tipoInvestimento === "cdb") && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="resgate-mes"
                      className={`text-sm font-medium ${
                        tipoInvestimento === "tesouro"
                          ? "text-purple-600 dark:text-purple-100"
                          : "text-green-600 dark:text-green-100"
                      }`}
                    >
                      Mês de Resgate
                    </Label>
                    <Input
                      id="resgate-mes"
                      type="text"
                      min="1"
                      max={periodoUnidade === "anos" ? tempo * 12 : tempo}
                      value={resgateMes || ""}
                      onFocus={() => setResgateMes("")}
                      onChange={(e) => {
                        const value = notCaracteres(
                          e.target.value ? e.target.value : "0",
                        );
                        setResgateMes(value);
                        setErro("");
                      }}
                      className={`rounded-md border placeholder:text-purple-400 focus:ring-2 ${
                        tipoInvestimento === "tesouro"
                          ? "border-purple-400/30 bg-purple-50/50 text-purple-700 focus:ring-purple-500 dark:border-purple-600/20 dark:bg-zinc-800/40 dark:text-purple-100"
                          : "border-green-400/30 bg-green-50/50 text-green-700 focus:ring-green-500 dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100"
                      }`}
                    />
                  </div>
                )}
                {tipoInvestimento === "tesouro" && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="taxa-selic"
                      className="text-sm font-medium text-purple-600 dark:text-purple-100"
                    >
                      Taxa Anual Selic (%)
                    </Label>
                    <Input
                      id="taxa-selic"
                      type="string"
                      step="0.1"
                      value={taxaSelic}
                      onChange={(e) => {
                        const valurFormat = formatarNumeroVirgulas(
                          e.target.value,
                        );
                        setTaxaSelic(valurFormat);
                        setErro("");
                      }}
                      placeholder="Ex: 11"
                      className="rounded-md border border-purple-400/30 bg-purple-50/50 text-purple-700 placeholder:text-purple-400 focus:ring-2 focus:ring-purple-500 dark:border-purple-600/20 dark:bg-zinc-800/40 dark:text-purple-100"
                    />
                  </div>
                )}
                {tipoInvestimento === "cdb" && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="taxa-cdb"
                      className="text-sm font-medium text-green-600 dark:text-green-100"
                    >
                      Taxa do CDB (% CDI)
                    </Label>
                    <Input
                      id="taxa-cdb"
                      type="string"
                      step="0.1"
                      value={taxaCDB}
                      onChange={(e) => {
                        setTaxaCDB(e.target.value);
                        setErro("");
                      }}
                      placeholder="Ex: 100"
                      className="rounded-md border border-green-400/30 bg-green-50/50 text-green-700 placeholder:text-green-400 focus:ring-2 focus:ring-green-500 dark:border-green-600/20 dark:bg-zinc-800/40 dark:text-green-100"
                    />
                  </div>
                )}
                {(tipoInvestimento === "tesouro" ||
                  tipoInvestimento === "cdb") && (
                  <p
                    id="investimento-note"
                    className="text-xs text-gray-500 dark:text-gray-400"
                    aria-describedby="investimento-note"
                  >
                    Esta simulação assume que o investimento é mantido até o
                    vencimento ou resgate especificado. Resgates antecipados
                    podem estar sujeitos à marcação a mercado. Inclui Imposto de
                    Renda (alíquota regressiva) e IOF (para resgates em até 30
                    dias).
                    {tipoInvestimento === "tesouro" &&
                      " Inclui taxa de custódia de 0,1% ao ano, cobrada semestralmente."}
                  </p>
                )}

                {erro && (
                  <p className="text-xs text-red-500 dark:text-red-400">
                    {erro}
                  </p>
                )}
                <div className="flex gap-2">
                  <div className="relative w-full">
                    <Button
                      disabled={(quantity ?? 0) >= 10 && !hasPremiumPlan}
                      onClick={() => {
                        if (validarInputs()) {
                          if (position === "manual") {
                            const tempoEmMeses =
                              periodoUnidade === "anos" ? tempo * 12 : tempo;
                            CalculosFixosGeral(
                              tipoInvestimento,
                              valorInicial,
                              tipoInvestimento === "poupanca"
                                ? aporteMensal
                                : "",
                              tempoEmMeses,
                              setResultados,
                              setErro,
                              tipoInvestimento === "tesouro"
                                ? "selic"
                                : tipoInvestimento === "cdb"
                                  ? "cdb"
                                  : "prefixado",
                              "0",
                              "0",
                              tipoInvestimento === "tesouro"
                                ? taxaSelic
                                : tipoInvestimento === "cdb"
                                  ? taxaCDB
                                  : "11",
                              Number(resgateMes),
                            );
                          } else if (position === "IA") {
                            setShowAIReport(true);
                            setInvestimentosInputsAction?.((prev) => ({
                              ...prev,
                              tipoInvestimento: tipoInvestimento,
                              valorInicial: valorInicial,
                              aporteMensal: aporteMensal,
                              taxaSelic: taxaSelic,
                              taxaCDB: taxaCDB,
                              resgateMes: resgateMes,
                              period: tempo,
                              periodUnit: periodoUnidade,
                              marketScenario: null,
                            }));
                          }
                        }
                      }}
                      className={`w-full rounded-md font-semibold text-white shadow-md transition hover:brightness-110 ${
                        position === "IA"
                          ? "bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700"
                          : tipoInvestimento === "poupanca"
                            ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
                            : tipoInvestimento === "tesouro"
                              ? "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700"
                              : "bg-gradient-to-r from-green-500 via-green-600 to-green-700"
                      }`}
                    >
                      {position === "IA" ? (
                        <span className="flex items-center gap-2 italic tracking-wide text-white drop-shadow">
                          Simular com IA{" "}
                          <Sparkles className="h-5 w-5 animate-pulse" />
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Simular <LineChart className="h-4 w-4" />
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
                            setPosition(value as "IA" | "manual")
                          }
                        >
                          <DropdownMenuRadioItem value="manual">
                            Cálcular manualmente
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="IA">
                            Cálcular com IA
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <Button
                    onClick={() => {
                      resetar(setResultados);
                      setValorInicial("0.00");
                      setAporteMensal("");
                      setTempo(12);
                      setTaxaSelic("11");
                      setTaxaCDB("100");
                      setResgateMes("0");
                      setErro("");
                      setInvestmentAction([]);
                    }}
                    variant="outline"
                    className={`w-full hover:bg-opacity-30 ${
                      tipoInvestimento === "poupanca"
                        ? "border-blue-400/30 text-blue-600 hover:bg-blue-100/50 dark:border-blue-600/20 dark:text-blue-100 dark:hover:bg-blue-900/30"
                        : tipoInvestimento === "tesouro"
                          ? "border-purple-400/30 text-purple-600 hover:bg-purple-100/50 dark:border-purple-600/20 dark:text-purple-100 dark:hover:bg-purple-900/30"
                          : "border-green-400/30 text-green-600 hover:bg-green-100/50 dark:border-green-600/20 dark:text-green-100 dark:hover:bg-green-900/30"
                    }`}
                  >
                    Limpar
                  </Button>
                </div>
              </div>
              {resultados.length > 0 && (
                <div className="space-y-4">
                  <div
                    className={`rounded-md border p-4 shadow-inner ${
                      tipoInvestimento === "poupanca"
                        ? "border-blue-400/30 bg-blue-50/30 dark:border-blue-600/20 dark:bg-zinc-900/40"
                        : tipoInvestimento === "tesouro"
                          ? "border-purple-400/30 bg-purple-50/30 dark:border-purple-600/20 dark:bg-zinc-900/40"
                          : "border-green-400/30 bg-green-50/30 dark:border-green-600/20 dark:bg-zinc-900/40"
                    }`}
                  >
                    <h3
                      className={`text-lg font-semibold ${
                        tipoInvestimento === "poupanca"
                          ? "text-blue-600 dark:text-blue-300"
                          : tipoInvestimento === "tesouro"
                            ? "text-purple-600 dark:text-purple-300"
                            : "text-green-600 dark:text-green-300"
                      }`}
                    >
                      Resumo da Simulação
                    </h3>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div
                        className={`rounded-md border p-3 ${
                          tipoInvestimento === "poupanca"
                            ? "border-blue-400/30 bg-blue-50/20 dark:border-blue-600/20 dark:bg-zinc-800/40"
                            : tipoInvestimento === "tesouro"
                              ? "border-purple-400/30 bg-purple-50/20 dark:border-purple-600/20 dark:bg-zinc-800/40"
                              : "border-green-400/30 bg-green-50/20 dark:border-green-600/20 dark:bg-zinc-800/40"
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            tipoInvestimento === "poupanca"
                              ? "text-blue-700 dark:text-blue-200"
                              : tipoInvestimento === "tesouro"
                                ? "text-purple-700 dark:text-purple-200"
                                : "text-green-700 dark:text-green-200"
                          }`}
                        >
                          Total Investido
                        </p>
                        <p
                          className={`text-xl font-bold ${
                            tipoInvestimento === "poupanca"
                              ? "text-blue-600 dark:text-blue-400"
                              : tipoInvestimento === "tesouro"
                                ? "text-purple-600 dark:text-purple-400"
                                : "text-green-600 dark:text-green-400"
                          }`}
                        >
                          {formatToBRL(
                            resultados[
                              resultados.length - 1
                            ].totalInvestido.toFixed(2),
                          )}
                        </p>
                      </div>
                      <div
                        className={`rounded-md border p-3 ${
                          tipoInvestimento === "poupanca"
                            ? "border-blue-400/30 bg-blue-50/20 dark:border-blue-600/20 dark:bg-zinc-800/40"
                            : tipoInvestimento === "tesouro"
                              ? "border-purple-400/30 bg-purple-50/20 dark:border-purple-600/20 dark:bg-zinc-800/40"
                              : "border-green-400/30 bg-green-50/20 dark:border-green-600/20 dark:bg-zinc-800/40"
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            tipoInvestimento === "poupanca"
                              ? "text-blue-700 dark:text-blue-200"
                              : tipoInvestimento === "tesouro"
                                ? "text-purple-700 dark:text-purple-200"
                                : "text-green-700 dark:text-green-200"
                          }`}
                        >
                          Total em Juros (Líquido)
                        </p>
                        <p className="text-xl font-bold text-green-500 dark:text-green-400">
                          {formatToBRL(
                            (
                              resultados[resultados.length - 1].totalJuros -
                              resultados[resultados.length - 1].impostoRenda -
                              (resultados[resultados.length - 1].iof || 0)
                            ).toFixed(2),
                          )}
                        </p>
                      </div>
                      <div
                        className={`rounded-md border p-3 ${
                          tipoInvestimento === "poupanca"
                            ? "border-blue-400/30 bg-blue-50/20 dark:border-blue-600/20 dark:bg-zinc-800/40"
                            : tipoInvestimento === "tesouro"
                              ? "border-purple-400/30 bg-purple-50/20 dark:border-purple-600/20 dark:bg-zinc-800/40"
                              : "border-green-400/30 bg-green-50/20 dark:border-green-600/20 dark:bg-zinc-800/40"
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            tipoInvestimento === "poupanca"
                              ? "text-blue-700 dark:text-blue-200"
                              : tipoInvestimento === "tesouro"
                                ? "text-purple-700 dark:text-purple-200"
                                : "text-green-700 dark:text-green-200"
                          }`}
                        >
                          Valor Final (Líquido)
                        </p>
                        <p
                          className={`text-xl font-bold ${
                            tipoInvestimento === "poupanca"
                              ? "text-blue-600 dark:text-blue-300"
                              : tipoInvestimento === "tesouro"
                                ? "text-purple-600 dark:text-purple-300"
                                : "text-green-600 dark:text-green-300"
                          }`}
                        >
                          {formatToBRL(
                            resultados[
                              resultados.length - 1
                            ].valorAtual.toFixed(2),
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      className={`flex items-center text-sm font-medium ${
                        tipoInvestimento === "poupanca"
                          ? "text-blue-600 dark:text-blue-100"
                          : tipoInvestimento === "tesouro"
                            ? "text-purple-600 dark:text-purple-100"
                            : "text-green-600 dark:text-green-100"
                      }`}
                    >
                      <AlertTriangle
                        className="mr-2 text-yellow-500 dark:text-yellow-400"
                        size={16}
                      />
                      {tipoInvestimento === "poupanca"
                        ? "Rentabilidade Mensal"
                        : tipoInvestimento === "tesouro"
                          ? "Projeção de Rentabilidade"
                          : "Projeção de Rentabilidade CDB"}
                    </Label>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-zinc-700/50">
                      <div
                        className={`h-full w-full ${
                          tipoInvestimento === "poupanca"
                            ? "bg-blue-400 dark:bg-blue-500/70"
                            : tipoInvestimento === "tesouro"
                              ? "bg-purple-400 dark:bg-purple-500/70"
                              : "bg-green-400 dark:bg-green-500/70"
                        }`}
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {tipoInvestimento === "poupanca"
                        ? "Rendimento fixo de 0,5% ao mês (sem considerar TR)"
                        : tipoInvestimento === "tesouro"
                          ? `Taxa anual de ${taxaSelic}%`
                          : `Taxa de ${taxaCDB}% do CDI`}
                    </p>
                  </div>

                  <div
                    className={`max-h-[300px] overflow-auto rounded-md border ${
                      tipoInvestimento === "poupanca"
                        ? "border-blue-400/30 dark:border-blue-600/20"
                        : tipoInvestimento === "tesouro"
                          ? "border-purple-400/30 dark:border-purple-600/20"
                          : "border-green-400/30 dark:border-green-600/20"
                    }`}
                  >
                    <table
                      className={`min-w-full divide-y ${
                        tipoInvestimento === "poupanca"
                          ? "divide-blue-400/20 dark:divide-blue-600/20"
                          : tipoInvestimento === "tesouro"
                            ? "divide-purple-400/20 dark:divide-purple-600/20"
                            : "divide-green-400/20 dark:divide-green-600/20"
                      }`}
                    >
                      <thead className="bg-blue-50 dark:bg-[#1f1f1f]">
                        <tr>
                          <th
                            scope="col"
                            className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                              tipoInvestimento === "poupanca"
                                ? "text-blue-700 dark:text-blue-200"
                                : tipoInvestimento === "tesouro"
                                  ? "text-purple-700 dark:text-purple-200"
                                  : "text-green-700 dark:text-green-200"
                            }`}
                          >
                            Mês
                          </th>
                          <th
                            scope="col"
                            className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                              tipoInvestimento === "poupanca"
                                ? "text-blue-700 dark:text-blue-200"
                                : tipoInvestimento === "tesouro"
                                  ? "text-purple-700 dark:text-purple-200"
                                  : "text-green-700 dark:text-green-200"
                            }`}
                          >
                            Valor
                          </th>
                          <th
                            scope="col"
                            className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                              tipoInvestimento === "poupanca"
                                ? "text-blue-700 dark:text-blue-200"
                                : tipoInvestimento === "tesouro"
                                  ? "text-purple-700 dark:text-purple-200"
                                  : "text-green-700 dark:text-green-200"
                            }`}
                          >
                            Juros
                          </th>
                          <th
                            scope="col"
                            className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                              tipoInvestimento === "poupanca"
                                ? "text-blue-700 dark:text-blue-200"
                                : tipoInvestimento === "tesouro"
                                  ? "text-purple-700 dark:text-purple-200"
                                  : "text-green-700 dark:text-green-200"
                            }`}
                          >
                            Total
                          </th>
                          {(tipoInvestimento === "tesouro" ||
                            tipoInvestimento === "cdb") && (
                            <>
                              <th
                                scope="col"
                                className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                  tipoInvestimento === "tesouro"
                                    ? "text-purple-700 dark:text-purple-200"
                                    : "text-green-700 dark:text-green-200"
                                }`}
                              >
                                IR
                              </th>
                              <th
                                scope="col"
                                className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                  tipoInvestimento === "tesouro"
                                    ? "text-purple-700 dark:text-purple-200"
                                    : "text-green-700 dark:text-green-200"
                                }`}
                              >
                                Custódia
                              </th>
                              <th
                                scope="col"
                                className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                  tipoInvestimento === "tesouro"
                                    ? "text-purple-700 dark:text-purple-200"
                                    : "text-green-700 dark:text-green-200"
                                }`}
                              >
                                IOF
                              </th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody
                        className={`divide-y ${
                          tipoInvestimento === "poupanca"
                            ? "divide-blue-400/20 bg-blue-50/20 dark:divide-blue-600/20 dark:bg-zinc-900/40"
                            : tipoInvestimento === "tesouro"
                              ? "divide-purple-400/20 bg-purple-50/20 dark:divide-purple-600/20 dark:bg-zinc-900/40"
                              : "divide-green-400/20 bg-green-50/20 dark:divide-green-600/20 dark:bg-zinc-900/40"
                        }`}
                      >
                        {resultados.map((resultado, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0
                                ? "bg-white/30 dark:bg-zinc-900/30"
                                : "bg-white/10 dark:bg-zinc-900/10"
                            }
                          >
                            <td
                              className={`whitespace-nowrap px-4 py-2 text-sm ${
                                tipoInvestimento === "poupanca"
                                  ? "text-blue-700 dark:text-blue-100"
                                  : tipoInvestimento === "tesouro"
                                    ? "text-purple-700 dark:text-purple-100"
                                    : "text-green-700 dark:text-green-100"
                              }`}
                            >
                              {resultado.mes}
                            </td>
                            <td
                              className={`whitespace-nowrap px-4 py-2 text-sm ${
                                tipoInvestimento === "poupanca"
                                  ? "text-blue-700 dark:text-blue-100"
                                  : tipoInvestimento === "tesouro"
                                    ? "text-purple-700 dark:text-purple-100"
                                    : "text-green-700 dark:text-green-100"
                              }`}
                            >
                              {formatToBRL(resultado.valorAtual)}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-sm text-green-600 dark:text-green-400">
                              {formatToBRL(resultado.jurosMensal)}
                            </td>
                            <td
                              className={`whitespace-nowrap px-4 py-2 text-sm ${
                                tipoInvestimento === "poupanca"
                                  ? "text-blue-700 dark:text-blue-100"
                                  : tipoInvestimento === "tesouro"
                                    ? "text-purple-700 dark:text-purple-100"
                                    : "text-green-700 dark:text-green-100"
                              }`}
                            >
                              {formatToBRL(resultado.totalInvestido)}
                            </td>
                            {(tipoInvestimento === "tesouro" ||
                              tipoInvestimento === "cdb") && (
                              <>
                                <td className="whitespace-nowrap px-4 py-2 text-sm text-red-500 dark:text-red-400">
                                  {formatToBRL(resultado.impostoRenda)}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-sm text-red-500 dark:text-red-400">
                                  {formatToBRL(resultado.taxaCustodia)}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-sm text-red-500 dark:text-red-400">
                                  {formatToBRL(resultado.iof || 0)}
                                </td>
                              </>
                            )}
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

      {(resultadosGraphics.poupanca.length > 0 ||
        resultadosGraphics.tesouroSelic.length > 0 ||
        resultadosGraphics.cdb.length > 0) && (
        <Card
          className={`mt-6 rounded-lg shadow-2xl dark:border-blue-600/20 dark:bg-zinc-900/60 ${
            tipoInvestimento === "poupanca"
              ? "border-blue-400/30 bg-white/90"
              : tipoInvestimento === "tesouro"
                ? "border-purple-400/30 bg-white/90"
                : "border-green-400/30 bg-white/90"
          }`}
        >
          <CardHeader
            className={`border-b py-4 ${
              tipoInvestimento === "poupanca"
                ? "border-blue-400/20 bg-blue-50 dark:border-blue-600/10 dark:bg-[#1f1f1f]"
                : tipoInvestimento === "tesouro"
                  ? "border-purple-400/20 bg-purple-50 dark:border-purple-600/10 dark:bg-[#1f1f1f]"
                  : "border-green-400/20 bg-green-50 dark:border-green-600/10 dark:bg-[#1f1f1f]"
            }`}
          >
            <h3
              className={`text-lg font-semibold ${
                tipoInvestimento === "poupanca"
                  ? "text-blue-600 dark:text-blue-300"
                  : tipoInvestimento === "tesouro"
                    ? "text-purple-600 dark:text-purple-300"
                    : "text-green-600 dark:text-green-300"
              }`}
            >
              Projeção de Crescimento
            </h3>
          </CardHeader>
          <CardContent className="py-6">
            <div className="flex h-64 w-full items-center justify-center rounded-md bg-gray-100 dark:bg-zinc-800/40">
              <ComponentChartFixos
                poupanca={resultadosGraphics.poupanca}
                tesouroSelic={resultadosGraphics.tesouroSelic}
                cdb={resultadosGraphics.cdb}
              />
            </div>
          </CardContent>
        </Card>
      )}

      <div
        className={`rounded-md border p-4 text-sm text-gray-500 dark:text-gray-400 ${
          tipoInvestimento === "poupanca"
            ? "border-blue-400/30 bg-blue-50/30 dark:border-blue-600/20 dark:bg-zinc-900/40"
            : tipoInvestimento === "tesouro"
              ? "border-purple-400/30 bg-purple-50/30 dark:border-purple-600/20 dark:bg-zinc-900/40"
              : "border-green-400/30 bg-green-50/30 dark:border-green-600/20 dark:bg-zinc-900/40"
        }`}
      >
        <p>
          Simulação realizada em {format(new Date(), "PP", { locale: ptBR })}.
          Valores meramente ilustrativos.
        </p>
        <p className="mt-2">
          {tipoInvestimento === "poupanca"
            ? "A poupança tem rendimento de 0,5% ao mês + TR. Consulte as regras atuais no site do Banco Central."
            : tipoInvestimento === "tesouro"
              ? "O Tesouro Selic está sujeito à marcação a mercado. Consulte as taxas atuais no site do Tesouro Direto."
              : "O CDB tem rendimento atrelado ao CDI. Consulte as taxas e condições na sua instituição financeira."}
        </p>
      </div>
    </div>
  );
}
