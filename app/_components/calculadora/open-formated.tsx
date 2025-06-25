import { Expand } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { DialogDescription } from "@radix-ui/react-dialog";
import { Input } from "../ui/input";
import { formatDateTime } from "./formatFunctions";

interface OpenFormatedProps {
  title: string;
  date: string;
  Formula1: string; // Forma de Pagamento (parcelamento) / Capital Inicial (juros)
  Formula2: string; // Valor da Dívida (parcelamento) / Valor Mensal (juros)
  Formula3?: string; // Número de Parcelas (parcelamento) / Taxa de Juros (juros)
  tempotaxa?: string; // Unidade dos Juros (ex.: %, mensal, anual)
  Formula4?: string; // Juros ao Mês (parcelamento) / Tempo (juros)
  tempotempo?: string;
  Formula5?: string; // Primeiro Vencimento (parcelamento) / Valor Investido (juros)
  Formula6?: string; // Valor Financiado (parcelamento) / Total ganho em juros (juros)
  Formula7?: string; // Número de Parcelas (resultado, parcelamento) / Valor Total Final (juros)
  Formula8?: string; // Taxa Mensal (parcelamento)
  Formula9?: string; // Prestação Mensal (parcelamento)
  Formula10?: string; // Total de Juros (parcelamento)
}

export default function OpenFormated({
  title,
  date,
  Formula1,
  Formula2,
  Formula3,
  tempotaxa,
  Formula4,
  tempotempo,
  Formula5,
  Formula6,
  Formula7,
  Formula8,
  Formula9,
  Formula10,
}: OpenFormatedProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          title="Visualizar Cálculos"
          className="h-8 w-8 bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted))]/80 dark:bg-neutral-600 dark:hover:bg-neutral-700"
          variant="ghost"
          size="icon"
          aria-label="Expandir cálculo"
        >
          <Expand className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto bg-[hsl(var(--background))] dark:bg-neutral-900 sm:max-w-[700px]">
        <DialogTitle></DialogTitle>
        <div className="flex w-auto flex-col gap-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] dark:text-white">
              Cálculo Completo
            </h3>
            <p className="text-sm text-[hsl(var(--foreground))]/50 dark:text-white/50">
              {formatDateTime(date)}
            </p>
          </div>
          <div className="space-y-4">
            <InputGeral
              id="formula1"
              Formulas={Formula1}
              TitleTipo={title}
              TextTipo1={title}
              TextTipo2={
                title === "juros"
                  ? "Capital Inicial"
                  : title === "calculo"
                    ? "Fórmula"
                    : title === "parcelamento"
                      ? "Valor da Dívida"
                      : "teste"
              }
            />
            <InputGeral
              id="formula2"
              Formulas={Formula2}
              TitleTipo={title}
              TextTipo1={title}
              TextTipo2={
                title === "juros"
                  ? "Valor Mensal"
                  : title === "calculo"
                    ? "Resultado"
                    : title === "parcelamento"
                      ? "Número de Parcelas"
                      : "teste"
              }
            />
            {Formula3 && (
              <InputGeral
                id="formula3"
                Formulas={Formula3.replace(/(mensal|anual|%)/i, "").trim()}
                TitleTipo={title}
                TextTipo1={title}
                TextTipo2={
                  title === "juros"
                    ? `Taxa de Juros ${tempotaxa === "mensal" ? "Mensal" : tempotaxa === "anual" ? "Anual" : ""}`
                    : title === "calculo"
                      ? "Fórmula"
                      : title === "parcelamento"
                        ? `Juros ao Mês ${tempotaxa ? tempotaxa : ""}`
                        : "teste"
                }
              />
            )}
            {Formula4 && (
              <InputGeral
                id="formula4"
                Formulas={Formula4}
                TitleTipo={title}
                TextTipo1={title}
                TextTipo2={
                  title === "juros"
                    ? `Tempo em ${tempotempo === "meses" ? "Meses" : tempotempo === "anos" ? "Anos" : ""}`
                    : title === "calculo"
                      ? "Fórmula"
                      : title === "parcelamento"
                        ? "Primeiro Vencimento"
                        : "teste"
                }
              />
            )}
            {(Formula5 ||
              Formula6 ||
              Formula7 ||
              Formula8 ||
              Formula9 ||
              Formula10) && (
              <hr className="border-[hsl(var(--border))] dark:border-neutral-600" />
            )}
            {Formula5 && (
              <InputGeral
                id="formula5"
                Formulas={Formula5}
                TitleTipo={title}
                TextTipo1={title}
                TextTipo2={
                  title === "juros"
                    ? "Valor Investido"
                    : title === "calculo"
                      ? "Fórmula"
                      : title === "parcelamento"
                        ? "Valor Financiado"
                        : "teste"
                }
              />
            )}
            {Formula6 && (
              <InputGeral
                id="formula6"
                Formulas={Formula6}
                TitleTipo={title}
                TextTipo1={title}
                TextTipo2={
                  title === "juros"
                    ? "Total ganho em juros"
                    : title === "calculo"
                      ? "Fórmula"
                      : title === "parcelamento"
                        ? "Número de Parcelas"
                        : "teste"
                }
              />
            )}
            {Formula7 && (
              <InputGeral
                id="formula7"
                Formulas={Formula7}
                TitleTipo={title}
                TextTipo1={title}
                TextTipo2={
                  title === "juros"
                    ? "Valor Total Final"
                    : title === "calculo"
                      ? "Fórmula"
                      : title === "parcelamento"
                        ? "Taxa Mensal"
                        : "teste"
                }
              />
            )}
            {Formula8 && (
              <InputGeral
                id="formula8"
                Formulas={Formula8}
                TitleTipo={title}
                TextTipo1={title}
                TextTipo2={
                  title === "juros"
                    ? "Fórmula"
                    : title === "calculo"
                      ? "Fórmula"
                      : title === "parcelamento"
                        ? "Prestação Mensal"
                        : "teste"
                }
              />
            )}
            {Formula9 && (
              <InputGeral
                id="formula9"
                Formulas={Formula9}
                TitleTipo={title}
                TextTipo1={title}
                TextTipo2={
                  title === "juros"
                    ? "Fórmula"
                    : title === "calculo"
                      ? "Fórmula"
                      : title === "parcelamento"
                        ? "Total de Juros"
                        : "teste"
                }
              />
            )}
            {Formula10 && (
              <InputGeral
                id="formula10"
                Formulas={Formula10}
                TitleTipo={title}
                TextTipo1={title}
                TextTipo2={
                  title === "juros"
                    ? "Fórmula"
                    : title === "calculo"
                      ? "Fórmula"
                      : title === "parcelamento"
                        ? "Total a Pagar"
                        : "teste"
                }
              />
            )}
          </div>
        </div>
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

interface InputGeralProps {
  id: string;
  Formulas: string;
  TitleTipo: string;
  TextTipo1: string;
  TextTipo2: string;
}

export function InputGeral({
  id,
  Formulas,
  TitleTipo,
  TextTipo1,
  TextTipo2,
}: InputGeralProps) {
  return Formulas ? (
    <div className="h-auto">
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300"
      >
        {TitleTipo === TextTipo1 ? TextTipo2 : ""}
      </label>
      <Input
        id={id}
        value={Formulas}
        readOnly
        className="h-auto min-h-[40px] w-full resize-y whitespace-normal break-words rounded-md border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-2 text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-opacity-50 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-500 dark:focus:border-primary dark:focus:ring-2 dark:focus:ring-primary"
        placeholder="Nenhum resultado fornecido"
      />
    </div>
  ) : null;
}
