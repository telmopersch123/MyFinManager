import { evaluate } from "mathjs";
import { useEffect, useRef } from "react";

interface CalculadoraProps {
  expression: string;
  setExpression: (value: string) => void;
  setInternalExpression: (value: string) => void;
  internalExpression: string;
  error: string;
  setError: (value: string) => void;
  setMudadedCopy: (value: string) => void;
  mudadedCopy: string;
  controlModeCalculator: string;
  setControlMSGEmpty: (value: boolean) => void;
  controlVisibleCheck: boolean;
  setRefreshCalculations: React.Dispatch<React.SetStateAction<number>>;
}

export default function CalculadoraDefault({
  expression,
  setExpression,
  setInternalExpression,
  internalExpression,
  error,
  setError,
  setMudadedCopy,
  mudadedCopy,
  controlModeCalculator,
  setControlMSGEmpty,
  controlVisibleCheck,
  setRefreshCalculations,
}: CalculadoraProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const limited = 70;

  useEffect(() => {
    if (expression.length === 0) {
      setError("");
    }
  }, [expression, setError]);

  useEffect(() => {
    if (controlModeCalculator) {
      setControlMSGEmpty(false);
    }
  }, [controlModeCalculator, setControlMSGEmpty]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [expression, internalExpression]);

  useEffect(() => {
    if (mudadedCopy) {
      setInternalExpression(mudadedCopy);
      setExpression(
        formatNumber(
          mudadedCopy.replace(".", ",").replace("*", "x").replace("/", "÷"),
          false,
        ),
      );
      setMudadedCopy("");
      restoreFocus();
    }
  }, [mudadedCopy, setExpression, setInternalExpression, setMudadedCopy]);

  const restoreFocus = () => {
    if (inputRef.current) {
      inputRef.current!.focus();
      inputRef.current!.scrollLeft = inputRef.current!.scrollWidth;
    }
  };

  function formatNumber(value: string, showComma: boolean = false): string {
    if (!value || value === "error") return value;
    const displayValue = value
      .replace(".", ",")
      .replace("*", "x")
      .replace("/", "÷");
    const parts = displayValue.split(/([+\-x÷%()])/);
    const formattedParts = parts.map((part) => {
      if (["+", "-", "x", "÷", "%", "(", ")"].includes(part)) return part;
      const [integerPart, decimalPart = ""] = part.split(",");
      const formattedInteger = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ".",
      );

      if (showComma && part.endsWith(",")) {
        return `${formattedInteger},`;
      }

      return decimalPart
        ? `${formattedInteger},${decimalPart}`
        : formattedInteger;
    });

    return formattedParts.join("");
  }

  async function calculate() {
    if (internalExpression === "") return;
    if (internalExpression.length >= limited) {
      setError("limited");
      return;
    }
    try {
      setError("");
      const result = evaluate(internalExpression);
      const rounded = Math.round(result * 10000) / 10000;
      const resultStr = rounded.toString();
      if (resultStr.length >= limited) {
        setError("limited");
        return;
      }
      setInternalExpression(resultStr);
      setExpression(
        formatNumber(
          resultStr.replace(".", ",").replace("*", "x").replace("/", "÷"),
        ),
      );

      if (controlVisibleCheck) {
        const response = await fetch("/api/calculations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formula: internalExpression,
            result: resultStr,
          }),
        });
        if (response.ok) {
          setRefreshCalculations((prev) => prev + 1);
        } else {
          console.error("Erro ao salvar cálculo:", await response.text());
        }
      }
    } catch {
      setError("error");
      return;
    }
  }

  function handleButtonClick(value: string) {
    if (value === "") return;

    restoreFocus();
    setError("");
    const internalValue = value === "," ? "." : value;
    const operator = ["+", ".", "*", "/", "%", "(", ")"];
    if (internalExpression === "" && operator.includes(internalValue)) {
      return;
    }

    if (internalValue === ".") {
      const lastPart = internalExpression.split(/[\+\-\*\/()]/).pop() || "";
      if (lastPart.includes(".")) {
        return;
      }
    }

    if (
      ["+", "-", "*", "/", "%", "."].includes(internalValue) &&
      ["+", "-", "*", "/", "%", ".", "("].includes(internalExpression.slice(-1))
    ) {
      return;
    }

    const newInternalExpression = internalExpression + internalValue;
    setInternalExpression(newInternalExpression);
    const showComma = value === ",";
    setExpression(
      formatNumber(
        newInternalExpression
          .replace(".", ",")
          .replace("*", "x")
          .replace("/", "÷"),
        showComma,
      ),
    );
  }

  return (
    <>
      <div className="relative">
        <input
          type="text"
          value={expression}
          readOnly
          ref={inputRef}
          onBlur={restoreFocus}
          className="mb-6 h-20 w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-right font-mono text-3xl text-[hsl(var(--foreground))] shadow-inner focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:border-primary dark:focus:ring-2 dark:focus:ring-primary"
          style={{ textAlign: "right", paddingRight: "10px" }}
        />
        {(error === "error" || error === "limited") && (
          <div className="relative left-0 mb-3 flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--destructive))]/20 p-[3px] pl-3 dark:bg-red-600 dark:bg-opacity-20 md:absolute md:top-0 md:mb-0 md:bg-transparent">
            <span
              className="pointer-events-none h-3 w-3 rounded-full bg-[hsl(var(--destructive))] transition-all dark:bg-red-500"
              style={{ filter: "blur(2px)" }}
            ></span>

            {error === "error" && (
              <span className="text-[11px] font-bold text-[hsl(var(--destructive))] opacity-50 dark:text-red-500">
                Expressão incorreta. Corrija a fórmula matemática.
              </span>
            )}
            {error === "limited" && (
              <span className="text-[12px] font-bold text-[hsl(var(--destructive))] opacity-50 dark:text-red-500">
                Limite de caracteres atingido. (-{limited} Caracteres)
              </span>
            )}
          </div>
        )}
      </div>

      <div
        className="grid grid-cols-4 gap-4 text-lg font-semibold"
        onClick={restoreFocus}
      >
        {/* Primeira linha */}
        <CalcButton
          label="("
          span
          onClick={() => handleButtonClick("(")}
          customStyle="dark:bg-primary bg-[hsl(var(--primary))] dark:text-white text-[hsl(var(--primary-foreground))] dark:hover:bg-primary/90 hover:bg-[hsl(var(--primary))]/90"
        />
        <CalcButton
          label=")"
          span
          onClick={() => handleButtonClick(")")}
          customStyle="dark:bg-primary bg-[hsl(var(--primary))] dark:text-white text-[hsl(var(--primary-foreground))] dark:hover:bg-primary/90 hover:bg-[hsl(var(--primary))]/90"
        />
        <CalcButton
          label="C"
          onClick={() => {
            setExpression("");
            setInternalExpression("");
            restoreFocus();
          }}
          customStyle="dark:border-red-500/25 dark:bg-red-950/50 border-[hsl(var(--destructive))]/25 bg-[hsl(var(--destructive))]/10"
        />
        <CalcButton
          label="⌫"
          onClick={() => {
            const newInternalExpression = internalExpression.slice(0, -1);
            setInternalExpression(newInternalExpression);
            setExpression(
              formatNumber(newInternalExpression.replace(".", ","), true),
            );
            restoreFocus();
          }}
          customStyle="dark:border-red-900 dark:bg-red-600/30 dark:hover:border-red-300 dark:hover:text-red-300 border-[hsl(var(--destructive))] bg-[hsl(var(--destructive))]/20 hover:border-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive))]"
        />

        <CalcButton
          label="%"
          onClick={() => handleButtonClick("%")}
          customStyle="dark:bg-blue-500 bg-[hsl(var(--secondary))] dark:text-white text-[hsl(var(--secondary-foreground))] dark:hover:bg-blue-500/90 hover:bg-[hsl(var(--secondary))]/90"
        />
        <CalcButton
          label="÷"
          onClick={() => handleButtonClick("/")}
          customStyle="dark:bg-blue-500 bg-[hsl(var(--secondary))] dark:text-white text-[hsl(var(--secondary-foreground))] dark:hover:bg-blue-500/90 hover:bg-[hsl(var(--secondary))]/90"
        />

        {/* Segunda linha */}
        <CalcButton label="7" onClick={() => handleButtonClick("7")} />
        <CalcButton label="8" onClick={() => handleButtonClick("8")} />
        <CalcButton label="9" onClick={() => handleButtonClick("9")} />
        <CalcButton
          label="x"
          onClick={() => handleButtonClick("*")}
          customStyle="dark:bg-blue-500 bg-[hsl(var(--secondary))] dark:text-white text-[hsl(var(--secondary-foreground))] dark:hover:bg-blue-500/90 hover:bg-[hsl(var(--secondary))]/90"
        />

        {/* Terceira linha */}
        <CalcButton label="4" onClick={() => handleButtonClick("4")} />
        <CalcButton label="5" onClick={() => handleButtonClick("5")} />
        <CalcButton label="6" onClick={() => handleButtonClick("6")} />
        <CalcButton
          label="-"
          onClick={() => handleButtonClick("-")}
          customStyle="dark:bg-blue-500 bg-[hsl(var(--secondary))] dark:text-white text-[hsl(var(--secondary-foreground))] dark:hover:bg-blue-500/90 hover:bg-[hsl(var(--secondary))]/90"
        />

        {/* Quarta linha */}
        <CalcButton label="1" onClick={() => handleButtonClick("1")} />
        <CalcButton label="2" onClick={() => handleButtonClick("2")} />
        <CalcButton label="3" onClick={() => handleButtonClick("3")} />
        <CalcButton
          label="+"
          onClick={() => handleButtonClick("+")}
          customStyle="dark:bg-blue-500 bg-[hsl(var(--secondary))] dark:text-white text-[hsl(var(--secondary-foreground))] dark:hover:bg-blue-500/90 hover:bg-[hsl(var(--secondary))]/90"
        />

        {/* Quinta linha */}
        <CalcButton label="0" span onClick={() => handleButtonClick("0")} />
        <CalcButton label="," onClick={() => handleButtonClick(",")} />
        <CalcButton
          label="="
          onClick={() => {
            calculate();
            restoreFocus();
          }}
          customStyle="dark:bg-primary bg-[hsl(var(--primary))] dark:text-white text-[hsl(var(--primary-foreground))] dark:hover:bg-primary/90 hover:bg-[hsl(var(--primary))]/90"
        />
      </div>
    </>
  );
}

function CalcButton({
  label,
  span = false,
  customStyle = "",
  onClick,
}: {
  label: string;
  span?: boolean;
  customStyle?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] py-4 text-center transition-all duration-150 hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] dark:border-neutral-700 dark:bg-neutral-700 dark:hover:border-primary dark:hover:text-primary ${span ? "col-span-2" : ""} ${customStyle}`}
    >
      {label}
    </button>
  );
}
