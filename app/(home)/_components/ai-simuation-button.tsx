"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Alert_Dialog from "@/app/transactions/_components/components/alert-dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import { useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { generateAiReport } from "../_actions/generate-ai-report";
import {
  AcoesInputs,
  BitcoinInputs,
  FIIsInputs,
  InvestimentosInputs,
  RelatorioInvestimento,
} from "../_actions/generate-ai-report/interfaces";

export interface AiSimulationButtonProps {
  hasPremiumPlan?: boolean;
  month?: string;
  investiment?: RelatorioInvestimento[];
  investimentosInputs?: InvestimentosInputs[];
  category?: string;
  acoesInputs?: AcoesInputs[];
  fiisInputs?: FIIsInputs[];
  bitcoinInputs?: BitcoinInputs[];
  openExternally?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  quantity?: number | null;
  setValidClick?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AiSimulationButton = ({
  month,
  hasPremiumPlan,
  investiment,
  investimentosInputs,
  category,
  acoesInputs,
  fiisInputs,
  bitcoinInputs,
  openExternally,
  onOpenChange,
  quantity,
  setValidClick,
}: AiSimulationButtonProps) => {
  const [report, setReport] = useState<string | void | undefined>();
  const [reportIsLoading, setReportIsLoading] = useState(false);
  const [open, setOpen] = useState<{ type: string; isOpen: boolean }>({
    type: "",
    isOpen: false,
  });
  const abortControlFetch = useRef<AbortController | null>(null);

  const handleGenerateSimulationClick = async () => {
    if (
      (investiment ?? []).length === 0 &&
      (investimentosInputs ?? []).length === 0 &&
      (acoesInputs ?? []).length === 0 &&
      (fiisInputs ?? []).length === 0 &&
      (bitcoinInputs ?? []).length === 0
    ) {
      setOpen({ type: "alert-7", isOpen: true });
      return;
    }

    try {
      if ((quantity ?? 0) >= 10 && !hasPremiumPlan) {
        return;
      }
      abortControlFetch.current = new AbortController();
      setReportIsLoading(true);

      // Chamar a Server Action para obter os dados e mensagens
      const { messages } = await generateAiReport({
        month,
        investiment,
        investimentosInputs,
        acoesInputs,
        fiisInputs,
        bitcoinInputs,
        category,
      });

      // Chamar a API para obter o resultado da simulação
      const response = await fetch("/api/ai-report", {
        method: "POST",
        headers: {
          "Content-Type-y": "application/json",
        },
        body: JSON.stringify({ messages }),
        signal: abortControlFetch.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao gerar simulação com IA");
      }

      const { report: aiReport } = await response.json();
      setReport(aiReport);
      if (setValidClick) {
        setValidClick((prev) => !prev);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        console.log("Requisição cancelada pelo usuário");
      } else {
        console.error("Erro ao gerar simulação:", error);
      }
    } finally {
      setReportIsLoading(false);
      abortControlFetch.current = null;
    }
  };

  const handleCancelFetch = () => {
    if (abortControlFetch.current) {
      abortControlFetch.current.abort();
    }
    setReportIsLoading(false);
  };

  return (
    <>
      <Dialog open={openExternally} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button
            disabled={(quantity ?? 10) >= 10 && !hasPremiumPlan}
            className="hidden w-[200px] items-center gap-2 bg-black/5 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))/0.1] dark:bg-white/5 dark:text-[hsl(var(--foreground))] hover:dark:bg-white/10"
          >
            Calcular com IA <BotIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent
          style={{
            background: `linear-gradient(rgba(34, 139, 34, 0.02), rgba(34, 139, 34, 0.02)), hsl(var(--background))`,
          }}
          className="w-[90%] max-w-[1000px] rounded-lg border-[hsl(var(--border))] bg-[hsl(var(--background))] dark:border-[hsl(var(--border))] dark:bg-[hsl(var(--background))] lg:max-w-[1000px]"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))]">
              Calcular com IA
            </DialogTitle>
            <DialogDescription className="text-sm text-[hsl(var(--muted-foreground))] dark:text-[hsl(var(--muted-foreground))]">
              Use a IA para efetuar cálculos mais precisos dos seus
              investimentos.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="prose max-h-[500px] max-w-[1000px] p-4 text-[hsl(var(--foreground))] prose-h3:text-[hsl(var(--foreground))] prose-h4:text-[hsl(var(--foreground))] prose-strong:text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))] prose-h3:dark:text-[hsl(var(--foreground))] prose-h4:dark:text-[hsl(var(--foreground))] prose-strong:dark:text-[hsl(var(--foreground))]">
            <Markdown
              remarkPlugins={[remarkGfm]}
              className="prose prose-zinc max-w-none dark:prose-invert"
            >
              {report || "Nenhum resultado de simulação disponível"}
            </Markdown>
          </ScrollArea>
          <DialogFooter className="flex justify-end gap-2 pt-4">
            <DialogClose asChild>
              <Button
                variant="ghost"
                onClick={handleCancelFetch}
                className="bg-zinc-900/30"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              onClick={handleGenerateSimulationClick}
              disabled={
                reportIsLoading || ((quantity ?? 0) >= 10 && !hasPremiumPlan)
              }
              className="flex items-center gap-2 !bg-primary text-[hsl(var(--primary-foreground))] dark:text-[hsl(var(--primary-foreground))]"
            >
              {reportIsLoading && (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              )}
              Calcular
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Alert_Dialog open={open} setOpenAction={setOpen} />
    </>
  );
};

export default AiSimulationButton;
