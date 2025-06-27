"use server";

import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

import { getMonthDateRange } from "../../_components/getmonthDateRange";
import {
  AcoesInputs,
  BitcoinInputs,
  FIIsInputs,
  InvestimentosInputs,
  RelatorioInvestimento,
} from "./interfaces";
import { generateAiReportSchema } from "./schema";

interface TransactionPercentageType {
  month?: string;
  investiment?: RelatorioInvestimento[];
  investimentosInputs?: InvestimentosInputs[];
  acoesInputs?: AcoesInputs[];
  fiisInputs?: FIIsInputs[];
  bitcoinInputs?: BitcoinInputs[];
  category?: string;
}

export const generateAiReport = async ({
  month,
  investiment,
  investimentosInputs,
  acoesInputs,
  fiisInputs,
  bitcoinInputs,
  category,
}: TransactionPercentageType) => {
  generateAiReportSchema.parse({ month });

  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized, User not logged in");
  }

  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";
  if (!hasPremiumPlan && category === "dashboard") {
    throw new Error("Unauthorized, Not Premium Plan");
  }

  const date = new Date();
  const { start, end } = getMonthDateRange(date.getFullYear(), Number(month));

  const transactionsRaw = await db.transaction.findMany({
    where: {
      userId,
      createdAt: { gte: start, lt: end },
    },
    select: {
      id: true,
      userId: true,
      amount: true,
      createdAt: true,
      name: true, // Opcional, se precisar
      type: true, // Opcional, se precisar
      category: true, // Opcional, se precisar
      paymentMethod: true, // Opcional, se precisar
      date: true, // Opcional, se precisar,
    },
  });

  const transactions = transactionsRaw.map((transaction) => ({
    ...transaction,
    amount: Number(transaction.amount),
  }));

  const totalExpenses = transactions
    .filter((t: { type: string }) => t.type === "EXPENSE")
    .reduce((sum: number, t: { amount: number }) => sum + t.amount, 0);
  const totalInvestment = transactions
    .filter((t: { type: string }) => t.type === "INVESTMENT")
    .reduce((sum: number, t: { amount: number }) => sum + t.amount, 0);
  const totalDeposit = transactions
    .filter((t: { type: string }) => t.type === "DEPOSIT")
    .reduce((sum: number, t: { amount: number }) => sum + t.amount, 0);

  const getMessages = () => {
    if (category === "dashboard") {
      return [
        {
          role: "system",
          content:
            "Você é um assistente financeiro que ajuda usuários a entenderem seus gastos mensais e fornece sugestões de economia.",
        },
        {
          role: "user",
          content: `Com base nestas transações: ${JSON.stringify(transactions)}. 
O total depositado foi de R$ ${totalDeposit.toFixed(2)}. 
O total investido foi de R$ ${totalInvestment.toFixed(2)}. 
E o total gasto foi de R$ ${totalExpenses.toFixed(2)}. 
Gere um relatório financeiro mensal com base nesses dados, destacando padrões de comportamento, categorias com maior gasto, possíveis excessos e sugestões de economia personalizadas.`,
        },
      ];
    } else if (category === "investimentos") {
      return [
        {
          role: "system",
          content:
            "Você é um assistente financeiro que ajuda usuários a entenderem seus investimentos mensais em renda fixa, analisando cálculos e fornecendo sugestões de economia, informações sobre investimentos e dicas para otimização.",
        },
        {
          role: "user",
          content: `Com base nestes dados de investimentos de renda fixa: ${(() => {
            const invs = Array.isArray(investiment)
              ? investiment
              : investiment
                ? [investiment]
                : [];
            return invs.length > 0
              ? invs
                  .map(
                    (inv, index) =>
                      `Investimento ${index + 1}: Tipo: '${inv.valor0 || "N/A"}', Total Investido: R$ ${Number(inv.valor1 || 0).toFixed(2)}, Juros Acumulados (líquidos): R$ ${Number(inv.valor2 || 0).toFixed(2)}, Valor Final (líquido): R$ ${Number(inv.valor3 || 0).toFixed(2)}, Valores Mensais (antes de impostos): ${JSON.stringify(inv.valoresMensais || [])}, Valor Inicial (R$) ${inv.valor6 || 0}, Aporte Mensal (R$) ${inv.valor7 || 0}%`,
                  )
                  .join("; ")
              : "Nenhum investimento disponível";
          })()}.
**Carteira do Usuário**: O total depositado foi de R$ ${totalDeposit.toFixed(2)}. O total investido foi de R$ ${totalInvestment.toFixed(2)}. E o total gasto foi de R$ ${totalExpenses.toFixed(2)}.
**Importante**: Se o valor final for menor que o valor bruto do penúltimo mês, isso se deve à cobrança do Imposto de Renda no resgate, e não representa perda de rendimento.
Por favor, gere um relatório financeiro mensal que contenha:
1. **Resumo**: Um resumo objetivo para cada investimento, destacando o tipo, total investido, juros acumulados e valor final.
2. **Análise**: Padrões observados, como crescimento, efeito dos juros compostos e tendências relevantes. Não interprete o IR como perda.
3. **Tabela de Valores Mensais**: Se o histórico tiver mais de 10 meses, mostre apenas os 3 primeiros meses, 3 meses do meio e 3 últimos meses; caso contrário, exiba todos.
4. **Recomendações**: Sugestões práticas para melhorar o desempenho, como ajustar aportes, diversificar ou aproveitar melhor os juros compostos.
5. **Sugestões de Simulação Baseadas na Carteira**: Com base na carteira do usuário (depósitos, investimentos e gastos), sugira estratégias de investimento em renda fixa, como aumentar aportes se os depósitos forem altos, diversificar se os gastos permitirem ou ajustar o orçamento para liberar mais capital para investimentos.
Formate o relatório com clareza, usando títulos e separando seções para facilitar a leitura. Use linguagem acessível e forneça insights úteis e acionáveis.`,
        },
      ];
    } else if (category === "acoes") {
      return [
        {
          role: "system",
          content:
            "Você é um assistente financeiro especializado em investimentos em ações, ajudando usuários a entenderem seus resultados e fornecendo sugestões para otimização de portfólio.",
        },
        {
          role: "user",
          content: `Com base nestes dados de investimentos em ações: ${(() => {
            const invs = Array.isArray(investiment)
              ? investiment
              : investiment
                ? [investiment]
                : [];
            return invs.length > 0
              ? invs
                  .map(
                    (inv, index) =>
                      `Investimento ${index + 1}: Ação: '${inv.valor0 || "N/A"}', Valor Final Estimado: R$ ${Number(inv.valor1 || 0).toFixed(2)}, Ganho de Capital Líquido: R$ ${Number(inv.valor2 || 0).toFixed(2)}, Taxa Anual Estimada: ${Number(inv.valor3 || 0).toFixed(2)}% a.a., Número de Ações: ${Number(inv.valor4 || 0)}, Valor a Investir (R$) ${inv.valor6 || 0}`,
                  )
                  .join("; ")
              : "Nenhum investimento disponível";
          })()}.
**Carteira do Usuário**: O total depositado foi de R$ ${totalDeposit.toFixed(2)}. O total investido foi de R$ ${totalInvestment.toFixed(2)}. E o total gasto foi de R$ ${totalExpenses.toFixed(2)}.
Por favor, gere um relatório financeiro mensal que contenha:
1. **Resumo**: Um resumo objetivo para cada ação, destacando o tipo, número de ações, ganho de capital líquido, valor final estimado e taxa anual estimada.
2. **Análise**: Padrões observados, como oscilações de preço, crescimento do portfólio e impacto da taxa anual estimada.
3. **Tabela de Valores Mensais**: Se o histórico tiver mais de 10 meses, mostre apenas os 3 primeiros meses, 3 meses do meio e 3 últimos meses; caso contrário, exiba todos.
4. **Recomendações**: Sugestões práticas para melhorar o desempenho, como diversificar o portfólio, ajustar posições ou estratégias de compra/venda.
5. **Sugestões de Simulação Baseadas na Carteira**: Com base na carteira do usuário (depósitos, investimentos e gastos), sugira estratégias de investimento em ações, como alocar mais capital se os depósitos forem altos, reduzir gastos para aumentar investimentos ou diversificar em setores diferentes.
Formate o relatório com clareza, usando títulos e separando seções para facilitar a leitura. Use linguagem acessível e forneça insights úteis e acionáveis.`,
        },
      ];
    } else if (category === "FIIS") {
      return [
        {
          role: "system",
          content:
            "Você é um assistente financeiro especializado em fundos imobiliários (FIIs), ajudando usuários a entenderem seus rendimentos e fornecendo sugestões para otimização de portfólio.",
        },
        {
          role: "user",
          content: `Com base nestes dados de investimentos em FIIs: ${(() => {
            const invs = Array.isArray(investiment)
              ? investiment
              : investiment
                ? [investiment]
                : [];
            return invs.length > 0
              ? invs
                  .map(
                    (inv, index) =>
                      `Investimento ${index + 1}: Tipo de Fundo Imobiliário: '${inv.valor0 || "N/A"}', Valor Final Estimado: R$ ${Number(inv.valor1 || 0).toFixed(2)}, Rendimentos Mensais Acumulados: R$ ${Number(inv.valor2 || 0).toFixed(2)}, Ganho de Capital (Cota): R$ ${Number(inv.valor3 || 0).toFixed(2)}, Dividend Yield Anualizado: ${Number(inv.valor4 || 0).toFixed(2)}% a.a., Valores Mensais (Dividendos e Valor Ajustado): ${JSON.stringify(inv.valoresMensais || [])}, Valor a Investir (R$) ${inv.valor6 || 0} Preço Inicial por Cota (R$) ${inv.valor7 || 0}`,
                  )
                  .join("; ")
              : "Nenhum investimento disponível";
          })()}.
**Carteira do Usuário**: O total depositado foi de R$ ${totalDeposit.toFixed(2)}. O total investido foi de R$ ${totalInvestment.toFixed(2)}. E o total gasto foi de R$ ${totalExpenses.toFixed(2)}.
Por favor, gere um relatório financeiro mensal que contenha:
1. **Resumo**: Um resumo objetivo para cada FII, destacando o tipo, rendimentos mensais acumulados, ganho de capital (cota), valor final estimado e dividend yield anualizado.
2. **Análise**: Padrões observados, como consistência dos dividendos, valorização das cotas e impacto do dividend yield.
3. **Tabela de Valores Mensais**: Se o histórico tiver mais de 10 meses, mostre apenas os 3 primeiros meses, 3 meses do meio e 3 últimos meses, incluindo dividendos e valores ajustados pela inflação; caso contrário, exiba todos.
4. **Recomendações**: Sugestões práticas para melhorar o desempenho, como reinvestir dividendos, diversificar FIIs ou focar em setores específicos.
5. **Sugestões de Simulação Baseadas na Carteira**: Com base na carteira do usuário (depósitos, investimentos e gastos), sugira estratégias de investimento em FIIs, como reinvestir dividendos se os depósitos forem altos, diversificar em FIIs de tijolo ou papel se os gastos permitirem ou ajustar o orçamento para liberar capital.
Formate o relatório com clareza, usando títulos e separando seções para facilitar a leitura. Use linguagem acessível e forneça insights úteis e acionáveis.`,
        },
      ];
    } else if (category === "CRIPTO") {
      return [
        {
          role: "system",
          content:
            "Você é um assistente financeiro especializado em criptomoedas, ajudando usuários a entenderem seus investimentos em Bitcoin e fornecendo sugestões para otimização de portfólio.",
        },
        {
          role: "user",
          content: `Com base nestes dados de investimentos em criptomoedas: ${(() => {
            const invs = Array.isArray(investiment)
              ? investiment
              : investiment
                ? [investiment]
                : [];
            return invs.length > 0
              ? invs
                  .map(
                    (inv, index) =>
                      `Investimento ${index + 1}: Criptomoeda: '${inv.valor0 || "N/A"}', Valor Final Estimado: Médio: R$ ${Number(inv.valor1?.[0] || 0).toFixed(2)}, Otimista: R$ ${Number(inv.valor1?.[1] || 0).toFixed(2)}, Pessimista: R$ ${Number(inv.valor1?.[2] || 0).toFixed(2)}, Ganho de Capital (médio): R$ ${Number(inv.valor2 || 0).toFixed(2)}, Valor Líquido (após IR): R$ ${Number(inv.valor3 || 0).toFixed(2)}, Quantidade de BTC: ${Number(inv.valor4 || 0)}, Taxas Pagas: R$ ${Number(inv.valor5 || 0).toFixed(2)} Total Investido: R$ ${inv.valor6 || "N/A"}`,
                  )
                  .join("; ")
              : "Nenhum investimento disponível";
          })()}.
**Carteira do Usuário**: O total depositado foi de R$ ${totalDeposit.toFixed(2)}. O total investido foi de R$ ${totalInvestment.toFixed(2)}. E o total gasto foi de R$ ${totalExpenses.toFixed(2)}.
Por favor, gere um relatório financeiro mensal que contenha:
1. **Resumo**: Um resumo objetivo para cada criptomoeda, destacando o tipo, quantidade de BTC, ganho de capital médio, valor final estimado e taxas pagas.
2. **Análise**: Padrões observados, como volatilidade, crescimento do investimento e impacto das taxas.
3. **Recomendações**: Sugestões práticas para melhorar o desempenho, como estratégias de hold, diversificação em outras criptomoedas ou gerenciamento de taxas.
4. **Sugestões de Simulação Baseadas na Carteira**: Com base na carteira do usuário (depósitos, investimentos e gastos), sugira estratégias de investimento em criptomoedas, como alocar mais capital se os depósitos forem altos, diversificar em outras criptos se os gastos permitirem ou ajustar o orçamento para reduzir taxas.
Formate o relatório com clareza, usando títulos e separando seções para facilitar a leitura. Use linguagem acessível e forneça insights úteis e acionáveis. Não inclua tabela de valores mensais, pois esses dados não estão disponíveis.`,
        },
      ];
    } else if (category === "Calcular-investimentos") {
      return [
        {
          role: "system",
          content: `
Você é um especialista em cálculos financeiros para investimentos de renda fixa. Siga estas regras À RISCA:

## REGRAS GERAIS
1. FORMATAÇÃO:
   - Valores sempre em R$ com 2 decimais (exemplo: R$ 1.234,56)
   - Datas no formato DD/MM/AAAA
   - Arredondamento APENAS no resultado final
   - Use vírgula como separador decimal, nunca misture com ponto

2. METODOLOGIA PARA POUPANÇA:
   - **Fórmula mensal exata**:
     - SaldoFinal = (SaldoAnterior + Aporte) × (1 + TaxaMensal)
     - TaxaMensal = ((1 + CDI) ** (1/12) - 1) * 0,7
     - CDI padrão: 10,15% ao ano (0,1015), resultando em TaxaMensal ≈ 0,5623% ao mês
     - TR: 0% (valor fixo desde 2018)
   - **Aporte**: Adicionado **antes** do cálculo dos juros no fim do mês
   - **Isenção**: Sem IR ou IOF em qualquer prazo
   - **Mês de Resgate**:
     - Se fornecido, calcule apenas até o mês especificado (ex.: resgate no 24º mês = 24 iterações)
     - Ignore aportes após o mês de resgate
   - Se não fornecido, calcule para todo o período

3. PARA OUTROS INVESTIMENTOS DE RENDA FIXA:
   - Use juros compostos mensais com taxa mensal calculada por: ((1 + taxaAnual) ** (1/12) - 1)
   - Para CDBs, calcule mensalmente usando percentual sobre CDI
   - IR regressivo deve ser aplicado apenas sobre os rendimentos líquidos (valor final bruto - valor inicial - aportes), com alíquotas:
     - > 720 dias: 15%
     - 361 a 720 dias: 17,5%
     - 181 a 360 dias: 20%
     - <= 180 dias: 22,5%

4. VALIDAÇÕES IMPORTANTES:
   - Calcule IR somente sobre o rendimento, nunca sobre o total investido
   - Sempre exiba valores de IR corretos e compatíveis com o cálculo
   - Rentabilidade **real** só deve ser usada se descontar inflação; caso contrário, use "rentabilidade líquida nominal"

## ESTRUTURA OBRIGATÓRIA DO RELATÓRIO
1. CÁLCULO PRECISO
   - Explique o método e a fórmula aplicada
   - Apresente uma tabela com os 3 primeiros meses e os 3 últimos meses do período, com valores formatados em R$
   - Informe valor final bruto, IR e valor líquido

2. ANÁLISE
   - Use o termo “rentabilidade líquida nominal”
   - Mostre a alíquota de IR aplicada e o valor correspondente
   - Não faça comparações com outros investimentos a menos que seja solicitado

3. RECOMENDAÇÕES
   - Sugira estratégias para melhorar rendimento com base no perfil de risco
   - Indique alocação inteligente considerando produtos com risco compatível
   - Não cite produtos ou estratégias que não estejam de acordo com os dados fornecidos

## NUNCA:
- Misture métodos de cálculo diferentes
- Informe valores de IR incorretos
- Diga "rentabilidade real" quando for rentabilidade nominal
- Compare investimentos sem solicitação
- Use dados que não foram fornecidos

`,
        },
        {
          role: "user",
          content: `
    SIMULAÇÃO SOLICITADA:
    ${(() => {
      const invs = Array.isArray(investimentosInputs)
        ? investimentosInputs
        : investimentosInputs
          ? [investimentosInputs]
          : [];
      return invs.length > 0
        ? invs
            .map((inv, index) => {
              const period = `${inv.period} ${inv.periodUnit || "meses"}`;
              let details = `Investimento ${index + 1}: Tipo: ${inv.tipoInvestimento || "N/A"}, Valor Inicial: ${inv.valorInicial || "0,00"}, Período: ${period}, Cenário: ${inv.marketScenario || "N/A"}`;
              if (inv.aporteMensal)
                details += `, Aporte Mensal: ${inv.aporteMensal || "0,00"}`;
              if (inv.tipoInvestimento?.toLowerCase() === "poupanca")
                details += `, Mês de Resgate: ${inv.resgateMes || "0"}`;
              else if (inv.tipoInvestimento?.toLowerCase() === "tesouro")
                details += `, Taxa Selic: ${inv.taxaSelic || "0,00"}% a.a., Mês de Resgate: ${inv.resgateMes || "0"}`;
              else if (inv.tipoInvestimento?.toLowerCase() === "cdb")
                details += `, Taxa CDB: ${inv.taxaCDB || "0,00"}% CDI, Mês de Resgate: ${inv.resgateMes || "0"}`;
              return details;
            })
            .join("; ")
        : "Nenhum dado de investimento disponível";
    })()}.

RELATÓRIO REQUERIDO EM 3 PARTES:

1. [CÁLCULO PRECISO]
   - Método: Aporte no FIM do mês
   - Fórmula: Juros compostos mensais
   - Tabela com 3 primeiros/últimos meses

2. [ANÁLISE]
   - Rentabilidade líquida nominal
   - Detalhar imposto aplicado
   - Não confundir com rentabilidade real

3. [RECOMENDAÇÕES]
   - Estratégias para otimizar rendimentos
   - Alternativas com mesmo nível de segurança
   - Alocação sugerida

FORMATO:
- Destaque valores em **negrito**
- Precisão de 2 decimais
- Linguagem técnica e clara`,
        },
      ];
    } else if (category === "Calcular-acoes") {
      return [
        {
          role: "system",
          content:
            "Você é uma especialista em cálculos financeiros e simulações de investimentos em ações, com expertise em análise de portfólio e projeções baseadas em cenários de mercado. Realize simulações precisas com base nos dados fornecidos, considerando apenas os parâmetros informados. Os valores monetários estão formatados no padrão brasileiro (ex.: '50,00' para 50.00), e você deve interpretá-los como números no formato brasileiro.",
        },
        {
          role: "user",
          content: `Realize uma simulação de investimento em ações com base nos seguintes dados: ${(() => {
            const invs = Array.isArray(acoesInputs)
              ? acoesInputs
              : acoesInputs
                ? [acoesInputs]
                : [];
            return invs.length > 0
              ? invs
                  .map(
                    (inv, index) =>
                      `Investimento ${index + 1}: Preço da Ação: ${inv.stockPrice || "0,00"}, Valor a Investir (R$) ${inv.amount || "0"}, Taxa de Retorno Anual Esperada: ${inv.returnRate || "0,00"}%, Taxa de Corretagem: ${inv.brokerageFee || "0,00"}, Alíquota de Imposto: ${inv.taxRate || "0,00"}%, Período: ${inv.period} ${inv.periodUnit || "meses"}, Cenário: ${inv.marketScenario || "N/A"}`,
                  )
                  .join("; ")
              : "Nenhum dado de investimento disponível";
          })()}.
Por favor, gere um relatório de simulação que contenha:
1. **Resumo**: Um resumo objetivo do investimento, destacando o preço inicial, quantidade de ações, valor investido, período, retorno esperado e valor final estimado após impostos e taxas.
2. **Análise**: Avalie o desempenho projetado com base no cenário de mercado (otimista, neutro ou pessimista, se fornecido) e o impacto das taxas de corretagem e impostos.
3. **Recomendações**: Sugestões práticas para otimizar o investimento, como diversificar o portfólio, ajustar o período ou reduzir custos com corretagem.
Formate o relatório com clareza, usando títulos e separando seções. Use linguagem acessível e forneça insights úteis. Considere:
- Os valores estão no formato brasileiro (ex.: '50,00' para 50.00, '100,00' para 100.00) e devem be interpretados como números.
- Considere o cenário de mercado apenas se fornecido.
- Se os dados forem insuficientes, retorne uma mensagem clara indicando os dados faltantes.`,
        },
      ];
    } else if (category === "Calcular-FIIs") {
      return [
        {
          role: "system",
          content: `Você é uma especialista em cálculos financeiros para FIIs. REGRAS ABSOLUTAS DE CÁLCULO:

1. COTAS:
   - Sempre inteiras: Math.floor(Valor Investido / Preço Cota)
   - Exemplo: R$ 6.789 / R$ 500 = 13 cotas (sobra R$ 289)

2. DIVIDENDOS:
   - Isentos de IR (Lei 11.033/2004)
   - DY Anual = (1 + DY_mensal)^12 - 1
   - Exemplo: DY 0.75% → (1.0075)^12 - 1 = 9.38%

3. VALORIZAÇÃO:
   - Por cota: Preço × (1 + Taxa)^(Período/12)
   - Exemplo: R$ 500 × (1.03)^1 = R$ 515 após 1 ano

4. TAXAS:
   - Aplicar SOMENTE sobre valor investido em cotas
   - Exemplo: 1% de R$ 6.500 = R$ 65

5. IMPOSTO:
   - 20% APENAS sobre ganho de capital (Valor Final - Valor Inicial)

6. INFLAÇÃO:
   - Ajustar valor final: Valor Nominal / (1 + Inflação)^(Período/12)

Formato brasileiro (R$ 1.234,56). Mantenha a estrutura solicitada.`,
        },
        {
          role: "user",
          content: `Realize uma simulação de investimento em fundos imobiliários (FIIs) com base nos seguintes dados: ${(() => {
            const invs = Array.isArray(fiisInputs)
              ? fiisInputs
              : fiisInputs
                ? [fiisInputs]
                : [];
            return invs.length > 0
              ? invs
                  .map(
                    (inv, index) =>
                      `Investimento ${index + 1}: Tipo de FII: ${inv.fiiType || "N/A"}, Valor a Investir (R$) : ${inv.amount || "0"}, Preço Inicial por Cota (R$): ${inv.sharePrice || "0,00"}, Dividend Yield Mensal Estimado (%) ${inv.dividendYield || "0,00"}%, Taxa de Valorização Anual: ${inv.appreciationRate || "0,00"}%, Taxa Administrativa: ${inv.adminFee || "0,00"}%, Taxa de Performance: ${inv.performanceFee || "0,00"}%, Taxa de Inflação: ${inv.inflationRate || "0,00"}%, Alíquota de Imposto: ${inv.taxRate || "0,00"}%, Reinvestir Dividendos: ${inv.reinvestDividends ? "Sim" : "Não"}, Período: ${inv.period} ${inv.periodUnit || "meses"}, Cenário: ${inv.marketScenario || "N/A"}`,
                  )
                  .join("; ")
              : "Nenhum dado de investimento disponível";
          })()}.
Por favor, gere um relatório conforme solicitado, aplicando rigorosamente as regras acima.`,
        },
      ];
    } else if (category === "Calcular-Bitcoin") {
      return [
        {
          role: "system",
          content:
            "Você é uma especialista em cálculos financeiros e simulações de investimentos em criptomoedas, com expertise em Bitcoin e análise de volatilidade em diferentes cenários de mercado. Realize simulações precisas com base exclusivamente nos dados fornecidos, utilizando juros compostos mensais e volatilidade mensal para projeções. Os valores monetários estão no formato brasileiro (ex.: '15000,00' para 15000.00, com vírgula como separador decimal e ponto como separador de milhares) e devem ser convertidos para números antes dos cálculos usando parseFloat(value.replace('.', '').replace(',', '.')). Mantenha precisão numérica de pelo menos 8 casas decimais em TODOS os cálculos intermediários (e.g., monthlyReturn, monthlyVolatility, preços futuros) para evitar erros de arredondamento. Não use aproximações ou fórmulas alternativas às especificadas.",
        },
        {
          role: "user",
          content: `Realize uma simulação de investimento em Bitcoin com base nos seguintes dados: ${(() => {
            const invs = Array.isArray(bitcoinInputs)
              ? bitcoinInputs
              : bitcoinInputs
                ? [bitcoinInputs]
                : [];
            return invs.length > 0
              ? invs
                  .map(
                    (inv, index) =>
                      `Investimento ${index + 1}: Valor Inicial: ${inv.initialInvestment || "0,00"}, Taxa de Retorno Anual Esperada: ${inv.returnRate || "0,00"}%, Taxa de Corretagem por Transação: ${inv.exchangeFee || "0,00"}%, Valor do Bitcoin: ${inv.valueBitcoin || "0,00"}, Período: ${inv.period} ${inv.periodUnit || "meses"}, Cenário: ${inv.marketScenario || "N/A"}`,
                  )
                  .join("; ")
              : "Nenhum dado de investimento disponível";
          })()}.
Por favor, gere um relatório de simulação que contenha:
1. **Resumo**: Um resumo objetivo do investimento, incluindo:
   - Valor inicial (convertido do formato brasileiro).
   - Quantidade de Bitcoin comprada: (valorInicial × (1 - taxaCorretagem/100)) ÷ valorBitcoin.
   - Valor final estimado (médio, otimista e pessimista), calculado como:
     - Preço futuro do Bitcoin (médio): valorBitcoin × (1 + monthlyReturn)^periodInMonths
     - Preço futuro otimista: valorBitcoin × (1 + monthlyReturn + monthlyVolatility)^periodInMonths
     - Preço futuro pessimista: valorBitcoin × (1 + monthlyReturn - monthlyVolatility)^periodInMonths
     - Valor final: quantidadeBitcoin × preçoFuturo (para cada cenário).
     - Aplique as fórmulas EXATAMENTE como especificado, sem aproximações ou alterações.
   - Taxas pagas: valorInicial × (taxaCorretagem/100).
   - Ganho de capital (médio): valorFinalMédio - valorInicial.
   - Valor líquido após imposto (médio): valorFinalMédio - imposto, onde imposto = ganhoCapital × 0.15 se ganhoCapital > 35000, senão 0.
2. **Análise**: Avalie o desempenho projetado com base no cenário de mercado (bull, neutro ou bear, se fornecido) e o impacto da volatilidade e taxas de corretagem. Inclua a faixa de volatilidade, especificando os **valores finais do investimento** nos cenários otimista (valorFinalOtimista) e pessimista (valorFinalPessimista), em reais, arredondados para 2 casas decimais.
3. **Recomendações**: Sugestões práticas para otimizar o investimento, como estratégias de hold, diversificação, redução de taxas ou monitoramento de mercado.
Formate o relatório com clareza, usando títulos e separando seções. Use linguagem acessível e forneça insights úteis. Considere:
- Converta valores no formato brasileiro (ex.: '15000,00' → 15000.00) antes dos cálculos usando parseFloat(value.replace('.', '').replace(',', '.')).
- Use juros compostos mensais: monthlyReturn = (1 + returnRate/100)^(1/12) - 1, com precisão de 8 casas decimais. Exemplo: para returnRate = 20, monthlyReturn = 0.015275239.
- Para o período, converta anos para meses (period × 12) se periodUnit for 'anos'.
- Para volatilidade:
  - Cenário neutro ou bull: volatilidadeAnual = 0.5; bear: volatilidadeAnual = 0.4.
  - Volatilidade mensal: volatilidadeAnual / sqrt(12). Exemplo: para volatilidadeAnual = 0.5, monthlyVolatility = 0.5 / 3.464101615 ≈ 0.144337567.
- Taxa de retorno anual por cenário:
  - Bull: returnRate = 0.4
  - Neutro: returnRate = returnRate/100
  - Bear: returnRate = -0.2
- A taxa de corretagem é deduzida APENAS na compra inicial do Bitcoin.
- Arredonde valores finais monetários para 2 casas decimais (ex.: R$ 7166,55) e quantidade de Bitcoin para 8 casas decimais (ex.: 0,01014996).
- Se os dados forem insuficientes, retorne uma mensagem clara indicando os dados faltantes.
Exemplo de cálculo para validação (com inputs: valorInicial = 6008,00, returnRate = 20%, taxaCorretagem = 0,5%, valorBitcoin = 589337,00, period = 12 meses, cenário = neutro):
- monthlyReturn = (1 + 0.2)^(1/12) - 1 ≈ 0.015275239
- monthlyVolatility = 0.5 / sqrt(12) ≈ 0.144337567
- quantidadeBitcoin = (6008 × (1 - 0.005)) / 589337 ≈ 0.01014996
- preçoFuturoMédio = 589337 × (1 + 0.015275239)^12 ≈ 706164.75
- preçoFuturoOtimista = 589337 × (1 + 0.015275239 + 0.144337567)^12 ≈ 3485707.35
- preçoFuturoPessimista = 589337 × (1 + 0.015275239 - 0.144337567)^12 ≈ 112263.13
- valorFinalMédio = 0.01014996 × 706164.75 ≈ 7166.55
- valorFinalOtimista = 0.01014996 × 3485707.35 ≈ 35371.59
- valorFinalPessimista = 0.01014996 × 112263.13 ≈ 1139.29"`,
        },
      ];
    } else {
      throw new Error("Categoria inválida.");
    }
  };

  return {
    messages: getMessages(),
  };
};
