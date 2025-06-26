"use client";
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
import { customHandleCapitalChange, formatToBRL } from "./formatFunctions";
import MensagemEmpty from "./mensagemEmpty";

interface Calculo {
  aporteCapital: string;
  juros: string;
  montante: string;
}

interface JurosSimplesComponent {
  inputRef: React.RefObject<HTMLInputElement>;
  capital: string;
  setCapitalAction: React.Dispatch<React.SetStateAction<string>>;
  taxa: string;
  setTaxaAction: React.Dispatch<React.SetStateAction<string>>;
  tempo: string;
  setTempoAction: React.Dispatch<React.SetStateAction<string>>;
  juros: string;
  setJurosAction: React.Dispatch<React.SetStateAction<string>>;
  montante: string;
  controlMSGEmpty: boolean;
  handleTempoInputAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setControlMSGEmptyAction: (value: boolean) => void;
  setMontanteAction: React.Dispatch<React.SetStateAction<string>>;
  setRefreshCalculationsAction: React.Dispatch<React.SetStateAction<number>>;
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
  };
  controlVisibleCheck: boolean;
  setIsCalculatedAction: React.Dispatch<React.SetStateAction<boolean>>;
  isCalculated: boolean;
  setHistoricoCalculosAction: React.Dispatch<React.SetStateAction<Calculo[]>>;
}

export default function JurosSimplesComponent({
  inputRef,
  capital,
  setCapitalAction,
  taxa,
  setTaxaAction,
  tempo,
  setTempoAction,
  juros,
  setJurosAction,
  montante,
  controlMSGEmpty,
  handleTempoInputAction,
  setControlMSGEmptyAction,
  setMontanteAction,
  setRefreshCalculationsAction,
  mudadedCopyJuros,
  controlVisibleCheck,
  setIsCalculatedAction,
  isCalculated,
  setHistoricoCalculosAction,
}: JurosSimplesComponent) {
  const [periodoTaxa, setPeriodoTaxa] = useState<"mensal" | "anual">("anual");
  const [periodoTempo, setPeriodoTempo] = useState<"meses" | "anos">("anos");
  const [aporteCapital, setCapitalAporte] = useState("");

  async function calcularJurosSimples() {
    if (capital === "" || taxa === "" || tempo === "") {
      setControlMSGEmptyAction(true);
      return;
    } else {
      setControlMSGEmptyAction(false);
    }
    try {
      const capitalNum = parseFloat(
        capital.replace(/\./g, "").replace(",", "."),
      );
      const taxaNum = parseFloat(taxa.replace(",", ".")) / 100;
      let tempoNum = parseInt(tempo);

      if (isNaN(capitalNum) || isNaN(taxaNum) || isNaN(tempoNum)) return;

      if (
        (periodoTaxa === "mensal" && periodoTempo === "anos") ||
        (periodoTaxa === "anual" && periodoTempo === "meses")
      ) {
        if (periodoTaxa === "mensal" && periodoTempo === "anos") {
          tempoNum = tempoNum * 12; // anos → meses
        } else if (periodoTaxa === "anual" && periodoTempo === "meses") {
          tempoNum = tempoNum / 12; // meses → anos
        }
      }

      const jurosCalc = capitalNum * taxaNum * tempoNum;
      const montante = capitalNum + jurosCalc;
      setJurosAction(jurosCalc.toFixed(2));
      setMontanteAction(montante.toFixed(2));
      setCapitalAporte(capitalNum.toString());
      setIsCalculatedAction(true);

      setHistoricoCalculosAction((prev: Calculo[]) => [
        ...prev,
        {
          aporteCapital: capitalNum.toString(),
          juros: jurosCalc.toFixed(2),
          montante: montante.toFixed(2),
        },
      ]);

      if (controlVisibleCheck) {
        const response = await fetch("/api/calculationsjuros", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            capitalinicial: formatToBRL(capitalNum.toString()),
            valorMensal: null,
            taxajuros: taxa,
            taxajurosUnidade: periodoTaxa,
            tempo: tempo,
            tempoUnidade: periodoTempo,
            valorInvestido: formatToBRL(capitalNum.toString()),
            totalganhoemjuros: formatToBRL(jurosCalc.toFixed(2)),
            valortotalfinal: formatToBRL(montante.toFixed(2)),
            valoresMensais: [],
          }),
        });
        if (response.ok) {
          setRefreshCalculationsAction((prev: number) => prev + 1);
        } else {
          console.error("Erro ao salvar cálculo:", await response.text());
        }
      }
    } catch (error) {
      console.error("Erro ao calcular juros simples:", error);
      return;
    }
  }

  useEffect(() => {
    if (mudadedCopyJuros) {
      setCapitalAction(mudadedCopyJuros.campo1);
      setTaxaAction(mudadedCopyJuros.campo3);
      setTempoAction(mudadedCopyJuros.numero.toString());
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
      setHistoricoCalculosAction((prev: Calculo[]) => [
        ...prev,
        {
          aporteCapital: mudadedCopyJuros.campo6,
          juros: mudadedCopyJuros.campo7,
          montante: mudadedCopyJuros.campo8,
        },
      ]);
      setCapitalAporte(mudadedCopyJuros.campo6);
      setJurosAction(mudadedCopyJuros.campo7);
      setMontanteAction(mudadedCopyJuros.campo8);
      setIsCalculatedAction(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mudadedCopyJuros]);

  return (
    <div className="mx-auto w-auto max-w-md rounded-xl bg-[hsl(var(--background))] p-6 shadow-lg dark:bg-neutral-900">
      <h1 className="mb-4 text-center text-2xl font-bold text-[hsl(var(--foreground))] dark:text-white">
        Calculadora de Juros Simples
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
            onChange={(e) => customHandleCapitalChange(e, setCapitalAction)}
            className="w-full border-[hsl(var(--border))] bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--ring))] dark:border-neutral-700 dark:bg-neutral-700 dark:text-white dark:focus:border-primary dark:focus:ring-primary"
            placeholder="0"
          />
          <MensagemEmpty controlMSGEmpty={controlMSGEmpty} tipo={capital} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
            Taxa de Juros (% ao {periodoTaxa})
          </label>
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              type="text"
              value={taxa}
              onChange={(e) => customHandleCapitalChange(e, setTaxaAction)}
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
              onChange={handleTempoInputAction}
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
          onClick={calcularJurosSimples}
          className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90 dark:bg-primary dark:text-white dark:hover:bg-primary/90"
        >
          Calcular
        </Button>
      </div>
      <div className="mt-4 space-y-2 rounded-md bg-[hsl(var(--card))] p-4 dark:bg-neutral-800">
        <p className="text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
          Valor Investido:{" "}
          <span className="font-bold text-[hsl(var(--foreground))] dark:text-white">
            {isCalculated
              ? formatToBRL(aporteCapital)
              : aporteCapital
                ? "R$ " + aporteCapital
                : "R$ 0,00"}
          </span>
        </p>
        <p className="text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
          Total ganho em juros:{" "}
          <span className="font-bold text-[hsl(var(--foreground))] dark:text-white">
            {isCalculated
              ? formatToBRL(juros)
              : juros
                ? "R$ " + juros
                : "R$ 0,00"}
          </span>
        </p>
        <p className="text-[hsl(var(--muted-foreground))] dark:text-neutral-300">
          Valor Total Final:{" "}
          <span className="font-bold text-[hsl(var(--foreground))] dark:text-white">
            {isCalculated
              ? formatToBRL(montante)
              : montante
                ? "R$ " + montante
                : "R$ 0,00"}
          </span>
        </p>
      </div>
    </div>
  );
}
