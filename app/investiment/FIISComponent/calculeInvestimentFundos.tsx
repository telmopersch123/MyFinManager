import { RelatorioInvestimento } from "@/app/(home)/_actions/generate-ai-report/interfaces";
import { SimulationResults } from "./SimuladorFIIs";

interface CalculateInvestmentProps {
  amount: string;
  sharePrice: string;
  dividendYield: string;
  appreciationRate: string;
  adminFee: string;
  performanceFee: string;
  inflationRate: string;
  taxRate: string;
  periodUnit: "meses" | "anos";
  period: string;
  reinvestDividends: boolean;
  setResults: React.Dispatch<React.SetStateAction<SimulationResults>>;
  setInvestment: React.Dispatch<React.SetStateAction<RelatorioInvestimento[]>>;
}

export const parseBrazilianNumber = (str: string): number => {
  if (!str) return 0;
  return parseFloat(str.replace(/\./g, "").replace(",", ".")) || 0;
};

export const CalculeInvestmentFundos = ({
  amount,
  sharePrice,
  dividendYield,
  appreciationRate,
  adminFee,
  performanceFee,
  inflationRate,
  taxRate,
  periodUnit,
  period,
  reinvestDividends,
  setResults,
  setInvestment,
}: CalculateInvestmentProps): void => {
  // Validação e parsing dos inputs
  const initialAmount = parseBrazilianNumber(amount);
  const initialSharePrice = parseBrazilianNumber(sharePrice);
  const monthlyDividendYield = parseBrazilianNumber(dividendYield) / 100;
  const annualAppreciation = parseBrazilianNumber(appreciationRate) / 100;
  const annualAdminFee = parseBrazilianNumber(adminFee) / 100;
  const annualPerformanceFee = parseBrazilianNumber(performanceFee) / 100;
  const annualInflation = parseBrazilianNumber(inflationRate) / 100;
  const capitalGainTax = parseBrazilianNumber(taxRate) / 100;
  const months =
    periodUnit === "anos" ? parseInt(period) * 12 : parseInt(period);

  // Validações iniciais
  if (
    monthlyDividendYield > 0.05 ||
    monthlyDividendYield < 0 ||
    initialSharePrice <= 0 ||
    initialAmount <= 0 ||
    months <= 0 ||
    months > 360
  ) {
    setResults({
      finalValue: 0,
      monthlyDividends: 0,
      capitalGain: 0,
      annualizedYield: 0,
      dataPoints: [],
    });
    return;
  }

  // Cálculo inicial de cotas (sempre inteiras)
  const shares = Math.floor(initialAmount / initialSharePrice);
  const leftover = initialAmount % initialSharePrice;
  const investedAmount = shares * initialSharePrice;

  // Verificação de investimento mínimo
  if (shares < 1) {
    setResults({
      finalValue: 0,
      monthlyDividends: 0,
      capitalGain: 0,
      annualizedYield: 0,
      dataPoints: [],
    });
    return;
  }

  // Cálculos financeiros básicos
  const monthlyAppreciation = Math.pow(1 + annualAppreciation, 1 / 12) - 1;
  const totalAdminFee = investedAmount * annualAdminFee;
  const monthlyAdminCost = totalAdminFee / months;
  const monthlyPerformanceFeeRate = annualPerformanceFee / 12;
  const monthlyInflation = Math.pow(1 + annualInflation, 1 / 12) - 1;

  // Variáveis de estado da simulação
  let currentShares = shares;
  let accumulatedDividends = 0;
  const dataPoints: Array<{
    month: number;
    adjustedValue: number;
    adjustedDividends: number;
    grossDividend: number;
    sharePrice: number;
    capitalGain: number;
    totalFees: number;
    nominalValue: number;
  }> = [];

  // Simulação mês a mês com precisão
  for (let month = 1; month <= months; month++) {
    const currentSharePrice =
      initialSharePrice * Math.pow(1 + monthlyAppreciation, month);
    const portfolioValue = currentShares * currentSharePrice;

    // Cálculo de dividendos
    const grossDividend = shares * initialSharePrice * monthlyDividendYield;
    const performanceFee = grossDividend * monthlyPerformanceFeeRate;
    const netDividend = grossDividend - performanceFee - monthlyAdminCost;

    if (reinvestDividends) {
      const newShares = Math.floor(netDividend / currentSharePrice);
      currentShares += newShares;
      accumulatedDividends += netDividend % currentSharePrice;
    } else {
      accumulatedDividends += netDividend;
    }

    // Armazenamento dos dados com ajuste inflacionário
    dataPoints.push({
      month,
      adjustedValue: portfolioValue / Math.pow(1 + monthlyInflation, month),
      adjustedDividends: reinvestDividends
        ? 0
        : accumulatedDividends / Math.pow(1 + monthlyInflation, month),
      grossDividend: netDividend,
      sharePrice: currentSharePrice,
      capitalGain: shares * (currentSharePrice - initialSharePrice),
      totalFees: performanceFee + monthlyAdminCost,
      nominalValue: portfolioValue,
    });
  }

  // Cálculos finais com precisão decimal
  const finalSharePrice =
    initialSharePrice * Math.pow(1 + annualAppreciation, months / 12);
  const finalPortfolioValue = currentShares * finalSharePrice;

  // Cálculo do ganho de capital
  const capitalGain = shares * (finalSharePrice - initialSharePrice);
  const taxOnCapitalGain = Math.max(0, capitalGain) * capitalGainTax;

  // Cálculo total de dividendos
  const totalDividends = reinvestDividends
    ? (currentShares - shares) * finalSharePrice + accumulatedDividends
    : accumulatedDividends;

  // Valor final com todos os componentes
  const finalValue =
    finalPortfolioValue +
    (reinvestDividends ? 0 : totalDividends) -
    taxOnCapitalGain +
    leftover;

  // Ajustes por inflação
  const inflationFactor = Math.pow(1 + annualInflation, months / 12);
  const realFinalValue = finalValue / inflationFactor;
  const realCapitalGain = capitalGain / inflationFactor;
  const realTotalDividends = totalDividends / inflationFactor;

  // Cálculo do DY anual
  const annualizedDividendYield =
    (Math.pow(1 + monthlyDividendYield, 12) - 1) * 100;

  // Atualização dos estados com dados completos
  setInvestment([
    {
      valor0: "Fundos Imobiliários",
      valor1: [realFinalValue],
      valor2: reinvestDividends ? 0 : realTotalDividends / months,
      valor3: realCapitalGain - taxOnCapitalGain / inflationFactor,
      valor4: annualizedDividendYield,
      valor6: amount,
      valor7: sharePrice,
      valoresMensais: dataPoints.map((point) => ({
        valueSub1: point.month,
        valueSub2: point.adjustedValue,
        valueSub3: point.adjustedDividends,
        grossDividend: point.grossDividend,
        sharePrice: point.sharePrice,
        capitalGain: point.capitalGain,
        totalFees: point.totalFees,
        nominalValue: point.nominalValue,
      })),
    },
  ]);

  setResults({
    finalValue: realFinalValue,
    monthlyDividends: reinvestDividends ? 0 : realTotalDividends / months,
    capitalGain: realCapitalGain - taxOnCapitalGain / inflationFactor,
    annualizedYield: annualizedDividendYield,
    dataPoints: dataPoints.map((point) => ({
      valueSub1: point.month,
      valueSub2: point.adjustedValue,
      valueSub3: point.adjustedDividends,
      grossDividend: point.grossDividend,
      sharePrice: point.sharePrice,
      capitalGain: point.capitalGain,
      totalFees: point.totalFees,
      nominalValue: point.nominalValue,
    })),
  });
};
