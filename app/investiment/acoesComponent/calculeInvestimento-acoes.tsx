import { RelatorioInvestimento } from "@/app/(home)/_actions/generate-ai-report/interfaces";
import React from "react";
import { SimulationResult } from "./page";

interface InvestimentoAcoesProps {
  stockPrice: number;
  amount: number;
  period: number;
  brokerageFee: number;
  annualReturnRate: number;
  taxRate: number;
  periodUnit: "years" | "months";
  marketScenario: "optimistic" | "pessimistic" | "neutral";
  setSimulationResult: React.Dispatch<
    React.SetStateAction<SimulationResult | null>
  >;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setInvestment: React.Dispatch<React.SetStateAction<RelatorioInvestimento[]>>;
}

export const CalculeInvestimentoAcoes = ({
  stockPrice,
  amount,
  period,
  brokerageFee,
  annualReturnRate,
  taxRate,
  periodUnit,
  marketScenario,
  setSimulationResult,
  setError,
  setInvestment,
}: InvestimentoAcoesProps) => {
  // Validações básicas
  if (stockPrice <= 0 || amount <= 0 || period <= 0) {
    setError("Por favor, preencha todos os campos com valores válidos");
    return;
  }

  // Ajustar período para meses
  const totalMonths = periodUnit === "years" ? period * 12 : period;

  // Ajustar taxa de retorno baseado no cenário
  let adjustedRate = annualReturnRate / 100;
  if (marketScenario === "optimistic") adjustedRate *= 1.2;
  if (marketScenario === "pessimistic") adjustedRate *= 0.8;

  // Converter taxa anual para mensal
  const monthlyRate = Math.pow(1 + adjustedRate, 1 / 12) - 1;

  // Cálculo do número de ações e valor investido
  const numberOfShares = Math.floor(amount / stockPrice);
  const investedAmount = numberOfShares * stockPrice;
  const residualCash = amount - investedAmount;

  // Cálculo do valor bruto com juros compostos
  const grossFinalValue =
    investedAmount * Math.pow(1 + monthlyRate, totalMonths);

  // Cálculo do ganho de capital e impostos
  const grossCapitalGain = grossFinalValue - investedAmount;
  const taxAmount = grossCapitalGain * (taxRate / 100);
  const totalFees = brokerageFee * 2; // Compra + venda

  // Valor líquido final (incluindo o residual cash)
  const netFinalValue = grossFinalValue - totalFees - taxAmount + residualCash;
  const netCapitalGain = netFinalValue - amount;

  // Cálculo dos valores mensais para exibição do gráfico
  const monthlyValues = Array.from({ length: totalMonths + 1 }, (_, i) => {
    const monthlyGrossValue = investedAmount * Math.pow(1 + monthlyRate, i);

    // Aplica taxas apenas no último mês (quando vender)
    if (i === totalMonths) {
      return monthlyGrossValue - totalFees - taxAmount + residualCash;
    }

    return monthlyGrossValue;
  });

  // Atualiza os estados com os resultados
  setInvestment([
    {
      valor0: "Mercado de Ações",
      valor1: [netFinalValue],
      valor2: netCapitalGain,
      valor3: adjustedRate * 100,
      valor4: numberOfShares,
      valor6: amount.toString(),
      valoresMensais: monthlyValues.map((value) => ({ valueSub1: value })),
    },
  ]);

  setSimulationResult({
    finalValue: netFinalValue,
    capitalGain: netCapitalGain,
    annualRate: adjustedRate * 100,
    numberOfShares,
    monthlyValues,
    monthlyGains: monthlyValues.map((value, index) =>
      index === 0 ? 0 : value - monthlyValues[index - 1],
    ),
    monthlyTaxes: monthlyValues.map((_, index) =>
      index === totalMonths ? taxAmount : 0,
    ),
    monthlyBrokerageFees: monthlyValues.map((_, index) =>
      index === 0 ? brokerageFee : index === totalMonths ? brokerageFee : 0,
    ),
  });

  setError(null);
};
