import { ReactNode } from "react";

interface PercentageItemProps {
  icon: ReactNode;
  title: string;
  amount: number;
}

const PercentageItem = ({ icon, title, amount }: PercentageItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-black bg-opacity-[3%] p-2 dark:bg-white dark:bg-opacity-[3%]">
          {icon}
        </div>

        <p className="text-sm font-bold text-muted-foreground">{title}</p>
      </div>
      {/* Porcentagem */}
      <p className="text-sm font-bold">
        {" "}
        {amount && amount !== 0 ? amount.toFixed(2) : "0"}%
      </p>
    </div>
  );
};

export default PercentageItem;
