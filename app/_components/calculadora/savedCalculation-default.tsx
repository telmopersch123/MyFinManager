import { Copy, Loader2, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { formatDateTime } from "./formatFunctions";
import OpenFormated from "./open-formated";

type SavedCalculationsProps = {
  setMudadedCopy: (value: string) => void;
  refresh: number;
};

export default function SavedCalculationsDefault({
  setMudadedCopy,
  refresh,
}: SavedCalculationsProps) {
  const [calculations, setCalculations] = useState<
    { id: string; formula: string; result: string; createdAt: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCalculations() {
      try {
        const response = await fetch("/api/calculations");
        if (response.ok) {
          const data = await response.json();
          setCalculations(data);
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
    fetchCalculations();
  }, [refresh]);

  async function handleDeleteCalculation(id: string) {
    try {
      const response = await fetch(`/api/calculations/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setCalculations((prev) => prev.filter((calc) => calc.id !== id));
      } else {
        console.error("Erro ao deletar cálculo1:", await response.text());
      }
    } catch (error) {
      console.error("Erro ao deletar cálculo:2", error);
    }
  }

  async function handleClearAll() {
    try {
      const response = await fetch("/api/calculations", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setCalculations([]);
      } else {
        console.error("Erro ao deletar cálculo", await response.text());
      }
    } catch (error) {
      console.error("Erro ao deletar cálculo", error);
    }
  }

  return (
    <div className="custom-scrollbar h-auto max-h-[665px] min-h-[665px] overflow-y-auto rounded-xl bg-[hsl(var(--background))] p-4 dark:bg-neutral-700/10">
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
        <div className="space-y-2">
          {calculations.map((calc) => (
            <div
              key={calc.id}
              className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 transition-all duration-150 hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--card))]/90 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-primary dark:hover:bg-neutral-700"
            >
              <div>
                <Input
                  value={calc.formula}
                  readOnly
                  className="h-5 border-none bg-transparent font-mono text-base text-[hsl(var(--foreground))] dark:text-white"
                />
                <Input
                  value={calc.result}
                  readOnly
                  className="h-5 border-none bg-transparent text-sm font-semibold text-[hsl(var(--primary))] dark:text-primary"
                />
                <Input
                  value={formatDateTime(calc.createdAt)}
                  readOnly
                  className="h-5 border-none bg-transparent text-xs text-[hsl(var(--muted-foreground))] dark:text-neutral-400"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  title="Copiar cálculo"
                  className="h-8 w-8 bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted))]/80 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                  variant="ghost"
                  size="icon"
                  aria-label="Copiar cálculo"
                  onClick={() => setMudadedCopy(calc.formula)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  title="Excluir cálculo"
                  className="h-8 w-8 bg-[hsl(var(--muted))] hover:bg-[hsl(var(--destructive))]/30 dark:bg-neutral-700 dark:hover:bg-red-600/30"
                  variant="ghost"
                  size="icon"
                  aria-label="Excluir cálculo"
                  onClick={() => handleDeleteCalculation(calc.id)}
                >
                  <Trash className="h-4 w-4 text-[hsl(var(--destructive))] dark:text-red-500" />
                </Button>
                <OpenFormated
                  title="calculo"
                  date={calc.createdAt}
                  Formula1={calc.formula}
                  Formula2={calc.result}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
