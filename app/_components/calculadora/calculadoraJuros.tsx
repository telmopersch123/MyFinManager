import { useRef, useState } from "react";

import { Calculo, MonthlyData } from "@/app/_interfaces/interface";
import JurosCompostosComponent from "./JurosComposto-Component";
import JurosSimplesComponent from "./JurosSimples-Component";
import GraphicsSimples, { GraphicsCompostos } from "./graphics/graphics";

interface CalculadoraJurosProps {
  controlMSGEmpty: boolean;
  setControlMSGEmpty: (value: boolean) => void;
  setRefreshCalculations: React.Dispatch<React.SetStateAction<number>>;
  mudadedCopyJuros: {
    campo1: string;
    campo2: string;
    campo3: string;
    numero: string;
    campo4: string;
    campo5: string;
    campo6: string;
    campo7: string;
    campo8: string;
    campo9: MonthlyData[];
  };
  controlVisibleCheck: boolean;
  modoSelecionado: string;
  setModoSelecionado: React.Dispatch<
    React.SetStateAction<"simples" | "composto">
  >;
  handleClique: () => void;
  setMudadedCopyJuros: React.Dispatch<
    React.SetStateAction<{
      campo1: string;
      campo2: string;
      campo3: string;
      numero: string;
      campo4: string;
      campo5: string;
      campo6: string;
      campo7: string;
      campo8: string;
      campo9: MonthlyData[];
    }>
  >;
  setIsCalculated: React.Dispatch<React.SetStateAction<boolean>>;
  isCalculated: boolean;
  catchDate: string;
  setHistoricoCalculos: React.Dispatch<React.SetStateAction<Calculo[]>>;
  historicoCalculos: Calculo[];
}

export default function CalculadoraJuros({
  controlMSGEmpty,
  setControlMSGEmpty,
  setRefreshCalculations,
  mudadedCopyJuros,
  controlVisibleCheck,
  modoSelecionado,
  setModoSelecionado,
  handleClique,
  setMudadedCopyJuros,
  setIsCalculated,
  isCalculated,
  catchDate,
  setHistoricoCalculos,
  historicoCalculos,
}: CalculadoraJurosProps) {
  const [tempo, setTempo] = useState("");
  const [taxa, setTaxa] = useState("");
  const [capital, setCapital] = useState("");
  const [juros, setJuros] = useState("");
  const [montante, setMontante] = useState("");
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [capitalInvestido, setCapitalInvestido] = useState<string>("0");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleTempoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw === "") {
      setTempo(raw);
      return;
    }
    const number = parseInt(raw);
    if (!isNaN(number) && number <= 100) {
      setTempo(raw);
    }
  };

  const clearHandle = () => {
    setCapital("");
    setTaxa("");
    setTempo("");
    setJuros("");
    setMontante("");
    setCapitalInvestido("");
    setControlMSGEmpty(false);
    setHistoricoCalculos([]);
    setMonthlyData([]);
    setMudadedCopyJuros({
      campo1: "",
      campo2: "",
      campo3: "",
      numero: "",
      campo4: "",
      campo5: "",
      campo6: "",
      campo7: "",
      campo8: "",
      campo9: [],
    });
  };
  return (
    <>
      <div className="my-1 flex w-full justify-evenly gap-4 rounded-xl bg-black/50 p-2 text-center dark:bg-neutral-900">
        <p
          onClick={() => {
            clearHandle();
            setModoSelecionado("simples");
          }}
          className={`cursor-pointer rounded-md p-2 text-white transition-colors duration-300 ${
            modoSelecionado === "simples"
              ? "bg-primary"
              : "bg-black/20 hover:bg-primary"
          }`}
        >
          Juros Simples
        </p>
        <p
          onClick={() => {
            clearHandle();
            setModoSelecionado("composto");
          }}
          className={`cursor-pointer rounded-md p-2 text-white transition-colors duration-300 ${
            modoSelecionado === "composto"
              ? "bg-primary"
              : "bg-black/20 hover:bg-primary"
          }`}
        >
          Juros Compostos
        </p>
      </div>
      {modoSelecionado === "composto" && (
        <>
          <JurosCompostosComponent
            inputRef={inputRef}
            capital={capital}
            setCapital={setCapital}
            taxa={taxa}
            setTaxa={setTaxa}
            tempo={tempo}
            juros={juros}
            montante={montante}
            controlMSGEmpty={controlMSGEmpty}
            handleTempoInput={handleTempoInput}
            setTempo={setTempo}
            setControlMSGEmpty={setControlMSGEmpty}
            setJuros={setJuros}
            setMontante={setMontante}
            setCapitalInvestido={setCapitalInvestido}
            capitalInvestido={capitalInvestido}
            setRefreshCalculations={setRefreshCalculations}
            mudadedCopyJuros={mudadedCopyJuros}
            handleClique={handleClique}
            setMonthlyData={setMonthlyData}
            monthlyData={monthlyData}
            controlVisibleCheck={controlVisibleCheck}
            setIsCalculated={setIsCalculated}
            isCalculated={isCalculated}
          />
          {monthlyData.length > 0 &&
            monthlyData.some((item) => !Number.isNaN(item.valorAcumulado)) && (
              <GraphicsCompostos
                isCalculated={isCalculated}
                catchDate={catchDate}
                monthlyData={monthlyData}
              />
            )}
        </>
      )}

      {modoSelecionado === "simples" && (
        <>
          <JurosSimplesComponent
            inputRef={inputRef}
            capital={capital}
            setCapital={setCapital}
            taxa={taxa}
            setTaxa={setTaxa}
            tempo={tempo}
            setTempo={setTempo}
            juros={juros}
            setJuros={setJuros}
            montante={montante}
            controlMSGEmpty={controlMSGEmpty}
            handleTempoInput={handleTempoInput}
            setControlMSGEmpty={setControlMSGEmpty}
            setMontante={setMontante}
            setRefreshCalculations={setRefreshCalculations}
            mudadedCopyJuros={mudadedCopyJuros}
            controlVisibleCheck={controlVisibleCheck}
            setIsCalculated={setIsCalculated}
            isCalculated={isCalculated}
            setHistoricoCalculos={setHistoricoCalculos}
          />

          {historicoCalculos.length > 0 &&
            historicoCalculos.some((item) => item.aporteCapital !== "") && (
              <GraphicsSimples
                montante={montante}
                capital={capital}
                isCalculated={isCalculated}
                historicoCalculos={historicoCalculos}
                catchDate={catchDate}
              />
            )}
        </>
      )}
    </>
  );
}
