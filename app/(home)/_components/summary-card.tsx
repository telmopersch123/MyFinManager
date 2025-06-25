import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  userCandAddTransaction?: boolean;
  month?: string;
  handleFunctionAlert?: () => void;
  handleMessage?: (message: string, color: string) => void;
  hasPremiumPlan?: boolean;
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
  userCandAddTransaction,
  month,
  handleFunctionAlert,
  handleMessage,
  hasPremiumPlan,
}: SummaryCardProps) => {
  return (
    <Card
      className={`${
        size === "large"
          ? "bg-primary/90 dark:bg-transparent"
          : title === "Investimento"
            ? "bg-white bg-opacity-5"
            : title === "Receita"
              ? "bg-green-900 bg-opacity-5"
              : title === "Despesas"
                ? "bg-red-900 bg-opacity-5"
                : ""
      }`}
    >
      <CardHeader className="m-1 flex-col flex-wrap items-center justify-center gap-1 p-0 1xl-custom:flex-row 1xl-custom:justify-start sm:m-0 sm:gap-4 sm:p-6">
        <div
          className={`flex !h-[40px] !w-[40px] shrink-0 items-center justify-center rounded-md ${
            size === "large"
              ? "bg-black/15 text-white dark:bg-white/5"
              : title === "Investimento"
                ? "bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-5"
                : title === "Receita"
                  ? "bg-iconsBackGreen bg-opacity-10"
                  : title === "Despesas"
                    ? "bg-iconsBackRed bg-opacity-10"
                    : ""
          }`}
        >
          {icon}
        </div>
        <p
          className={` ${size === "small" ? "text-sm dark:text-muted-foreground sm:text-sm" : "text-[20px] text-white dark:text-muted-foreground dark:opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="relative flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-6">
        <p
          className={`font-bold ${
            size === "small"
              ? "-ml-3 text-[3.5vw] sm:text-[18px]"
              : "rounded-md bg-black/10 p-2 text-2xl text-white dark:bg-white dark:bg-opacity-5 sm:text-4xl"
          }`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(amount))}
        </p>

        {size === "large" && (
          <div className="sm:absolute sm:right-10">
            <AddTransactionButton
              location={"dashboard"}
              dashBoardCssButton={true}
              month={month ?? ""}
              userCanAddTransaction={userCandAddTransaction ?? false}
              handleFunctionAlert={handleFunctionAlert}
              handleMessage={handleMessage}
              hasPremiumPlan={hasPremiumPlan ?? null}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
