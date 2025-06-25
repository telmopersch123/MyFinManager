"use client";

import { Button } from "@/app/_components/ui/button";
import { useEffect, useRef, useState } from "react";

interface InvestmentNavProps {
  typeInvestimentAction:
    | "Investimentos Fixos"
    | "Ações"
    | "Fundos Imobiliarios"
    | "CriptoMoedas";
  setTypeInvestimentAction: (
    type:
      | "Investimentos Fixos"
      | "Ações"
      | "Fundos Imobiliarios"
      | "CriptoMoedas",
  ) => void;
}

const navItems: InvestmentNavProps["typeInvestimentAction"][] = [
  "Investimentos Fixos",
  "Ações",
  "Fundos Imobiliarios",
  "CriptoMoedas",
];

export default function InvestmentNav({
  typeInvestimentAction,
  setTypeInvestimentAction,
}: InvestmentNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(typeInvestimentAction);

  const updateHighlight = (target: HTMLElement | null) => {
    if (!highlightRef.current || !navRef.current || !target) return;
    const rect = target.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    highlightRef.current.style.width = `${rect.width}px`;
    highlightRef.current.style.left = `${rect.left - navRect.left}px`;
    highlightRef.current.style.top = `${rect.top - navRect.top}px`;
    highlightRef.current.style.height = `${rect.height}px`;
  };

  useEffect(() => {
    const activeElement = navRef.current?.querySelector(
      `button[data-item="${typeInvestimentAction}"]`,
    ) as HTMLElement;
    updateHighlight(activeElement);

    const handleResize = () => {
      const current = navRef.current?.querySelector(
        `button[data-item="${typeInvestimentAction}"]`,
      ) as HTMLElement;
      updateHighlight(current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [typeInvestimentAction]);

  const handleButtonClick = (item: (typeof navItems)[number]) => {
    setActive(item);
    setTypeInvestimentAction(item);
    const target = navRef.current?.querySelector(
      `button[data-item="${item}"]`,
    ) as HTMLElement;
    updateHighlight(target);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    updateHighlight(e.currentTarget);
  };

  const handleMouseLeave = () => {
    const activeElement = navRef.current?.querySelector(
      `button[data-item="${active}"]`,
    ) as HTMLElement;
    updateHighlight(activeElement);
  };

  return (
    <nav className="w-full border-b border-muted/30 bg-background/80 px-4 py-3 shadow-sm backdrop-blur-md">
      <div
        ref={navRef}
        className="relative flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-5"
      >
        {navItems.map((item, index) => (
          <Button
            key={index}
            data-item={item}
            onClick={() => handleButtonClick(item)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={
              `relative z-10 h-5 w-full rounded-md bg-transparent px-6 py-2 text-[15px] font-semibold text-black/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-white/50 md:w-auto` +
              (active === item ? " !bg-primary/50 !text-white" : "")
            }
          >
            {item}
          </Button>
        ))}

        <span
          ref={highlightRef}
          className="absolute z-0 hidden rounded-md !bg-primary/50 backdrop-blur-sm transition-all duration-300 ease-out md:block"
          style={{ willChange: "left, width, top, height" }}
        />
      </div>
    </nav>
  );
}
