import { Button } from "@/app/_components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Filter } from "lucide-react";

interface Props {
  handleFilterChange: (
    type: "EXPENSE" | "DEPOSIT" | "INVESTMENT" | undefined,
  ) => void;
  handleLimitChange: (limit: number | null) => void;
  selectedLimit: number | null;
}

export default function PopoverFiltered({
  handleFilterChange,
  handleLimitChange,
  selectedLimit,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          <Filter className="h-4 w-4" />
          Filtrar
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mx-5 w-[90vw] max-w-sm rounded-xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-800 sm:mx-0 sm:w-80">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col items-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Exibir quantidade
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {[15, 30, 50, 100].map((limit) => (
                <Button
                  key={limit}
                  variant={selectedLimit === limit ? "default" : "ghost"}
                  onClick={() => handleLimitChange(limit)}
                  className={`h-8 rounded-lg px-3 text-sm font-medium transition-all ${
                    selectedLimit === limit
                      ? "border-zinc-900 ring-2 ring-zinc-300 dark:border-white dark:ring-zinc-500"
                      : "border border-zinc-200 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-600"
                  } bg-white text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200`}
                >
                  {limit}
                </Button>
              ))}
              <Button
                variant="ghost"
                onClick={() => handleLimitChange(null)}
                className="h-8 rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-100 focus:ring-2 focus:ring-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600 dark:focus:ring-zinc-500"
              >
                Tudo
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Filtrar por
            </span>
            <div className="grid w-full grid-cols-2 gap-2">
              <Button
                onClick={() => handleFilterChange("EXPENSE")}
                className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-all hover:bg-red-100 focus:ring-2 focus:ring-red-300 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 dark:focus:ring-red-600"
              >
                Despesa
              </Button>
              <Button
                onClick={() => handleFilterChange("DEPOSIT")}
                className="rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition-all hover:bg-green-100 focus:ring-2 focus:ring-green-300 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30 dark:focus:ring-green-600"
              >
                Depósito
              </Button>
              <Button
                onClick={() => handleFilterChange("INVESTMENT")}
                className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-all hover:bg-blue-100 focus:ring-2 focus:ring-blue-300 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 dark:focus:ring-blue-600"
              >
                Investimento
              </Button>
              <Button
                onClick={() => handleFilterChange(undefined)}
                className="rounded-lg bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-100 focus:ring-2 focus:ring-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600 dark:focus:ring-zinc-500"
              >
                Todos
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
