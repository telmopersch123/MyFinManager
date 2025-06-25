export type ParcelamentoResultado = {
  valorFinanciado: string;
  parcelas: string;
  taxaMensal: string;
  prestacaoMensal: string;
  totalJuros: string;
  totalPagar: string;
  cronograma: CronogramaItem[];
};

export interface Calculo {
  aporteCapital: string;
  juros: string;
  montante: string;
}
export interface MonthlyData {
  mes: string;
  jurosMensal: number;
  totalInvestido: number;
  totalJuros: number;
  valorAcumulado: number;
}

export interface CronogramaItem {
  parcela: string;
  dataVencimento: string;
  prestacao: string;
  juros: string;
  amortizacao: string;
  saldo: string;
}

export interface CalculationJuros {
  id: string;
  capitalinicial: string;
  valorMensal: string;
  taxajuros: string;
  taxajurosUnidade: string;
  tempo: string;
  tempoUnidade: string;
  valorInvestido: string;
  totalganhoemjuros: string;
  valortotalfinal: string;
  valoresMensais: MonthlyData[];
  createdAt: string;
}

export interface CalculationParcelamento {
  id: string;
  valorDivida: string;
  parcelas: string;
  jurosMes: string;
  primeiroVencimento: string;
  valorFinanciado: string;
  parcelasResultado: string;
  taxaMensal: string;
  prestacaoMensal: string;
  totalJuros: string;
  totalPagar: string;
  createdAt: string;
  cronogramaItems: CronogramaItem[];
}

export interface MudadedCopyJuros {
  campo1: string;
  campo2: string;
  campo3: string;
  numero: string;
  campo4: string;
  campo5: string;
  campo6: string;
  campo7: string;
  campo8: string;
  campo9: MonthlyData[];
}

export interface MudadedCopyParcelamento {
  campo1: string;
  campo2: string;
  campo3: string;
  campo4: string;
  campo5: string;
  campo6: string;
  campo7: string;
  campo8: string;
  campo9: string;
  campo10: string;
  campo11: CronogramaItem[];
}
