import { AlertTriangle } from "lucide-react";

export default function AlertLimit() {
  return (
    <div className="ml-5 w-full rounded-md border border-red-500/30 bg-red-50/20 p-3 shadow-sm dark:border-red-600/20 dark:bg-red-900/10 sm:p-4 md:p-5">
      <div className="flex items-center gap-2 sm:gap-3">
        <AlertTriangle
          className="flex-shrink-0 text-red-600 dark:text-red-400"
          size={20}
        />
        <h2 className="text-base font-semibold text-red-600 dark:text-red-400 sm:text-lg md:text-xl">
          Limite Diário Atingido
        </h2>
      </div>
      <p className="mt-1 text-xs text-red-600 dark:text-red-300 sm:text-sm md:text-base">
        Você atingiu o limite de{" "}
        <span className="font-bold">10 simulações diárias</span> no plano
        gratuito. Para continuar efetuando simulações, adquira o plano premium.
        Ou, se preferir, volte amanhã para realizar novas simulações
        gratuitamente.
      </p>
    </div>
  );
}
