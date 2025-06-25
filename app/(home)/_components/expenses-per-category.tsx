"use client";
import { formatToBRL } from "@/app/_components/calculadora/formatFunctions";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { transactionCategoryMap } from "@/app/_constants/transactions";
import { TotalExpenseCategory } from "@/app/_data/get-dashboard/type";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import TypeTransictionSelect from "./typeTransiction-select";

interface ExpensePerCategoryProps {
  initialExpensesPerCategory: TotalExpenseCategory[];
  month: string;
}

export default function ExpensePerCategory({
  initialExpensesPerCategory,
  month,
}: ExpensePerCategoryProps) {
  const [selectType, setSelectType] = useState<
    "EXPENSE" | "DEPOSIT" | "INVESTMENT"
  >("DEPOSIT");
  const [loading, setLoading] = useState(false);
  const [expensesPerCategory, setExpensesPerCategory] = useState(
    initialExpensesPerCategory,
  );

  const { data, error, isLoading } = useSWR(
    `/api/dashboard?month=${month}&type=${selectType}`,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    },
    {
      fallbackData: {
        dashboard: {
          totalExpensePerCategory: initialExpensesPerCategory,
        },
      },
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (error) {
      console.error(error);
    }
    if (data) {
      setExpensesPerCategory(data.dashboard.totalExpensePerCategory);
    }
  }, [data, isLoading, error]);

  return (
    <ScrollArea className="col-span-2 h-[450px] rounded-md border pb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-bold">
          <TypeTransictionSelect
            onChangeAction={(newType) => setSelectType(newType)}
            defaultValue="DEPOSIT"
          />
          por categoria
        </CardTitle>
      </CardHeader>
      <CardContent className="relative space-y-6">
        {loading ? (
          <div className="absolute left-[50%] top-[50%] mt-[120px]">
            <Loader2 className="animate-spin text-green-500" size={24} />
          </div>
        ) : expensesPerCategory && expensesPerCategory.length === 0 ? (
          <p className="text-sm text-gray-500">
            Nenhuma transação encontrada para este tipo.
          </p>
        ) : (
          expensesPerCategory &&
          expensesPerCategory.map((category) => (
            <div key={category.category} className="space-y-2">
              <div className="flex w-full justify-between">
                <p className="text-sm font-bold">
                  {transactionCategoryMap[category.category]}
                </p>
                <p className="text-sm font-bold">
                  {category.percentageOfTotal}%
                </p>
              </div>
              <Progress value={category.percentageOfTotal} />
              <p className="font-mulish my-[14px] text-sm font-semibold leading-[100%] tracking-[0%] text-opacity-[60%]">
                {formatToBRL(category.totalAmount)}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </ScrollArea>
  );
}
