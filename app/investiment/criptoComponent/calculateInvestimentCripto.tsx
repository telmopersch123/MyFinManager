export const CalculateInvestment = (
  initialInvestment: number,
  bitcoinPrice: number,
  period: number,
  periodUnit: "meses" | "anos",
  marketScenario: "bull" | "neutro" | "bear",
  exchangeFee: number,
  returnRate: number,
) => {
  // Validações
  if (bitcoinPrice <= 0) throw new Error("Preço do Bitcoin inválido");
  if (returnRate < -100) throw new Error("Taxa de retorno inválida");
  if (initialInvestment <= 0) throw new Error("Investimento inicial inválido");
  if (exchangeFee < 0) throw new Error("Taxa de corretagem inválida");

  // Ajusta o período para meses
  const periodInMonths = periodUnit === "anos" ? period * 12 : period;

  // Define volatilidade anual por cenário
  const volatility = {
    bull: 0.5,
    neutro: 0.5, // Força ±50% para neutro
    bear: 0.4,
  }[marketScenario];

  // Taxa de retorno esperada por cenário
  const expectedReturn = {
    bull: 0.4,
    neutro: returnRate / 100,
    bear: -0.2,
  }[marketScenario];

  // Converte taxa anual para mensal
  const monthlyReturn = Math.pow(1 + expectedReturn, 1 / 12) - 1;
  const monthlyVolatility = volatility / Math.sqrt(12);

  // Simula preço futuro do Bitcoin
  const futurePriceMean =
    bitcoinPrice * Math.pow(1 + monthlyReturn, periodInMonths);
  const futurePriceOptimistic =
    bitcoinPrice *
    Math.pow(1 + monthlyReturn + monthlyVolatility, periodInMonths);
  const futurePricePessimistic =
    bitcoinPrice *
    Math.pow(1 + monthlyReturn - monthlyVolatility, periodInMonths);

  // Calcula quantidade de BTC após taxa de corretagem
  const bitcoinAmount =
    (initialInvestment * (1 - exchangeFee / 100)) / bitcoinPrice;

  // Calcula valores finais
  const futureValueMean = bitcoinAmount * futurePriceMean;
  const futureValueOptimistic = bitcoinAmount * futurePriceOptimistic;
  const futureValuePessimistic = bitcoinAmount * futurePricePessimistic;

  // Calcula taxas totais
  const totalFees = initialInvestment * (exchangeFee / 100);

  // Calcula imposto
  const capitalGainMean = futureValueMean - initialInvestment;
  const tax = capitalGainMean > 35000 ? capitalGainMean * 0.15 : 0;

  const pushValues = {
    v1: futureValueMean,
    v2: futureValueOptimistic,
    v3: futureValuePessimistic,
  };

  return {
    futureValueMean,
    futureValueOptimistic,
    futureValuePessimistic,
    bitcoinAmount,
    totalFees,
    capitalGainMean,
    tax,
    netValueMean: futureValueMean - tax,
    monthlyReturn: monthlyReturn * 100,
    pushValues,
  };
};
