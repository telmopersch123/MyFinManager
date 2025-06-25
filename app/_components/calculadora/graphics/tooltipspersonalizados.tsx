import { MonthlyData } from "@/app/_interfaces/interface";
import { formatFromFractionToBRL } from "../formatFunctions";

interface ChartConfigItem {
  label: string;
  color: string;
}

// Interface para o chartConfig
interface ChartConfig {
  [key: string]: ChartConfigItem;
}
interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    dataKey: string;
    value: number;
    payload: {
      parcela: number;
      vencimento: string;
      originalIndex: number;
    };
  }[];
  chartConfig: ChartConfig;
  info: boolean;
  monthlyData?: MonthlyData[] | undefined;
}

export const CustomTooltip = ({
  active,
  payload,
  chartConfig,
  info,
  monthlyData,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-neutral-800 p-4 shadow-lg">
        <p className="text-sm font-bold text-white">
          {info && <>Parcela {payload[0].payload.parcela}</>}
        </p>
        <p className="text-sm text-neutral-300">
          {info ? (
            <>Vencimento: {payload[0].payload.vencimento}</>
          ) : (
            <>
              {monthlyData && (
                <p>{monthlyData[payload?.[0]?.payload?.originalIndex]?.mes}</p>
              )}
            </>
          )}
        </p>
        {payload.map((entry) => (
          <p key={entry.dataKey} className="text-sm text-neutral-300">
            {info ? <>{chartConfig[entry.dataKey].label} </> : "Valores"}:{" "}
            {formatFromFractionToBRL(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};
