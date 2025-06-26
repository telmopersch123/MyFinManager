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
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { generateAiReport } from "../_actions/generate-ai-report";
import {
  AcoesInputs,
  BitcoinInputs,
  FIIsInputs,
  RelatorioInvestimento,
} from "../_actions/generate-ai-report/interfaces";

export interface AiReportButtonProps {
  hasPremiumPlan?: boolean;
  month?: string;
  investiment?: RelatorioInvestimento[];
  acoesInputs?: AcoesInputs[];
  fiisInputs?: FIIsInputs[];
  bitcoinInputs?: BitcoinInputs[];
  category?: string;
  quantity?: number | null;
  setValidClick?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AiReportButton = ({
  month,
  hasPremiumPlan,
  investiment,
  acoesInputs,
  fiisInputs,
  bitcoinInputs,
  category = "investimentos",
  quantity,
  setValidClick,
}: AiReportButtonProps) => {
  const [report, setReport] = useState<string | void | undefined>();
  const [reportIsLoading, setReportIsLoading] = useState(false);
  const [open, setOpen] = useState<{ type: string; isOpen: boolean }>({
    type: "",
    isOpen: false,
  });
  const abortControlFetch = useRef<AbortController | null>(null);

  useEffect(() => {
    if (category === "dashboard") {
      const savedReport = localStorage.getItem(`aiReport_${month}`);
      if (savedReport) {
        setReport(savedReport);
      }
    }
  }, [month, category]);

  const handleGenerateReportClick = async () => {
    if (category !== "dashboard") {
      if (
        (investiment ?? []).length === 0 &&
        (acoesInputs ?? []).length === 0 &&
        (fiisInputs ?? []).length === 0 &&
        (bitcoinInputs ?? []).length === 0
      ) {
        setOpen({ type: "alert-7", isOpen: true });
        return;
      }
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
        acoesInputs,
        fiisInputs,
        bitcoinInputs,
        category,
      });

      // Chamar a API para obter o relatório
      const response = await fetch("/api/ai-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
        signal: abortControlFetch.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao gerar relatório com IA");
      }

      const { report: aiReport } = await response.json();
      setReport(aiReport);
      if (setValidClick) {
        setValidClick((prev) => !prev);
      }
      if (month && category === "dashboard") {
        localStorage.setItem(`aiReport_${month}`, aiReport);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        console.log("Requisição cancelada pelo usuário");
      } else {
        console.error("Erro ao gerar relatório:", error);
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
      <Dialog>
        <DialogTrigger asChild>
          <Button
            disabled={
              (quantity ?? 10) >= 10 &&
              !hasPremiumPlan &&
              category !== "dashboard"
            }
            variant="ghost"
            className={`flex w-[200px] items-center gap-2 ${
              category === "dashboard"
                ? "bg-green-600 !text-white transition-all hover:bg-green-700 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                : "bg-black/5 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))/0.1] dark:bg-white/5 dark:text-[hsl(var(--foreground))] hover:dark:bg-white/10"
            } 1xl-custom:text-center`}
          >
            Relário IA <BotIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent
          className={`w-[90%] max-w-[1000px] rounded-lg border-[hsl(var(--border))] bg-[hsl(var(--background))] dark:border-[hsl(var(--border))] dark:bg-[hsl(var(--background))] lg:max-w-[1000px]`}
          style={{
            background:
              category !== "dashboard"
                ? `linear-gradient(rgba(30, 64, 175, 0.03), rgba(30, 64, 175, 0.03)), hsl(var(--background))`
                : `hsl(var(--background))`,
          }}
        >
          {hasPremiumPlan || category !== "dashboard" ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))]">
                  Relatório IA
                </DialogTitle>
                <DialogDescription className="text-sm text-[hsl(var(--muted-foreground))] dark:text-[hsl(var(--muted-foreground))]">
                  {category === "dashboard"
                    ? "Use o relatório IA para gerar relatórios automáticos de despesas, investimentos e renda."
                    : "Use o relatório IA para gerar relatórios automáticos das simulações de investimentos."}
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="prose max-h-[500px] max-w-[1000px] p-4 text-[hsl(var(--foreground))] prose-h3:text-[hsl(var(--foreground))] prose-h4:text-[hsl(var(--foreground))] prose-strong:text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))] prose-h3:dark:text-[hsl(var(--foreground))] prose-h4:dark:text-[hsl(var(--foreground))] prose-strong:dark:text-[hsl(var(--foreground))]">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  className="prose prose-zinc max-w-none dark:prose-invert"
                >
                  {report || "Nenhum relatório disponível"}
                </Markdown>
              </ScrollArea>
              <DialogFooter className="flex justify-end gap-2 pt-4">
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    onClick={handleCancelFetch}
                    className="text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))/0.1] dark:text-[hsl(var(--muted-foreground))] dark:hover:bg-[hsl(var(--muted))/0.1]"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleGenerateReportClick}
                  disabled={
                    reportIsLoading ||
                    ((quantity ?? 0) >= 10 && !hasPremiumPlan)
                  }
                  className="flex items-center gap-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))/0.9] dark:bg-[hsl(var(--primary))] dark:text-[hsl(var(--primary-foreground))] dark:hover:bg-[hsl(var(--primary))/0.9]"
                >
                  {reportIsLoading && (
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                  )}
                  Gerar Relatório
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))]">
                  Relatório IA
                </DialogTitle>
                <DialogDescription className="text-sm text-[hsl(var(--muted-foreground))] dark:text-[hsl(var(--muted-foreground))]">
                  Você precisa de um plano premium para gerar relatórios com IA.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-end gap-2 pt-4">
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    className="text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))/0.1] dark:text-[hsl(var(--muted-foreground))] dark:hover:bg-[hsl(var(--muted))/0.1]"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  asChild
                  className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))/0.9] dark:bg-[hsl(var(--primary))] dark:text-[hsl(var(--primary-foreground))] dark:hover:bg-[hsl(var(--primary))/0.9]"
                >
                  <Link href="/subscription">Assinar plano Premium</Link>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Alert_Dialog open={open} setOpenAction={setOpen} />
    </>
  );
};

export default AiReportButton;
