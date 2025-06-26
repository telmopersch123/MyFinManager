"use client";
import { ParcelamentoResultado } from "@/app/_interfaces/interface";

import Alert_Dialog from "@/app/transactions/_components/components/alert-dialog";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  customHandleCapitalChange,
  FormatDate,
  formatFromFractionToBRL,
  formatToBRL,
  isValidDate,
} from "./formatFunctions";
import MensagemEmpty from "./mensagemEmpty";

interface CalculadoraSimulatorProps {
  controlMSGEmpty: boolean;
  setControlMSGEmptyAction: (value: boolean) => void;
  mudadedCopyParcelamento: {
    campo1: string;
    campo2: string;
    campo3: string;
    campo4: string;
    campo5: string;
    campo6: string;
    campo7: string;
    campo8: string;
    campo9: string;
    campo10: string;
    campo11: CronogramaItem[];
  };
  setRefreshCalculationsAction: React.Dispatch<React.SetStateAction<number>>;
  controlVisibleCheck: boolean;
  handleCliqueAction: () => void;
  setSaldoDevedorGraphicsAction: React.Dispatch<React.SetStateAction<string[]>>;
  setAmortizacaoGraphicsAction: React.Dispatch<React.SetStateAction<string[]>>;
  setjurosGraphicsAction: React.Dispatch<React.SetStateAction<string[]>>;
  setDataVencimentoGraphicsAction: React.Dispatch<
    React.SetStateAction<string[]>
  >;
  setResultadoAction: React.Dispatch<
    React.SetStateAction<ParcelamentoResultado | undefined>
  >;
  resultado: ParcelamentoResultado | undefined;
}

type CronogramaItem = {
  parcela: string;
  dataVencimento: string;
  prestacao: string;
  juros: string;
  amortizacao: string;
  saldo: string;
  cronograma?: CronogramaItem[];
};

export const addMonthsToDate = (dateStr: string, months: number): string => {
  const [day, month, year] = dateStr.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  date.setMonth(date.getMonth() + months);

  const newDay = String(date.getDate()).padStart(2, "0");
  const newMonth = String(date.getMonth() + 1).padStart(2, "0");
  const newYear = date.getFullYear();

  return `${newDay}/${newMonth}/${newYear}`;
};

export default function SimuladorParcelamento({
  controlMSGEmpty,
  setControlMSGEmptyAction,
  mudadedCopyParcelamento,
  setRefreshCalculationsAction,
  controlVisibleCheck,
  handleCliqueAction,
  setSaldoDevedorGraphicsAction,
  setAmortizacaoGraphicsAction,
  setjurosGraphicsAction,
  setDataVencimentoGraphicsAction,
  setResultadoAction,
  resultado,
}: CalculadoraSimulatorProps) {
  const [inputOriginalValue, setInputOriginalValue] = useState<string>("");
  const [inputNumeroParcelas, setinputNumeroParcelas] = useState<string>("");
  const [inputJurosMes, setinputJurosMes] = useState<string>("");
  const [inputPrimeiroVencimento, setinputPrimeiroVencimento] =
    useState<string>("");
  const [open, setOpen] = useState<{ type: string; isOpen: boolean }>({
    type: "",
    isOpen: false,
  });
  const [isCalculated, setIsCalculated] = useState(false);

  useEffect(() => {
    if (resultado?.cronograma && resultado.cronograma.length > 0) {
      const saldos = resultado.cronograma.map((item) => item.saldo);
      const amortizacao = resultado.cronograma.map((item) => item.amortizacao);
      const juros = resultado.cronograma.map((item) => item.juros);
      const dataVencimento = resultado.cronograma.map(
        (item) => item.dataVencimento,
      );
      setDataVencimentoGraphicsAction(dataVencimento);
      setSaldoDevedorGraphicsAction(saldos);
      setAmortizacaoGraphicsAction(amortizacao);
      setjurosGraphicsAction(juros);
    } else {
      setDataVencimentoGraphicsAction([]);
      setSaldoDevedorGraphicsAction([]);
      setAmortizacaoGraphicsAction([]);
      setjurosGraphicsAction([]);
    }
  }, [
    resultado?.cronograma,
    setSaldoDevedorGraphicsAction,
    setAmortizacaoGraphicsAction,
    setDataVencimentoGraphicsAction,
    setjurosGraphicsAction,
  ]);

  async function handleCalcular() {
    try {
      if (!isValidDate(inputPrimeiroVencimento)) {
        setOpen({ type: "alert-2", isOpen: true });
        return;
      }
      if (
        inputOriginalValue === "" ||
        inputNumeroParcelas === "" ||
        inputJurosMes === "" ||
        inputPrimeiroVencimento === "" ||
        inputOriginalValue === "0,00" ||
        inputJurosMes === "0,00" ||
        inputNumeroParcelas === "0,00"
      ) {
        setControlMSGEmptyAction(true);
        return;
      }

      // Converte o valor da dívida corretamente
      const valorDivida = parseFloat(
        inputOriginalValue.replace(/\./g, "").replace(",", "."),
      );
      const parcelas = parseInt(inputNumeroParcelas);
      const jurosMes = parseFloat(
        inputJurosMes.replace(/\./g, "").replace(",", "."),
      );

      // Calcula o parcelamento (sistema Price)
      const taxaMensalDecimal = jurosMes / 100;
      const fator = Math.pow(1 + taxaMensalDecimal, parcelas);
      const prestacaoMensal =
        (valorDivida * (taxaMensalDecimal * fator)) / (fator - 1);
      const totalPagar = prestacaoMensal * parcelas;
      const totalJuros = totalPagar - valorDivida;

      const cronograma: CronogramaItem[] = [];
      let saldoAtual = valorDivida;

      for (let i = 1; i <= parcelas; i++) {
        const juros = saldoAtual * taxaMensalDecimal;
        const amortizacao = prestacaoMensal - juros;
        saldoAtual -= amortizacao;

        cronograma.push({
          parcela: i.toString(),
          dataVencimento: addMonthsToDate(inputPrimeiroVencimento, i - 1),
          prestacao: prestacaoMensal.toString(),
          juros: juros.toString(),
          amortizacao: amortizacao.toString(),
          saldo: (saldoAtual > 0 ? saldoAtual : 0).toString(),
        });
      }
      setOpen({ type: "", isOpen: false });
      setIsCalculated(true);
      setControlMSGEmptyAction(false);
      setResultadoAction({
        valorFinanciado: valorDivida.toString(),
        parcelas: parcelas.toString(),
        taxaMensal: jurosMes.toString(),
        prestacaoMensal: prestacaoMensal.toString(),
        totalJuros: totalJuros.toString(),
        totalPagar: totalPagar.toString(),
        cronograma: cronograma,
      });
      const cronogramaData = cronograma.map((item) => ({
        parcela: item.parcela,
        dataVencimento: item.dataVencimento,
        prestacao: item.prestacao,
        juros: item.juros,
        amortizacao: item.amortizacao,
        saldo: item.saldo,
      }));
      if (controlVisibleCheck) {
        const response = await fetch("/api/calculationsparcelamento", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            valorDivida: formatToBRL(valorDivida.toString()),
            parcelas: parcelas.toString(),
            jurosMes: jurosMes.toString(),
            primeiroVencimento: inputPrimeiroVencimento.toString(),
            valorFinanciado: formatToBRL(valorDivida.toString()),
            parcelasResultado: parcelas.toString(),
            taxaMensal: jurosMes.toString(),
            prestacaoMensal: formatToBRL(prestacaoMensal.toString()),
            totalJuros: formatToBRL(totalJuros.toString()),
            totalPagar: formatToBRL(totalPagar.toString()),
            cronogramaItems: cronogramaData,
          }),
        });

        if (response.ok) {
          setRefreshCalculationsAction((prev) => prev + 1);
        } else {
          console.error("Erro ao salvar cálculo:", await response.text());
        }
      }
    } catch (error) {
      console.error("Erro ao buscar cálculos:", error);
      return NextResponse.json(
        { error: "Erro interno do servidor" },
        { status: 500 },
      );
    }
  }

  useEffect(() => {
    if (mudadedCopyParcelamento) {
      setInputOriginalValue(mudadedCopyParcelamento.campo1);
      setinputNumeroParcelas(mudadedCopyParcelamento.campo2);
      setinputJurosMes(mudadedCopyParcelamento.campo3);
      setinputPrimeiroVencimento(mudadedCopyParcelamento.campo4);
      setResultadoAction({
        valorFinanciado: mudadedCopyParcelamento.campo5,
        parcelas: mudadedCopyParcelamento.campo6,
        taxaMensal: mudadedCopyParcelamento.campo7,
        prestacaoMensal: mudadedCopyParcelamento.campo8,
        totalJuros: mudadedCopyParcelamento.campo9,
        totalPagar: mudadedCopyParcelamento.campo10,
        cronograma: mudadedCopyParcelamento.campo11,
      });

      setIsCalculated(false);
    }
  }, [mudadedCopyParcelamento, setIsCalculated, setResultadoAction]);

  return (
    <div className="mx-auto mt-1 max-w-[450px] rounded-xl bg-[hsl(var(--background))] p-6 shadow-lg dark:bg-neutral-900">
      <h1 className="mb-4 text-center text-2xl font-bold text-[hsl(var(--foreground))] dark:text-white">
        Calculadora de Parcelamento
      </h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
            Valor original da dívida (R$)
          </label>
          <Input
            type="text"
            value={inputOriginalValue}
            onChange={(e) => {
              customHandleCapitalChange(e, setInputOriginalValue);
            }}
            className="w-full border-[hsl(var(--border))] bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--ring))] dark:border-neutral-700 dark:bg-neutral-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
            placeholder="00.000.000.000,00"
          />
          <MensagemEmpty
            controlMSGEmpty={controlMSGEmpty}
            tipo={inputOriginalValue}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
            Número de parcelas (mensais)
          </label>
          <Input
            type="text"
            value={inputNumeroParcelas}
            onChange={(e) => {
              setinputNumeroParcelas(e.target.value);
            }}
            className="w-full border-[hsl(var(--border))] bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--ring))] dark:border-neutral-700 dark:bg-neutral-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
            placeholder="000"
          />
          <MensagemEmpty
            controlMSGEmpty={controlMSGEmpty}
            tipo={inputNumeroParcelas}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
            Juros ao Mês (%)
          </label>
          <Input
            type="text"
            value={inputJurosMes}
            onChange={(e) => {
              customHandleCapitalChange(e, setinputJurosMes);
            }}
            className="w-full border-[hsl(var(--border))] bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--ring))] dark:border-neutral-700 dark:bg-neutral-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
            placeholder="000,000"
          />
          <MensagemEmpty
            controlMSGEmpty={controlMSGEmpty}
            tipo={inputJurosMes}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
            Primeiro Vencimento
          </label>
          <Input
            type="text"
            value={inputPrimeiroVencimento}
            onChange={(e) => {
              FormatDate(e, setinputPrimeiroVencimento);
            }}
            className="w-full border-[hsl(var(--border))] bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--ring))] dark:border-neutral-700 dark:bg-neutral-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
            placeholder="00/00/0000"
          />
          <MensagemEmpty
            controlMSGEmpty={controlMSGEmpty}
            tipo={inputPrimeiroVencimento}
          />
        </div>
        <Button
          onClick={() => {
            handleCliqueAction();
            handleCalcular();
          }}
          className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90 dark:bg-primary dark:text-white dark:hover:bg-primary/90"
        >
          Simular
        </Button>
      </div>
      <Alert_Dialog open={open} setOpenAction={setOpen} />
      <div className="mt-4 w-auto space-y-2 rounded-md bg-[hsl(var(--card))] p-4 dark:bg-neutral-800">
        <p className="text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
          Valor Financiado:{" "}
          <span className="font-bold text-[hsl(var(--foreground))] dark:text-white">
            {isCalculated
              ? formatToBRL(resultado?.valorFinanciado ?? 0)
              : resultado?.valorFinanciado
                ? "R$ " + resultado?.valorFinanciado
                : "R$ 0,00"}
          </span>
        </p>
        <p className="text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
          Número de parcelas:{" "}
          <span className="font-bold text-[hsl(var(--foreground))] dark:text-white">
            {" "}
            {resultado?.parcelas || 0}
          </span>
        </p>
        <p className="text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
          Taxa mensal:{" "}
          <span className="font-bold text-[hsl(var(--foreground))] dark:text-white">
            {" "}
            {resultado?.taxaMensal || "0"} %
          </span>
        </p>
        <p className="text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
          Prestação mensal:{" "}
          <span className="font-bold text-[hsl(var(--foreground))] dark:text-white">
            {isCalculated
              ? formatToBRL(resultado?.prestacaoMensal ?? 0)
              : resultado?.prestacaoMensal
                ? "R$ " + resultado?.prestacaoMensal
                : "R$ 0,00"}
          </span>
        </p>
        <p className="text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
          Total de juros:{" "}
          <span className="font-bold text-[hsl(var(--foreground))] dark:text-white">
            {" "}
            {isCalculated
              ? formatToBRL(resultado?.totalJuros ?? 0)
              : resultado?.totalJuros
                ? "R$ " + resultado?.totalJuros
                : "R$ 0,00"}
          </span>
        </p>
        <p className="text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
          Total a pagar:{" "}
          <span className="font-bold text-[hsl(var(--foreground))] dark:text-white">
            {" "}
            {isCalculated
              ? formatToBRL(resultado?.totalPagar ?? 0)
              : resultado?.totalPagar
                ? "R$ " + resultado?.totalPagar
                : "R$ 0,00"}
          </span>
        </p>
        {resultado?.cronograma && resultado.cronograma.length > 0 && (
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
                        Parcela
                      </TableHead>
                      <TableHead className="w-[15%] min-w-[60px] max-w-[100px] px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:w-[12%] sm:min-w-[80px] sm:max-w-[120px] sm:px-2 sm:py-2 sm:text-sm md:max-w-[180px] md:px-4 md:py-4 md:text-base lg:max-w-[200px] xl:max-w-[220px]">
                        Vencimento
                      </TableHead>
                      <TableHead className="w-[20%] min-w-[80px] max-w-[120px] px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:w-[20%] sm:min-w-[100px] sm:max-w-[140px] sm:px-2 sm:py-2 sm:text-sm md:max-w-[200px] md:px-4 md:py-4 md:text-base lg:max-w-[220px] xl:max-w-[240px]">
                        Prestação
                      </TableHead>
                      <TableHead className="w-[20%] min-w-[80px] max-w-[120px] px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:table-cell sm:w-[20%] sm:min-w-[100px] sm:max-w-[140px] sm:px-2 sm:py-2 sm:text-sm md:max-w-[200px] md:px-4 md:py-4 md:text-base lg:max-w-[220px] xl:max-w-[240px]">
                        Juros
                      </TableHead>
                      <TableHead className="w-[20%] min-w-[80px] max-w-[120px] px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:table-cell sm:w-[20%] sm:min-w-[100px] sm:max-w-[140px] sm:px-2 sm:py-2 sm:text-sm md:max-w-[200px] md:px-4 md:py-4 md:text-base lg:max-w-[220px] xl:max-w-[240px]">
                        Amortização
                      </TableHead>
                      <TableHead className="w-[15%] min-w-[60px] max-w-[100px] px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:w-[20%] sm:min-w-[80px] sm:max-w-[120px] sm:px-2 sm:py-2 sm:text-sm md:max-w-[180px] md:px-4 md:py-4 md:text-base lg:max-w-[200px] xl:max-w-[220px]">
                        Saldo
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resultado.cronograma.map((item) => (
                      <TableRow
                        key={item.parcela}
                        className="border-b border-[hsl(var(--border))] hover:bg-[hsl(var(--card))]/90 dark:border-b dark:border-neutral-700 dark:hover:bg-neutral-800"
                      >
                        <TableCell className="break-words px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:px-2 sm:py-2 sm:text-sm md:px-4 md:py-4 md:text-base">
                          {item.parcela}
                        </TableCell>
                        <TableCell className="break-words px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:px-2 sm:py-2 sm:text-sm md:px-4 md:py-4 md:text-base">
                          {item.dataVencimento}
                        </TableCell>
                        <TableCell className="break-words px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:px-2 sm:py-2 sm:text-sm md:px-4 md:py-4 md:text-base">
                          {formatFromFractionToBRL(item.prestacao)}
                        </TableCell>
                        <TableCell className="break-words px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:table-cell sm:px-2 sm:py-2 sm:text-sm md:px-4 md:py-4 md:text-base">
                          {formatFromFractionToBRL(item.juros)}
                        </TableCell>
                        <TableCell className="break-words px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:table-cell sm:px-2 sm:py-2 sm:text-sm md:px-4 md:py-4 md:text-base">
                          {formatFromFractionToBRL(item.amortizacao)}
                        </TableCell>
                        <TableCell className="break-words px-1 py-1 text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-300 sm:px-2 sm:py-2 sm:text-sm md:px-4 md:py-4 md:text-base">
                          {formatFromFractionToBRL(item.saldo)}
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
