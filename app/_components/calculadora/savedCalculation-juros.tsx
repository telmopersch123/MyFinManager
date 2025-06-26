"use client";
import { MonthlyData } from "@/app/_interfaces/interface";
import { Copy, Loader2, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { formatDateTime } from "./formatFunctions";
import OpenFormated from "./open-formated";

interface setCalculationsProps {
  id: string;
  capitalinicial: string;
  valorMensal: string;
  taxajuros: string;
  taxajurosUnidade: string;
  tempo: string;
  tempoUnidade: string;
  valorInvestido: string;
  totalganhoemjuros: string;
  valortotalfinal: string;
  valoresMensais: MonthlyData[];
  createdAt: string;
}

type SavedCalculationsProps = {
  setMudadedCopyJurosAction: React.Dispatch<
    React.SetStateAction<{
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
    }>
  >;
  refresh: number;
  divHeight: number;
  setCatchDateAction: React.Dispatch<React.SetStateAction<string>>;
  setCalculationsAction: React.Dispatch<
    React.SetStateAction<setCalculationsProps[]>
  >;
  calculations: setCalculationsProps[];
};

export default function SavedCalculationJuros({
  setMudadedCopyJurosAction,
  refresh,
  divHeight,
  setCatchDateAction,
  setCalculationsAction,
  calculations,
}: SavedCalculationsProps) {
  const [isLoading, setIsLoading] = useState(!calculations.length);

  useEffect(() => {
    async function fetchCalculationsJuros() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/calculationsjuros");
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
    if (!calculations.length || refresh) {
      fetchCalculationsJuros();
    } else {
      setIsLoading(false);
    }
  }, [refresh, calculations.length, setCalculationsAction]);

  async function handleDeleteCalculation(id: string) {
    try {
      const response = await fetch(`/api/calculationsjuros/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setCalculationsAction((prev: setCalculationsProps[]) =>
          prev.filter((calc) => calc.id !== id),
        );
      } else {
        console.error("Erro ao deletar cálculo:", await response.text());
      }
    } catch (error) {
      console.error("Erro ao deletar cálculo:", error);
    }
  }

  async function handleClearAll() {
    try {
      const response = await fetch("/api/calculationsjuros", {
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
                    Capital Inicial:
                  </label>
                  <Input
                    value={calc.capitalinicial}
                    readOnly
                    className="h-7 flex-1 border-none bg-transparent font-mono text-sm text-[hsl(var(--foreground))] focus:ring-0 dark:text-neutral-200"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="w-24 text-xs font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
                    Valor Mensal:
                  </label>
                  <Input
                    value={calc.valorMensal || "Nenhum Resultado"}
                    readOnly
                    className={`h-7 flex-1 border-none bg-transparent text-xs ${calc.valorMensal ? "text-[hsl(var(--foreground))] dark:text-white" : "text-[hsl(var(--muted-foreground))] dark:text-neutral-400"} focus:ring-0`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="w-24 text-xs font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
                    Taxa de Juros:
                  </label>
                  <Input
                    value={calc.taxajuros}
                    readOnly
                    className="h-7 flex-1 border-none bg-transparent text-sm font-semibold text-[hsl(var(--foreground))] focus:ring-0 dark:text-neutral-200"
                  />
                  <span className="text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-400">
                    {calc.taxajurosUnidade}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="w-24 text-xs font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
                    Tempo:
                  </label>
                  <Input
                    value={calc.tempo}
                    readOnly
                    className="h-7 flex-1 border-none bg-transparent text-xs text-[hsl(var(--foreground))] focus:ring-0 dark:text-neutral-200"
                  />
                  <span className="text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-400">
                    {calc.tempoUnidade}
                  </span>
                </div>
                <hr className="my-2 w-full border-[hsl(var(--border))] dark:border-neutral-600" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <label className="w-24 text-xs font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
                      Valor Investido:
                    </label>
                    <Input
                      value={calc.valorInvestido}
                      readOnly
                      className="h-7 flex-1 border-none bg-transparent font-mono text-sm text-[hsl(var(--foreground))] focus:ring-0 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-24 text-xs font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
                      Juros Ganhos:
                    </label>
                    <Input
                      value={calc.totalganhoemjuros}
                      readOnly
                      className="h-7 flex-1 border-none bg-transparent font-mono text-sm text-[hsl(var(--foreground))] focus:ring-0 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-24 text-xs font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
                      Valor Final:
                    </label>
                    <Input
                      value={calc.valortotalfinal}
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
                  title="Copiar cálculo"
                  className="h-9 w-9 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]/80 hover:text-[hsl(var(--foreground))] dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:hover:text-white"
                  variant="ghost"
                  size="icon"
                  aria-label="Copiar cálculo"
                  onClick={() => {
                    setCatchDateAction(calc.createdAt);
                    setMudadedCopyJurosAction({
                      campo1: (calc.capitalinicial ?? "")
                        .replace("R$", "")
                        .trim(),
                      campo2: (calc.valorMensal ?? "").replace("R$", "").trim(),
                      campo3: (calc.taxajuros ?? "").replace("R$", "").trim(),
                      numero: calc.tempo,
                      campo4: calc.taxajurosUnidade,
                      campo5: calc.tempoUnidade,
                      campo6: (calc.valorInvestido ?? "")
                        .replace("R$", "")
                        .trim(),
                      campo7: (calc.totalganhoemjuros ?? "")
                        .replace("R$", "")
                        .trim(),
                      campo8: (calc.valortotalfinal ?? "")
                        .replace("R$", "")
                        .trim(),
                      campo9: calc.valoresMensais,
                    });
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  title="Excluir cálculo"
                  className="h-9 w-9 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))]/30 hover:text-[hsl(var(--destructive))] dark:bg-neutral-700 dark:text-red-500 dark:hover:bg-red-600/30 dark:hover:text-red-400"
                  variant="ghost"
                  size="icon"
                  aria-label="Excluir cálculo"
                  onClick={() => handleDeleteCalculation(calc.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
                <OpenFormated
                  title="juros"
                  date={calc.createdAt}
                  Formula1={calc.capitalinicial}
                  Formula2={calc.valorMensal}
                  Formula3={calc.taxajuros}
                  tempotaxa={calc.taxajurosUnidade}
                  Formula4={calc.tempo}
                  tempotempo={calc.tempoUnidade}
                  Formula5={calc.valorInvestido}
                  Formula6={calc.totalganhoemjuros}
                  Formula7={calc.valortotalfinal}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
