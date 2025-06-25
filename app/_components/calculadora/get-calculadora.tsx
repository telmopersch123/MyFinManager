"use client";

import {
  CalculationJuros,
  CalculationParcelamento,
  Calculo,
  MudadedCopyJuros,
  ParcelamentoResultado,
} from "@/app/_interfaces/interface";
import { Calculator } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import CalculadoraDefault from "./calculadoraDefault";
import CalculadoraJuros from "./calculadoraJuros";
import { GraphicsParcelamento } from "./graphics/graphics";
import CalculadoraSimulator from "./Parcelamento-Component";
import SavedCalculationsDefault from "./savedCalculation-default";
import SavedCalculationJuros from "./savedCalculation-juros";
import SavedCalculationParcelamento from "./savedCalculation-parcelamento";

interface CronogramaItem {
  parcela: string;
  dataVencimento: string;
  prestacao: string;
  juros: string;
  amortizacao: string;
  saldo: string;
}

interface MudadedCopyParcelamento {
  campo1: string;
  campo2: string;
  campo3: string;
  campo4: string;
  campo5: string;
  campo6: string;
  campo7: string;
  campo8: string;
  campo9: string;
  campo10: string;
  campo11: CronogramaItem[];
}

export default function GetCalculator() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [expression, setExpression] = useState("");
  const [internalExpression, setInternalExpression] = useState("");
  const [refreshCalculations, setRefreshCalculations] = useState(0);
  const [mudadedCopy, setMudadedCopy] = useState("");
  const [controlVisibleCheck, setControlVisibleCheck] = useState(false);
  const [controlModeCalculator, setControlModeCalculator] = useState("default");
  const [controlMSGEmpty, setControlMSGEmpty] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);
  const [catchDate, setCatchDate] = useState("");
  const [historicoCalculos, setHistoricoCalculos] = useState<Calculo[]>([]);
  const [jurosGraphics, setjurosGraphics] = useState<string[]>([]);
  const [amortizacaoGraphics, setAmortizacaoGraphics] = useState<string[]>([]);
  const [saldoDevedoGraphics, setSaldoDevedorGraphics] = useState<string[]>([]);
  const [dataVencimentoGraphics, setDataVencimentoGraphics] = useState<
    string[]
  >([]);
  const [clickButton, setClickButton] = useState(0);
  const handleClique = () => {
    setClickButton((prev) => prev + 1);
  };
  const [modoSelecionado, setModoSelecionado] = useState<
    "simples" | "composto"
  >("simples");
  const [resultado, setResultado] = useState<
    ParcelamentoResultado | undefined
  >();
  const [calculations, setCalculations] = useState<CalculationJuros[]>([]);
  const [calculationsParce, setCalculationsParce] = useState<
    CalculationParcelamento[]
  >([]);
  const [mudadedCopyJuros, setMudadedCopyJuros] = useState<MudadedCopyJuros>({
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
  const [mudadedCopyParcelamento, setMudadedCopyParcelamento] =
    useState<MudadedCopyParcelamento>({
      campo1: "",
      campo2: "",
      campo3: "",
      campo4: "",
      campo5: "",
      campo6: "",
      campo7: "",
      campo8: "",
      campo9: "",
      campo10: "",
      campo11: [],
    });
  const [divHeight, setDivHeight] = useState<number | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (divRef.current) {
        const height = divRef.current.offsetHeight;
        setDivHeight(height);
      } else {
        setDivHeight(null);
      }
    };

    const scheduleUpdate = () => {
      requestAnimationFrame(() => {
        setTimeout(updateHeight, 0);
      });
    };

    if (
      modoSelecionado ||
      clickButton ||
      controlModeCalculator ||
      historicoCalculos ||
      calculations ||
      calculationsParce ||
      mudadedCopyJuros ||
      resultado
    ) {
      scheduleUpdate();
    } else {
      setDivHeight(null);
    }

    const handleResize = () => {
      scheduleUpdate();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [
    modoSelecionado,
    clickButton,
    controlModeCalculator,
    historicoCalculos,
    calculations,
    calculationsParce,
    mudadedCopyJuros,
    resultado,
  ]);

  useEffect(() => {
    if (!isDialogOpen || modoSelecionado || controlModeCalculator) {
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
      setMudadedCopyParcelamento({
        campo1: "",
        campo2: "",
        campo3: "",
        campo4: "",
        campo5: "",
        campo6: "",
        campo7: "",
        campo8: "",
        campo9: "",
        campo10: "",
        campo11: [],
      });
      setExpression("");
      setInternalExpression("");
      setHistoricoCalculos([]);
    }
  }, [isDialogOpen, modoSelecionado, controlModeCalculator]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="absolute bottom-0 right-0 m-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] opacity-50 shadow-md transition-all duration-300 hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] hover:opacity-100 hover:shadow-[0_0_10px_hsl(var(--primary))] dark:border-transparent dark:bg-neutral-900 dark:text-neutral-500 dark:hover:border-green-500 dark:hover:text-green-500 dark:hover:shadow-[0_0_10px_#22c55e]"
                  variant="ghost"
                >
                  <Calculator />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-[hsl(var(--primary))] dark:text-primary">
                <p>Calculadora</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DialogTrigger>
      <DialogContent
        className={`${
          controlVisibleCheck ? "flex" : ""
        } max-h-[90vh] w-[90%] min-w-fit flex-col overflow-auto overflow-x-hidden border-[hsl(var(--border))] bg-[hsl(var(--background))] dark:border-neutral-800 dark:bg-neutral-900 sm:mx-0 md:w-auto md:flex-row-reverse md:items-start`}
      >
        <div ref={divRef}>
          <DialogTitle className="hidden" />
          <DialogHeader className="pt-5">
            <div className="flex items-center justify-between gap-2">
              <Button
                onClick={() => setControlModeCalculator("default")}
                className={`${
                  controlModeCalculator === "default"
                    ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] dark:bg-primary dark:text-white"
                    : "bg-black/50 dark:bg-zinc-700/30"
                } m-0 mt-1 border border-[hsl(var(--border))] text-[12px] dark:border-neutral-900`}
              >
                Simples
              </Button>
              <Button
                onClick={() => setControlModeCalculator("juros")}
                className={`${
                  controlModeCalculator === "juros"
                    ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] dark:bg-primary dark:text-white"
                    : "bg-black/50 dark:bg-zinc-700/30"
                } mt-1 border border-[hsl(var(--border))] text-[12px] dark:border-neutral-900`}
              >
                Juros
              </Button>
              <Button
                onClick={() => setControlModeCalculator("simulator")}
                className={`${
                  controlModeCalculator === "simulator"
                    ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] dark:bg-primary dark:text-white"
                    : "bg-black/50 dark:bg-zinc-700/30"
                } mt-1 border border-[hsl(var(--border))] text-[12px] dark:border-neutral-900`}
              >
                Parcelamento
              </Button>
            </div>
            <div className="!my-2 flex items-center justify-center gap-2 rounded-md bg-black/50 p-1 dark:bg-white dark:bg-opacity-5">
              <Label className="font-semibold text-white dark:text-white">
                Salvar Cálculos?
              </Label>
              <Checkbox
                checked={controlVisibleCheck}
                onCheckedChange={(checked) =>
                  setControlVisibleCheck(checked === true)
                }
                className="h-5 w-5 rounded-md border-[hsl(var(--border))] bg-[hsl(var(--background))] focus:ring-[hsl(var(--ring))] data-[state=checked]:border-[hsl(var(--primary))] data-[state=checked]:bg-[hsl(var(--primary))] dark:border-neutral-400/30 dark:bg-black dark:bg-opacity-10 dark:data-[state=checked]:border-green-500 dark:data-[state=checked]:bg-green-500"
              />
            </div>
          </DialogHeader>
          {controlModeCalculator === "default" && (
            <CalculadoraDefault
              expression={expression}
              setExpression={setExpression}
              setInternalExpression={setInternalExpression}
              internalExpression={internalExpression}
              error={error}
              setError={setError}
              setMudadedCopy={setMudadedCopy}
              mudadedCopy={mudadedCopy}
              controlModeCalculator={controlModeCalculator}
              setControlMSGEmpty={setControlMSGEmpty}
              controlVisibleCheck={controlVisibleCheck}
              setRefreshCalculations={setRefreshCalculations}
            />
          )}
          {controlModeCalculator === "juros" && (
            <CalculadoraJuros
              controlMSGEmpty={controlMSGEmpty}
              setControlMSGEmpty={setControlMSGEmpty}
              setRefreshCalculations={setRefreshCalculations}
              mudadedCopyJuros={mudadedCopyJuros}
              controlVisibleCheck={controlVisibleCheck}
              modoSelecionado={modoSelecionado}
              setModoSelecionado={setModoSelecionado}
              handleClique={handleClique}
              setMudadedCopyJuros={setMudadedCopyJuros}
              setIsCalculated={setIsCalculated}
              isCalculated={isCalculated}
              catchDate={catchDate}
              setHistoricoCalculos={setHistoricoCalculos}
              historicoCalculos={historicoCalculos}
            />
          )}
          {controlModeCalculator === "simulator" && (
            <>
              <CalculadoraSimulator
                setControlMSGEmpty={setControlMSGEmpty}
                controlMSGEmpty={controlMSGEmpty}
                mudadedCopyParcelamento={mudadedCopyParcelamento}
                setRefreshCalculations={setRefreshCalculations}
                controlVisibleCheck={controlVisibleCheck}
                handleClique={handleClique}
                setSaldoDevedorGraphics={setSaldoDevedorGraphics}
                setAmortizacaoGraphics={setAmortizacaoGraphics}
                setjurosGraphics={setjurosGraphics}
                setDataVencimentoGraphics={setDataVencimentoGraphics}
                setResultado={setResultado}
                resultado={resultado}
              />
              {jurosGraphics.length > 0 &&
                jurosGraphics.map((item) => item === "") && (
                  <GraphicsParcelamento
                    jurosGraphics={jurosGraphics}
                    amortizacaoGraphics={amortizacaoGraphics}
                    saldoDevedoGraphics={saldoDevedoGraphics}
                    dataVencimentoGraphics={dataVencimentoGraphics}
                  />
                )}
            </>
          )}
        </div>
        <div>
          {controlVisibleCheck && controlModeCalculator === "default" && (
            <SavedCalculationsDefault
              setMudadedCopy={setMudadedCopy}
              refresh={refreshCalculations}
            />
          )}
          {controlVisibleCheck && controlModeCalculator === "juros" && (
            <SavedCalculationJuros
              setMudadedCopyJuros={setMudadedCopyJuros}
              refresh={refreshCalculations}
              divHeight={divHeight ?? 0}
              setCatchDate={setCatchDate}
              setCalculations={setCalculations}
              calculations={calculations}
            />
          )}
          {controlVisibleCheck && controlModeCalculator === "simulator" && (
            <SavedCalculationParcelamento
              setMudadedCopyParcelamento={setMudadedCopyParcelamento}
              refresh={refreshCalculations}
              divHeight={divHeight ?? 0}
              setCalculations={setCalculationsParce}
              calculations={calculationsParce}
            />
          )}
        </div>
        <DialogDescription className="hidden" />
      </DialogContent>
    </Dialog>
  );
}
