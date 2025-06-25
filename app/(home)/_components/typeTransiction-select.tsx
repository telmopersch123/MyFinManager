"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useState } from "react";
const TRANSACTION_OPTION = [
  { value: "EXPENSE", label: "Despesas" },
  { value: "INVESTMENT", label: "Investimentos" },
  { value: "DEPOSIT", label: "Depósitos" },
];

interface TransictionTypeProps {
  onChangeAction: (value: "EXPENSE" | "DEPOSIT" | "INVESTMENT") => void;
  defaultValue?: "EXPENSE" | "DEPOSIT" | "INVESTMENT";
}
export default function TypeTransictionSelect({
  onChangeAction,
  defaultValue = "DEPOSIT",
}: TransictionTypeProps) {
  const [valueDefault, setValueDefault] = useState(defaultValue);

  const handleChangeSelect = (
    newValue: "EXPENSE" | "DEPOSIT" | "INVESTMENT",
  ) => {
    setValueDefault(newValue);
    onChangeAction(newValue);
  };
  return (
    <div>
      <Select value={valueDefault} onValueChange={handleChangeSelect}>
        <SelectTrigger className="w-[130px] rounded-full">
          <SelectValue placeholder="Selecione uma transição" />
        </SelectTrigger>
        <SelectContent>
          {TRANSACTION_OPTION.map((transiction) => (
            <SelectItem key={transiction.value} value={transiction.value}>
              {transiction.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
