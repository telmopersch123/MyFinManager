"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const MONTH_OPTIONS = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

interface propsTime {
  pathUrl: string;
  month: string;
}

const TimeSelect = ({ pathUrl, month }: propsTime) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const monthFromUrl = searchParams.get("month");

  const defaultTime = month ?? monthFromUrl;
  const handleMonthChange = (selectedMonth: string) => {
    push(`${pathUrl}?month=${selectedMonth}`);
  };

  return (
    <Select
      onValueChange={(value) => handleMonthChange(value)}
      defaultValue={defaultTime}
    >
      <SelectTrigger className="w-full rounded-full 1xl-custom:m-auto 1xl-custom:w-[150px]">
        <SelectValue placeholder="Selecione um mês" />
      </SelectTrigger>
      <SelectContent>
        {MONTH_OPTIONS.map((monthFromUrl) => (
          <SelectItem key={monthFromUrl.value} value={monthFromUrl.value}>
            {monthFromUrl.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimeSelect;
