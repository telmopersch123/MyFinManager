import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { MonthlyData } from "@/app/_interfaces/interface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { customHandleCapitalChange, formatToBRL } from "./formatFunctions";
import MensagemEmpty from "./mensagemEmpty";
import { addMonthsToDate } from "./Parcelamento-Component";

interface JurosCompostosComponentProps {
  inputRef: React.RefObject<HTMLInputElement>;
  capital: string;
  setCapital: React.Dispatch<React.SetStateAction<string>>;
  taxa: string;
  setTaxa: React.Dispatch<React.SetStateAction<string>>;
  tempo: string;
  setTempo: React.Dispatch<React.SetStateAction<string>>;
  juros: string;
  montante: string;
  controlMSGEmpty: boolean;
  handleTempoInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setControlMSGEmpty: (value: boolean) => void;
  setJuros: React.Dispatch<React.SetStateAction<string>>;
  setMontante: React.Dispatch<React.SetStateAction<string>>;
  setCapitalInvestido: React.Dispatch<React.SetStateAction<string>>;
  capitalInvestido: string;
  setRefreshCalculations: React.Dispatch<React.SetStateAction<number>>;
  mudadedCopyJuros: {
    campo1: string;
    campo2: string;
    campo3: string;
    numero: string;
    campo4: string;
    campo5: string;
    campo6: string;
    campo7: string;
    campo8: string;
    campo9: MonthlyData[];
  };
  handleClique: () => void;
  setMonthlyData: React.Dispatch<React.SetStateAction<MonthlyData[]>>;
  monthlyData: MonthlyData[];
  controlVisibleCheck: boolean;
  setIsCalculated: React.Dispatch<React.SetStateAction<boolean>>;
  isCalculated: boolean;
}

export default function JurosCompostosComponent({
  inputRef,
  capital,
  setCapital,
  taxa,
  setTaxa,
  tempo,
  setTempo,
  juros,
  montante,
  controlMSGEmpty,
  handleTempoInput,
  setControlMSGEmpty,
  setJuros,
  setMontante,
  setCapitalInvestido,
  capitalInvestido,
  setRefreshCalculations,
  mudadedCopyJuros,
  handleClique,
  setMonthlyData,
  monthlyData,
  controlVisibleCheck,
  setIsCalculated,
  isCalculated,
}: JurosCompostosComponentProps) {
  const [periodoTaxa, setPeriodoTaxa] = useState<"mensal" | "anual">("anual");
  const [periodoTempo, setPeriodoTempo] = useState<"meses" | "anos">("anos");
  const [aporteMensal, setAporteMensal] = useState("");

  async function handleCalcular() {
    try {
      const c = parseFloat(capital.replace(/\./g, "").replace(",", "."));
      let i = parseFloat(taxa.replace(",", "."));
      const t = parseFloat(tempo) || 0;
      const a = parseFloat(aporteMensal.replace(/\./g, "").replace(",", "."));

      if (c <= 0 || i <= 0 || t <= 0 || a <= 0) {
        setControlMSGEmpty(true);
        return;
      }

      let meses = t;
      i = i / 100;

      if (periodoTaxa === "anual" && periodoTempo === "anos") {
        i = Math.pow(1 + i, 1 / 12) - 1;
        meses = t * 12;
      } else if (periodoTaxa === "anual" && periodoTempo === "meses") {
        i = Math.pow(1 + i, 1 / 12) - 1;
        meses = t;
      } else if (periodoTaxa === "mensal" && periodoTempo === "anos") {
        meses = t * 12;
      } else if (periodoTaxa === "mensal" && periodoTempo === "meses") {
        meses = t;
      }

      const monthlyDataCalc: MonthlyData[] = [];
      let currentBalance = c;
      let totalInterest = 0;

      for (let n = 0; n < meses; n++) {
        const interest = currentBalance * i;
        currentBalance = currentBalance + interest + a;
        const totalInvested = c + a * (n + 1);
        totalInterest += interest;
        monthlyDataCalc.push({
          mes: addMonthsToDate(
            new Date().getDate() +
              "/" +
              new Date().getMonth() +
              "/" +
              new Date().getFullYear(),
            n + 1,
          ),
          jurosMensal: Number(interest),
          totalInvestido: Number(totalInvested),
          totalJuros: Number(totalInterest),
          valorAcumulado: Number(currentBalance),
        });
      }

      const m = currentBalance;
      const j = m - (c + a * meses);
      const totalInvestido = c + a * meses;

      setMontante(m.toFixed(2));
      setJuros(j.toFixed(2));
      setCapitalInvestido(totalInvestido.toFixed(2));
      setMonthlyData(monthlyDataCalc);
      setControlMSGEmpty(false);
      setIsCalculated(true);

      if (controlVisibleCheck) {
        const response = await fetch("/api/calculationsjuros", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            capitalinicial: formatToBRL(c.toString()),
            valorMensal: formatToBRL(a.toString()),
            taxajuros: taxa,
            taxajurosUnidade: periodoTaxa,
            tempo: tempo,
            tempoUnidade: periodoTempo,
            valorInvestido: formatToBRL(c.toString()),
            totalganhoemjuros: formatToBRL(j.toFixed(2)),
            valortotalfinal: formatToBRL(m.toFixed(2)),
            valoresMensais: monthlyDataCalc,
          }),
        });
        if (response.ok) {
          setRefreshCalculations((prev) => prev + 1);
        } else {
          console.error("Erro ao salvar cálculo:", await response.text());
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (mudadedCopyJuros) {
      setCapital(mudadedCopyJuros.campo1);
      setAporteMensal(mudadedCopyJuros.campo2);
      setTaxa(mudadedCopyJuros.campo3);
      setTempo(mudadedCopyJuros.numero.toString());
      if (
        mudadedCopyJuros.campo4 === "mensal" ||
        mudadedCopyJuros.campo4 === "anual"
      ) {
        setPeriodoTaxa(mudadedCopyJuros.campo4);
      }
      if (
        mudadedCopyJuros.campo5 === "mensal" ||
        mudadedCopyJuros.campo5 === "anual"
      ) {
        setPeriodoTempo(
          mudadedCopyJuros.campo5 === "mensal" ? "meses" : "anos",
        );
      }
      setCapitalInvestido(mudadedCopyJuros.campo6);
      setJuros(mudadedCopyJuros.campo7);
      setMontante(mudadedCopyJuros.campo8);
      setMonthlyData(mudadedCopyJuros.campo9);
      setIsCalculated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mudadedCopyJuros]);

  return (
    <div className="mx-auto w-auto max-w-md rounded-xl bg-[hsl(var(--background))] p-6 shadow-lg dark:bg-neutral-900">
      <h1 className="mb-4 text-center text-2xl font-bold text-[hsl(var(--foreground))] dark:text-white">
        Calculadora de Juros Compostos
      </h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
            Capital Inicial (R$)
          </label>
          <Input
            ref={inputRef}
            type="text"
            value={capital}
            onChange={(e) => customHandleCapitalChange(e, setCapital)}
            className="w-full border-[hsl(var(--border))] bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--ring))] dark:border-neutral-700 dark:bg-neutral-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
            placeholder="0"
          />
          <MensagemEmpty controlMSGEmpty={controlMSGEmpty} tipo={capital} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
            Valor Mensal (R$)
          </label>
          <Input
            ref={inputRef}
            type="text"
            value={aporteMensal}
            onChange={(e) => customHandleCapitalChange(e, setAporteMensal)}
            className="w-full border-[hsl(var(--border))] bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--ring))] dark:border-neutral-700 dark:bg-neutral-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
            placeholder="0"
          />
          <MensagemEmpty
            controlMSGEmpty={controlMSGEmpty}
            tipo={aporteMensal}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
            Taxa de Juros (% {periodoTaxa})
          </label>
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              type="text"
              value={taxa}
              onChange={(e) => customHandleCapitalChange(e, setTaxa)}
              className="w-full border-[hsl(var(--border))] bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--ring))] dark:border-neutral-700 dark:bg-neutral-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
              placeholder="0"
            />
            <Select
              value={periodoTaxa}
              onValueChange={(value: "mensal" | "anual") =>
                setPeriodoTaxa(value)
              }
            >
              <SelectTrigger className="w-[120px] border-[hsl(var(--border))] bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] dark:border-neutral-700 dark:bg-neutral-700 dark:text-white">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] dark:bg-neutral-700 dark:text-white">
                <SelectItem value="mensal">Mensal</SelectItem>
                <SelectItem value="anual">Anual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <MensagemEmpty controlMSGEmpty={controlMSGEmpty} tipo={taxa} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
            Tempo ({periodoTempo === "anos" ? "Anos" : "Meses"})
          </label>
          <div className="flex space-x-2">
            <Input
              type="text"
              value={tempo}
              onChange={handleTempoInput}
              className="w-full border-[hsl(var(--border))] bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--ring))] dark:border-neutral-700 dark:bg-neutral-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
              placeholder="0"
            />
            <Select
              value={periodoTempo}
              onValueChange={(value: "meses" | "anos") =>
                setPeriodoTempo(value)
              }
            >
              <SelectTrigger className="w-[120px] border-[hsl(var(--border))] bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] dark:border-neutral-700 dark:bg-neutral-700 dark:text-white">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] dark:bg-neutral-700 dark:text-white">
                <SelectItem value="meses">Meses</SelectItem>
                <SelectItem value="anos">Anos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <MensagemEmpty controlMSGEmpty={controlMSGEmpty} tipo={tempo} />
        </div>
        <Button
          onClick={() => {
            handleCalcular();
            handleClique();
          }}
          className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90 dark:bg-primary dark:text-white dark:hover:bg-primary/90"
        >
          Calcular
        </Button>
      </div>
      <div className="mt-4 space-y-2 rounded-md bg-[hsl(var(--card))] p-4 dark:bg-neutral-800">
        <p className="text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
          Valor Investido:{" "}
          <span className="break-words font-bold text-[hsl(var(--foreground))] dark:text-white">
            {isCalculated
              ? formatToBRL(capitalInvestido)
              : capitalInvestido
                ? "R$ " + capitalInvestido
                : "R$ 0,00"}
          </span>
        </p>
        <p className="text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
          Total ganho em juros:{" "}
          <span className="break-words font-bold text-[hsl(var(--foreground))] dark:text-white">
            {isCalculated
              ? formatToBRL(juros)
              : juros
                ? "R$ " + juros
                : "R$ 0,00"}
          </span>
        </p>
        <p className="text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
          Valor Total Final:{" "}
          <span className="break-words font-bold text-[hsl(var(--foreground))] dark:text-white">
            {isCalculated
              ? formatToBRL(montante)
              : montante
                ? "R$ " + montante
                : "R$ 0,00"}
          </span>
        </p>
        {monthlyData.length > 0 &&
          monthlyData.some((item) => !Number.isNaN(item.valorAcumulado)) && (
            <div className="mx-auto mt-6 flex max-h-[500px] w-[60vw] flex-col items-center justify-center text-center sm:w-full">
              <h2 className="mb-4 text-xl font-bold text-[hsl(var(--foreground))] dark:text-white">
                Cronograma
              </h2>
              <div className="max-w-full overflow-x-auto rounded-md border-[hsl(var(--border))] dark:border-neutral-700">
                <div className="w-full max-w-full overflow-x-auto rounded-md border-[hsl(var(--border))] dark:border-neutral-700">
                  <Table className="table-auto">
                    <TableHeader>
                      <TableRow className="bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted))] dark:bg-neutral-700 dark:hover:bg-neutral-700">
                        <TableHead className="w-[10%] min-w-[50px] max-w-[80px] px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:w-[8%] sm:min-w-[60px] sm:max-w-[100px] sm:px-2 sm:py-2 sm:text-sm md:max-w-[160px] md:px-4 md:py-4 md:text-base lg:max-w-[180px] xl:max-w-[200px]">
                          Mês
                        </TableHead>
                        <TableHead className="w-[20%] min-w-[80px] max-w-[120px] px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:w-[20%] sm:min-w-[100px] sm:max-w-[140px] sm:px-2 sm:py-2 sm:text-sm md:max-w-[200px] md:px-4 md:py-4 md:text-base lg:max-w-[220px] xl:max-w-[240px]">
                          Juros (R$)
                        </TableHead>
                        <TableHead className="w-[20%] min-w-[80px] max-w-[120px] px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:w-[20%] sm:min-w-[100px] sm:max-w-[140px] sm:px-2 sm:py-2 sm:text-sm md:max-w-[200px] md:px-4 md:py-4 md:text-base lg:max-w-[220px] xl:max-w-[240px]">
                          Total Investido (R$)
                        </TableHead>
                        <TableHead className="w-[20%] min-w-[80px] max-w-[120px] px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:w-[20%] sm:min-w-[100px] sm:max-w-[140px] sm:px-2 sm:py-2 sm:text-sm md:max-w-[200px] md:px-4 md:py-4 md:text-base lg:max-w-[220px] xl:max-w-[240px]">
                          Total Juros (R$)
                        </TableHead>
                        <TableHead className="w-[20%] min-w-[80px] max-w-[120px] px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:w-[20%] sm:min-w-[100px] sm:max-w-[140px] sm:px-2 sm:py-2 sm:text-sm md:max-w-[200px] md:px-4 md:py-4 md:text-base lg:max-w-[220px] xl:max-w-[240px]">
                          Total Acumulado (R$)
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monthlyData.map((data) => (
                        <TableRow
                          key={data.mes}
                          className="border-b border-[hsl(var(--border))] hover:bg-[hsl(var(--card))]/90 dark:border-b dark:border-neutral-700 dark:hover:bg-neutral-800"
                        >
                          <TableCell className="break-words px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:px-2 sm:py-2 sm:text-sm md:px-4 md:py-4 md:text-base">
                            {data.mes}
                          </TableCell>
                          <TableCell className="break-words px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:px-2 sm:py-2 sm:text-sm md:px-4 md:py-4 md:text-base">
                            {formatToBRL(data.jurosMensal)}
                          </TableCell>
                          <TableCell className="break-words px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:px-2 sm:py-2 sm:text-sm md:px-4 md:py-4 md:text-base">
                            {formatToBRL(data.totalInvestido)}
                          </TableCell>
                          <TableCell className="break-words px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:px-2 sm:py-2 sm:text-sm md:px-4 md:py-4 md:text-base">
                            {formatToBRL(data.totalJuros)}
                          </TableCell>
                          <TableCell className="break-words px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:px-2 sm:py-2 sm:text-sm md:px-4 md:py-4 md:text-base">
                            {formatToBRL(data.valorAcumulado)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
