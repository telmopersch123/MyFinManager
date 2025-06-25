"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { Info } from "lucide-react";

const getTooltipMessage = (type: string) => {
  switch (type) {
    case "poupanca":
      return (
        <>
          <h3>Poupança</h3>
          <p>
            Calcula juros compostos a 0,5% ao mês (equivalente a ~6,17% a.a.)
            sobre o saldo acumulado (valor inicial + aportes mensais).
          </p>
          <p>
            Isento de Imposto de Renda, com rentabilidade baseada em 70% da
            Selic + Taxa Referencial (TR).
          </p>
          <p>
            O simulador considera aportes mensais e prazos em meses ou anos, com
            liquidez diária.
          </p>
        </>
      );
    case "tesouroDireto":
      return (
        <>
          <h3>Tesouro Direto</h3>
          <p>
            Prefixado usa juros compostos com taxa fixa (ex.: 10-13% a.a.);
            pós-fixado segue 100% da Selic; híbrido soma IPCA + taxa fixa (ex.:
            5,5-8%).
          </p>
          <p>
            Desconta IR regressivo (22,5% a 15%) com base no prazo; aportes
            mensais não são considerados.
          </p>
          <p>
            Prazos em meses ou anos afetam a rentabilidade líquida; Selic tem
            liquidez diária, outros no vencimento.
          </p>
        </>
      );
    case "cdb":
      return (
        <>
          <h3>CDB</h3>
          <p>
            Prefixado aplica juros compostos com taxa fixa (ex.: 11-14% a.a.);
            pós-fixado usa 90-120% do CDI; híbrido soma IPCA/IGPM + taxa (ex.:
            6-9%).
          </p>
          <p>
            Desconta IR regressivo (22,5% a 15%) com base no prazo; protegido
            pelo FGC até R$250.000.
          </p>
          <p>
            Considera apenas o valor inicial investido, com liquidez variando
            entre diária e no vencimento.
          </p>
        </>
      );
    default:
      return (
        <p>
          Selecione um tipo de investimento para ver os detalhes do cálculo.
        </p>
      );
  }
};

export const TooltipComponent = ({
  investmentType,
}: {
  investmentType: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button>
            <Info className="h-5 w-5 text-gray-500" aria-hidden="true" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipMessage(investmentType)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
