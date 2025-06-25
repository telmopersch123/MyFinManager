"use client";

import { useEffect, useState } from "react";
import InvestmentNav from "../_components/investment-nav";
import { SimuladorAcoes } from "../acoesComponent/page";

import {
  AcoesInputs,
  BitcoinInputs,
  FIIsInputs,
  InvestimentosInputs,
  RelatorioInvestimento,
} from "@/app/(home)/_actions/generate-ai-report/interfaces";
import { useUser } from "@clerk/nextjs";
import { SimuladorFIIs } from "../FIISComponent/page";
import { SimuladorInvestimentos } from "../InvestimentosFixos/page";
import { SimuladorBitcoin } from "../criptoComponent/page";

export type InvestimentProps = {
  month: string;
};

export default function InvestimentGeral({ month }: InvestimentProps) {
  const { user } = useUser();
  const hasPremiumPlan = user?.publicMetadata?.subscriptionPlan === "premium";

  const [typeInvestimentAction, setTypeInvestimentAction] = useState<
    "Investimentos Fixos" | "Ações" | "Fundos Imobiliarios" | "CriptoMoedas"
  >("Investimentos Fixos");
  const [tipoInvestimento, setTipoInvestimento] = useState<
    "poupanca" | "tesouro" | "cdb"
  >("poupanca");
  const [investiment, setInvestment] = useState<RelatorioInvestimento[]>([]);
  const [investimentosInputs, setInvestimentosInputs] = useState<
    InvestimentosInputs[]
  >([]);
  const [acoesInputs, setAcoesInputs] = useState<AcoesInputs[]>([]);
  const [fiisInputs, setFiisInputs] = useState<FIIsInputs[]>([]);
  const [bitcoinInputs, setBitcoinInputs] = useState<BitcoinInputs[]>([]);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [update, setUpdate] = useState<RelatorioInvestimento[]>([]);

  useEffect(() => {
    async function fetchQuantity() {
      try {
        const res = await fetch("/api/investment/count");
        const data = await res.json();
        setQuantity(data.quantidade);
      } catch (err) {
        console.log(err);
      }
    }
    fetchQuantity();
  }, []);

  useEffect(() => {
    if (quantity === null) return;

    async function salvarQuantidade() {
      try {
        await fetch("/api/investment/count", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantidade: quantity,
            resetByPlanChange: true,
          }),
        });
      } catch (err) {
        console.error("Erro ao salvar quantidade:", err);
      }
    }
    salvarQuantidade();
  }, [quantity]);

  useEffect(() => {
    setInvestment([]);
    setInvestimentosInputs([]);
    setAcoesInputs([]);
    setFiisInputs([]);
    setBitcoinInputs([]);
  }, [typeInvestimentAction, tipoInvestimento]);

  return (
    <div>
      <InvestmentNav
        typeInvestimentAction={typeInvestimentAction}
        setTypeInvestimentAction={setTypeInvestimentAction}
      />
      {typeInvestimentAction === "Investimentos Fixos" ? (
        <SimuladorInvestimentos
          month={month}
          hasPremiumPlan={hasPremiumPlan}
          setInvestmentAction={setInvestment}
          investiment={investiment}
          setInvestimentosInputsAction={setInvestimentosInputs}
          investimentosInputs={investimentosInputs}
          tipoInvestimento={tipoInvestimento}
          setTipoInvestimentoAction={setTipoInvestimento}
          setQuantityAction={setQuantity}
          quantity={quantity}
          setUpdateAction={setUpdate}
          update={update}
        />
      ) : typeInvestimentAction === "Ações" ? (
        <SimuladorAcoes
          month={month}
          hasPremiumPlan={hasPremiumPlan}
          setInvestmentAction={setInvestment}
          investiment={investiment}
          setAcoesInputsAction={setAcoesInputs}
          acoesInputs={acoesInputs}
          setQuantityAction={setQuantity}
          quantity={quantity}
          setUpdateAction={setUpdate}
          update={update}
        />
      ) : typeInvestimentAction === "Fundos Imobiliarios" ? (
        <SimuladorFIIs
          month={month}
          hasPremiumPlan={hasPremiumPlan}
          setInvestmentAction={setInvestment}
          investiment={investiment}
          setFiisInputsAction={setFiisInputs}
          fiisInputs={fiisInputs}
          setQuantityAction={setQuantity}
          quantity={quantity}
          setUpdateAction={setUpdate}
          update={update}
        />
      ) : typeInvestimentAction === "CriptoMoedas" ? (
        <SimuladorBitcoin
          month={month}
          hasPremiumPlan={hasPremiumPlan}
          setInvestmentAction={setInvestment}
          investiment={investiment}
          setBitcoinInputsAction={setBitcoinInputs}
          bitcoinInputs={bitcoinInputs}
          setQuantityAction={setQuantity}
          quantity={quantity}
          setUpdateAction={setUpdate}
          update={update}
        />
      ) : null}
    </div>
  );
}
