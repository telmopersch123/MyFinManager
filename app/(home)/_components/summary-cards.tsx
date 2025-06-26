"use client";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";

import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  month: string;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  userCandAddTransaction?: boolean;
  handleFunctionAlert?: () => void;
  handleMessage?: (message: string, color: string) => void;
  hasPremiumPlan: boolean;
}

const SummaryCards = ({
  balance,
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  userCandAddTransaction,
  month,
  handleFunctionAlert,
  handleMessage,
  hasPremiumPlan,
}: SummaryCardsProps) => {
  return (
    <div className="space-y-6">
      {/*SALDO*/}
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
        userCandAddTransaction={userCandAddTransaction}
        month={month}
        handleFunctionAlert={handleFunctionAlert}
        handleMessage={handleMessage}
        hasPremiumPlan={hasPremiumPlan}
      />
      {/*OUTROS CARD*/}
      <div className="!my-3 grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investimento"
          amount={investmentsTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
