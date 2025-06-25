export interface ResultadoSimulacao {
  mes: number;
  valorAtual: number;
  jurosMensal: number;
  totalInvestido: number;
  totalJuros: number;
  impostoRenda: number;
  taxaCustodia: number;
  iof?: number;
}

interface Titulo {
  valor: number;
  taxa: number;
  mesInicio: number;
  tipo: "prefixado" | "selic" | "ipca" | "cdb";
}

export const resetar = (
  setResultados: (resultados: ResultadoSimulacao[]) => void,
) => {
  setResultados([]);
};

export const CalculosFixosGeral = (
  tipo: string,
  valorInicial: string,
  aporteMensal: string,
  tempo: number,
  setResultados: (resultados: ResultadoSimulacao[]) => void,
  setErro: (erro: string) => void,
  tipoTitulo: "prefixado" | "selic" | "ipca" | "cdb" = "prefixado",
  taxaTesouro: string = "10",
  taxaIPCA: string = "4",
  taxaSelic: string = "11",
  resgateMes: number | null = null,
) => {
  if (tipo === "poupanca") {
    calcularRendimentoPoupanca(
      valorInicial,
      aporteMensal,
      tempo,
      setResultados,
    );
  } else if (tipo === "tesouro") {
    calcularRendimentoTesouroSelic(
      valorInicial,
      tempo,
      setResultados,
      setErro,
      tipoTitulo,
      taxaTesouro,
      taxaIPCA,
      taxaSelic,
      resgateMes,
    );
  } else if (tipo === "cdb") {
    calcularRendimentoCDB(
      valorInicial,
      tempo,
      setResultados,
      setErro,
      taxaSelic, // Usada como proxy para CDI
      resgateMes,
    );
  } else {
    setErro("Tipo de investimento inválido");
  }
};

const taxapoupanca = (valor: number) => {
  return valor * 0.005; // 0.5% ao mês
};

export const calcularRendimentoPoupanca = (
  valorInicial: string,
  aporteMensal: string,
  tempo: number,
  setResultados: (resultados: ResultadoSimulacao[]) => void,
) => {
  const valorInicialLet = Number(
    valorInicial.replace(".", "").replace(",", "."),
  );
  const aporteMensalLet = Number(
    aporteMensal.replace(".", "").replace(",", "."),
  );
  const novosResultados: ResultadoSimulacao[] = [];
  const valorInicialNumber = parseBRL(valorInicialLet.toString());
  const aporteMensalNumber = parseBRL(aporteMensalLet.toString());

  if (
    isNaN(valorInicialNumber) ||
    valorInicialNumber <= 0 ||
    valorInicialNumber.toString() === "0.00" ||
    isNaN(tempo) ||
    tempo < 1
  ) {
    console.error("Valores inválidos para cálculo da poupança");
    return setResultados([]);
  }

  let valorAtual = valorInicialNumber;
  let totalInvestido = valorInicialNumber;
  let totalJuros = 0;

  for (let i = 1; i <= tempo; i++) {
    const juros = taxapoupanca(valorAtual);
    totalJuros += juros;
    valorAtual += juros + (isNaN(aporteMensalNumber) ? 0 : aporteMensalNumber);
    totalInvestido += isNaN(aporteMensalNumber) ? 0 : aporteMensalNumber;

    novosResultados.push({
      mes: i,
      valorAtual: Number(valorAtual.toFixed(2)),
      jurosMensal: Number(juros.toFixed(2)),
      totalInvestido: Number(totalInvestido.toFixed(2)),
      totalJuros: Number(totalJuros.toFixed(2)),
      impostoRenda: 0,
      taxaCustodia: 0,
    });
  }

  setResultados(novosResultados);
};

const parseBRL: (value: string) => number = (value: string): number => {
  const cleaned = value.replace(/[^\d,]/g, "").replace(",", ".");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};

const getAliquotaIR = (meses: number) => {
  if (meses <= 6) return 0.225; // 22,5% até 180 dias
  if (meses <= 12) return 0.2; // 20% de 181 a 360 dias
  if (meses <= 24) return 0.175; // 17,5% de 361 a 720 dias
  return 0.15; // 15% acima de 720 dias
};

const getAliquotaIOF = (dias: number) => {
  if (dias > 30) return 0;
  return (30 - dias) / 30; // Regressiva de 100% a 0%
};

const calcularJurosCDB = (valor: number, taxaAnualCDI: number) => {
  return valor * (Math.pow(1 + taxaAnualCDI / 100, 1 / 12) - 1);
};

const estimarMarcacaoMercado = (
  valor: number,
  mesesRestantes: number,
  taxaAtual: number,
  taxaOriginal: number,
) => {
  const fatorAjuste =
    1 + ((((taxaAtual - taxaOriginal) / 100) * mesesRestantes) / 12) * 0.05;
  return valor * fatorAjuste;
};

export const calcularRendimentoTesouroSelic = (
  valorInicial: string,
  tempo: number,
  setResultados: (resultados: ResultadoSimulacao[]) => void,
  setErro: (erro: string) => void,
  tipoTitulo: "prefixado" | "selic" | "ipca" | "cdb",
  taxaTesouro: string,
  taxaIPCA: string,
  taxaSelic: string,
  resgateMes: number | null,
) => {
  // 1. Parse preciso do valor inicial
  const valor = parseFloat(
    valorInicial.replace(/[^0-9,-]/g, "").replace(",", "."),
  );

  // 2. Validação rigorosa
  if (isNaN(valor)) {
    setErro("Valor inicial inválido");
    return setResultados([]);
  }

  // 3. Configuração do cálculo REAL (Tesouro Direto)
  const DIAS_UTEIS_ANO = 252;
  const DIAS_UTEIS_MES = 21;
  const TAXA_CUSTODIA_ANUAL = 0.001; // 0.1% a.a.

  // 4. Cálculo da taxa diária exata
  const taxaAnualDecimal = parseFloat(taxaSelic.replace(",", ".")) / 100;
  const taxaDiaria = Math.pow(1 + taxaAnualDecimal, 1 / DIAS_UTEIS_ANO) - 1;

  // 5. Simulação mês a mês
  const resultados: ResultadoSimulacao[] = [];
  let saldo = valor;
  let totalJuros = 0;
  let totalCustodia = 0;

  const mesesResgate = resgateMes ? Math.min(resgateMes, tempo) : tempo;

  for (let mes = 1; mes <= mesesResgate; mes++) {
    // A. Juros EXATOS (21 dias úteis)
    const juros = saldo * (Math.pow(1 + taxaDiaria, DIAS_UTEIS_MES) - 1);
    totalJuros += juros;
    saldo += juros;

    // B. Taxa de custódia (semestral sobre saldo ANTERIOR)
    if (mes % 6 === 0) {
      const custodia = (saldo - juros) * (TAXA_CUSTODIA_ANUAL / 2);
      saldo -= custodia;
      totalCustodia += custodia;
    }

    // C. Impostos (APENAS no resgate)
    let ir = 0;
    let iof = 0;
    if (mes === mesesResgate) {
      ir = totalJuros * 0.15; // 15% após 2 anos
      iof = totalJuros * Math.max(0, (30 - mes * 30) / 30); // IOF regressivo
      saldo -= ir + iof;
    }

    resultados.push({
      mes,
      valorAtual: parseFloat(saldo.toFixed(2)),
      jurosMensal: parseFloat(juros.toFixed(2)),
      totalInvestido: valor,
      totalJuros: parseFloat(totalJuros.toFixed(2)),
      impostoRenda: parseFloat(ir.toFixed(2)),
      taxaCustodia: parseFloat(totalCustodia.toFixed(2)),
      iof: mes === mesesResgate ? parseFloat(iof.toFixed(2)) : 0,
    });
  }

  setResultados(resultados);
};
export const calcularRendimentoCDB = (
  valorInicial: string,
  tempo: number,
  setResultados: (resultados: ResultadoSimulacao[]) => void,
  setErro: (erro: string) => void,
  taxaCDB: string,
  resgateMes: number | null,
) => {
  const novosResultados: ResultadoSimulacao[] = [];
  const valorInicialNumber = parseBRL(valorInicial);
  const taxaCDBNumber = parseBRL(taxaCDB);

  if (
    isNaN(valorInicialNumber) ||
    valorInicialNumber < 30 ||
    valorInicialNumber.toString() === "0.00" ||
    isNaN(taxaCDBNumber) ||
    taxaCDBNumber <= 0 ||
    isNaN(tempo) ||
    tempo < 1
  ) {
    setErro("Valores inválidos para cálculo do CDB");
    return setResultados([]);
  }

  const taxaAnual = (taxaCDBNumber / 100) * 11; // Assume CDI = Selic (11% como padrão)
  const titulos: Titulo[] = [
    { valor: valorInicialNumber, taxa: taxaAnual, mesInicio: 0, tipo: "cdb" },
  ];

  const totalInvestido = valorInicialNumber;
  let totalJurosBruto = 0;
  let totalTaxaCustodia = 0; // Sem taxa de custódia para CDB
  let valorAtual = valorInicialNumber;

  const resgateFinal =
    resgateMes !== null && resgateMes > 0 ? Math.min(resgateMes, tempo) : tempo;

  for (let i = 1; i <= tempo; i++) {
    let jurosMensalTotal = 0;
    let valorAtualMensal = 0;

    titulos.forEach((titulo) => {
      const mesesAtivos = i - titulo.mesInicio;
      if (mesesAtivos >= 0) {
        const juros = calcularJurosCDB(titulo.valor, titulo.taxa);
        titulo.valor += juros;
        jurosMensalTotal += juros;
        valorAtualMensal += titulo.valor;
      }
    });

    totalJurosBruto += jurosMensalTotal;
    valorAtual = valorAtualMensal;

    const taxaCustodiaMensal = 0; // Sem taxa de custódia para CDB
    totalTaxaCustodia += taxaCustodiaMensal;
    valorAtual -= taxaCustodiaMensal;

    let impostoRenda = 0;
    let iof = 0;
    if (i === resgateFinal) {
      const dias = i * 30;
      const aliquotaIR = getAliquotaIR(i);
      impostoRenda = totalJurosBruto * aliquotaIR;
      iof = totalJurosBruto * getAliquotaIOF(dias);
      valorAtual -= impostoRenda + iof;

      if (i < tempo) {
        const taxaAtual = taxaAnual * 1.1;
        valorAtual = estimarMarcacaoMercado(
          valorAtual,
          tempo - i,
          taxaAtual,
          taxaAnual,
        );
      }
    }

    novosResultados.push({
      mes: i,
      valorAtual: Number(valorAtual.toFixed(2)),
      jurosMensal: Number(jurosMensalTotal.toFixed(2)),
      totalInvestido: Number(totalInvestido.toFixed(2)),
      totalJuros: Number(totalJurosBruto.toFixed(2)),
      impostoRenda: Number(impostoRenda.toFixed(2)),
      taxaCustodia: Number(totalTaxaCustodia.toFixed(2)),
      iof: Number(iof.toFixed(2)),
    });

    if (i === resgateFinal) break;
  }

  setResultados(novosResultados);
};
