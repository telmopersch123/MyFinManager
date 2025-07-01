"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useRef } from "react";
interface PlanChangeHandlerProps {
  setIsVisibleAction: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function PlanChangeHandler({
  setIsVisibleAction,
}: PlanChangeHandlerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { user, isLoaded } = useUser();
  const hasPremiumPlan = user?.publicMetadata?.subscriptionPlan === "premium";
  const month =
    searchParams.get("month") ||
    new Date().getMonth().toString().padStart(2, "0");

  const prevHasPremiumPlan = useRef<true | false | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined" || !isLoaded) return;

    const stored = sessionStorage.getItem("prevHasPremiumPlan");
    if (stored === "true") {
      prevHasPremiumPlan.current = true;
    } else if (stored === "false") {
      prevHasPremiumPlan.current = false;
    } else {
      prevHasPremiumPlan.current = undefined;
    }

    // Depois disso, você pode setar o valor atual também
    if (hasPremiumPlan) {
      sessionStorage.setItem("prevHasPremiumPlan", "true");
    } else {
      sessionStorage.setItem("prevHasPremiumPlan", "false");
    }
  }, [isLoaded, hasPremiumPlan]);

  useEffect(() => {
    const checkoutStatus = searchParams.get("checkout");
    const showMessage = sessionStorage.getItem("showMessage");

    if (checkoutStatus === "success") {
      sessionStorage.setItem("showMessage", "true");
      sessionStorage.setItem("prevHasPremiumPlan", "false");
      prevHasPremiumPlan.current = false;
    } else if (showMessage === "true") {
      setIsVisibleAction(true);
      timer.current = setTimeout(() => {
        sessionStorage.removeItem("showMessage");
        setIsVisibleAction(false);
      }, 4000);
    }
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, searchParams, setIsVisibleAction]);

  useEffect(() => {
    if (typeof window === "undefined" || !isLoaded) return;

    if (
      prevHasPremiumPlan.current &&
      !hasPremiumPlan &&
      prevHasPremiumPlan.current !== undefined
    ) {
      const resetQuantity = async () => {
        try {
          await fetch("/api/investment/count", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantidade: 0, resetByPlanChange: true }),
          });
          sessionStorage.setItem("prevHasPremiumPlan", "false");
          window.location.replace(`/?month=${month}`);
        } catch (err) {
          console.error("Erro ao zerar quantidade:", err);
        }
      };
      resetQuantity();
    } else if (
      !prevHasPremiumPlan.current &&
      hasPremiumPlan &&
      prevHasPremiumPlan.current !== undefined
    ) {
      sessionStorage.setItem("prevHasPremiumPlan", "true");
      window.location.replace(`/?month=${month}`);
    }
  });

  return null;
}
