"use client";
import { CalculationParcelamento } from "@/app/_interfaces/interface";
import { Copy, Loader2, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { formatDateTime } from "./formatFunctions";
import OpenFormated from "./open-formated";

interface CronogramaItem {
  parcela: string;
  dataVencimento: string;
  prestacao: string;
  juros: string;
  amortizacao: string;
  saldo: string;
}

interface MudadedCopyParcelamento {
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
}

interface SavedCalculationsProps {
  setMudadedCopyParcelamentoAction: React.Dispatch<
    React.SetStateAction<MudadedCopyParcelamento>
  >;
  refresh: number;
  divHeight: number;
  setCalculationsAction: React.Dispatch<
    React.SetStateAction<CalculationParcelamento[]>
  >;
  calculations: CalculationParcelamento[];
}

export default function SavedCalculationParcelamento({
  setMudadedCopyParcelamentoAction,
  refresh,
  divHeight,
  setCalculationsAction,
  calculations,
}: SavedCalculationsProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCalculationsParcelamento() {
      try {
        const response = await fetch("/api/calculationsparcelamento");
        if (response.ok) {
          const data = await response.json();
          setCalculationsAction(data);
        } else {
          console.error(
            "Erro ao obter cálculos salvos:",
            await response.text(),
          );
        }
      } catch (error) {
        console.error("Erro ao buscar cálculos salvos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCalculationsParcelamento();
  }, [refresh, setCalculationsAction]);

  async function handleDeleteParcelamento(id: string) {
    try {
      const response = await fetch(
        `/api/calculationsparcelamento/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        setCalculationsAction((prev) => prev.filter((calc) => calc.id !== id));
      } else {
        console.error("Erro ao deletar cálculo:", await response.text());
      }
    } catch (error) {
      console.error("Erro ao deletar cálculo:", error);
    }
  }

  async function handleClearAll() {
    try {
      const response = await fetch("/api/calculationsparcelamento", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setCalculationsAction([]);
      } else {
        console.error("Erro ao deletar cálculo:", await response.text());
      }
    } catch (error) {
      console.error("Erro ao deletar cálculo:", error);
    }
  }

  return (
    <div
      style={{ maxHeight: `${divHeight}px`, minHeight: `${divHeight}px` }}
      className="custom-scrollbar h-auto w-auto min-w-[250px] overflow-y-auto rounded-xl bg-[hsl(var(--background))] p-4 dark:bg-neutral-700/10"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] dark:text-white">
          Cálculos Salvos
        </h3>
        <Button
          className="bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))]/30 dark:bg-red-600/20 dark:text-red-500 dark:hover:bg-red-600/30"
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
        >
          Limpar Todos
        </Button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-[hsl(var(--muted-foreground))] dark:text-neutral-400" />
        </div>
      ) : calculations.length === 0 ? (
        <p className="text-center text-[hsl(var(--muted-foreground))] dark:text-neutral-400">
          Nenhum cálculo salvo.
        </p>
      ) : (
        <div className="space-y-3">
          {calculations.map((calc) => (
            <div
              key={calc.id}
              className="hover:bg-neutral-750 flex flex-col justify-between rounded-xl border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-sm transition-all duration-200 hover:border-[hsl(var(--primary))]/50 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-primary/50 dark:hover:shadow-md sm:flex-row sm:items-center"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <label className="w-24 text-xs font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
                    Valor da Dívida:
                  </label>
                  <Input
                    value={calc.valorDivida}
                    readOnly
                    className="h-7 flex-1 border-none bg-transparent font-mono text-sm text-[hsl(var(--foreground))] dark:text-neutral-200"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="w-24 text-xs font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
                    Parcelas:
                  </label>
                  <Input
                    value={calc.parcelas}
                    readOnly
                    className="h-7 flex-1 border-none bg-transparent text-sm text-[hsl(var(--foreground))] focus:ring-0 dark:text-neutral-200"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="w-24 text-xs font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
                    Juros ao Mês:
                  </label>
                  <Input
                    value={calc.jurosMes + " %"}
                    readOnly
                    className="h-7 flex-1 border-none bg-transparent text-sm font-semibold text-[hsl(var(--foreground))] focus:ring-0 dark:text-neutral-200"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="w-24 text-xs font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
                    Primeiro Vencimento:
                  </label>
                  <Input
                    value={calc.primeiroVencimento}
                    readOnly
                    className="h-7 flex-1 border-none bg-transparent text-sm text-[hsl(var(--foreground))] focus:ring-0 dark:text-neutral-200"
                  />
                </div>
                <hr className="my-2 w-full border-[hsl(var(--border))] dark:border-neutral-600" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <label className="w-24 text-xs font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
                      Valor Financiado:
                    </label>
                    <Input
                      value={calc.valorFinanciado}
                      readOnly
                      className="h-7 flex-1 border-none bg-transparent font-mono text-sm text-[hsl(var(--foreground))] focus:ring-0 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-24 text-xs font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
                      Parcelas:
                    </label>
                    <Input
                      value={calc.parcelas}
                      readOnly
                      className="h-7 flex-1 border-none bg-transparent text-sm text-[hsl(var(--foreground))] focus:ring-0 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-24 text-xs font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
                      Taxa Mensal:
                    </label>
                    <Input
                      value={calc.taxaMensal + " %"}
                      readOnly
                      className="h-7 flex-1 border-none bg-transparent text-sm text-[hsl(var(--foreground))] focus:ring-0 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-24 text-xs font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
                      Prestação Mensal:
                    </label>
                    <Input
                      value={calc.prestacaoMensal}
                      readOnly
                      className="h-7 flex-1 border-none bg-transparent font-mono text-sm text-[hsl(var(--foreground))] focus:ring-0 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-24 text-xs font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
                      Total de Juros:
                    </label>
                    <Input
                      value={calc.totalJuros}
                      readOnly
                      className="h-7 flex-1 border-none bg-transparent font-mono text-sm text-[hsl(var(--foreground))] focus:ring-0 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-24 text-xs font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
                      Total a Pagar:
                    </label>
                    <Input
                      value={calc.totalPagar}
                      readOnly
                      className="h-7 flex-1 border-none bg-transparent font-mono text-sm text-[hsl(var(--foreground))] focus:ring-0 dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="w-24 text-xs font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
                    Criado em:
                  </label>
                  <Input
                    value={formatDateTime(calc.createdAt)}
                    readOnly
                    className="h-7 flex-1 border-none bg-transparent text-xs text-[hsl(var(--muted-foreground))] focus:ring-0 dark:text-neutral-400"
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-row gap-2 sm:ml-4 sm:mt-0 sm:flex-col">
                <Button
                  className="h-9 w-9 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]/80 hover:text-[hsl(var(--foreground))] dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:hover:text-white"
                  variant="ghost"
                  size="icon"
                  aria-label="Copiar cálculo"
                  title="Copiar cálculo"
                  onClick={() =>
                    setMudadedCopyParcelamentoAction({
                      campo1: (calc.valorDivida ?? "").replace("R$", "").trim(),
                      campo2: calc.parcelas ?? "",
                      campo3: calc.jurosMes ?? "",
                      campo4: calc.primeiroVencimento || "00/00/0000",
                      campo5: (calc.valorFinanciado ?? "")
                        .replace("R$", "")
                        .trim(),
                      campo6: calc.parcelasResultado ?? "",
                      campo7: calc.taxaMensal ?? "",
                      campo8: (calc.prestacaoMensal ?? "")
                        .replace("R$", "")
                        .trim(),
                      campo9: (calc.totalJuros ?? "").replace("R$", "").trim(),
                      campo10: (calc.totalPagar ?? "").replace("R$", "").trim(),
                      campo11: Array.isArray(calc.cronogramaItems)
                        ? calc.cronogramaItems.map((item) => ({
                            parcela: item.parcela,
                            dataVencimento: item.dataVencimento,
                            prestacao: item.prestacao,
                            juros: item.juros,
                            amortizacao: item.amortizacao,
                            saldo: item.saldo,
                          }))
                        : [],
                    })
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  title="Excluir cálculo"
                  className="h-9 w-9 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))]/30 hover:text-[hsl(var(--destructive))] dark:bg-neutral-700 dark:text-red-500 dark:hover:bg-red-600/30 dark:hover:text-red-400"
                  variant="ghost"
                  size="icon"
                  aria-label="Excluir cálculo"
                  onClick={() => handleDeleteParcelamento(calc.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
                <OpenFormated
                  title="parcelamento"
                  date={calc.createdAt}
                  Formula1={calc.valorDivida}
                  Formula2={calc.parcelas}
                  Formula3={calc.jurosMes}
                  Formula4={calc.primeiroVencimento}
                  Formula5={calc.valorFinanciado}
                  Formula6={calc.parcelas}
                  Formula7={calc.taxaMensal}
                  Formula8={calc.prestacaoMensal}
                  Formula9={calc.totalJuros}
                  Formula10={calc.totalPagar}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
