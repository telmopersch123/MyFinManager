export interface PontoMensal {
  valueSub1?: number;
  valueSub2?: number;
  valueSub3?: number;
  valueSub4?: number;
}
export interface RelatorioInvestimento {
  valor0?: string;
  valor1?: number[];
  valor2?: number;
  valor3?: number;
  valor4?: number;
  valor5?: number;
  valor6?: string;
  valor7?: string;
  valoresMensais?: PontoMensal[];
}

///////////////////////////

interface BaseSimulatorInputs {
  period: string | number;
  periodUnit: "meses" | "anos";
  marketScenario: string;
}

export interface InvestimentosInputs extends BaseSimulatorInputs {
  tipoInvestimento: "poupanca" | "tesouro" | "cdb";
  valorInicial: string;
  aporteMensal?: string;
  taxaSelic: string;
  taxaCDB: string;
  resgateMes: string;
}

export interface AcoesInputs extends BaseSimulatorInputs {
  stockPrice: string;
  amount: string;
  returnRate: string;
  brokerageFee: string;
  taxRate: string;
  marketScenario: "otimista" | "neutro" | "pessimista";
}

export interface FIIsInputs extends BaseSimulatorInputs {
  fiiType: "tijolo" | "papel" | "hibrido";
  amount: string;
  sharePrice: string;
  dividendYield: string;
  appreciationRate: string;
  adminFee: string;
  performanceFee: string;
  inflationRate: string;
  taxRate: string;
  reinvestDividends: boolean;
  marketScenario: "otimista" | "neutro" | "pessimista";
}

export interface BitcoinInputs extends BaseSimulatorInputs {
  initialInvestment: string;
  returnRate: string;
  exchangeFee: string;
  valueBitcoin: string;
  marketScenario: "bull" | "neutro" | "bear";
}
