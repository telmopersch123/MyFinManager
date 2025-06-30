"use client";

import { ClerkProvider, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { AnimatePresence } from "framer-motion";
import { Mulish } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import Sucess from "./_components/sucess";
import "./globals.css";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

function PlanChangeHandler({
  setIsVisible,
}: {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user, isLoaded } = useUser();
  const hasPremiumPlan = user?.publicMetadata?.subscriptionPlan === "premium";
  const [valided, setValided] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("setValided") === "true" ? true : false;
    }
    return false;
  });
  const prevHasPremiumPlan = useRef<boolean | undefined>();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !isLoaded) return;

    if (sessionStorage.getItem("isReloading") === "true") {
      sessionStorage.removeItem("isReloading");
      return;
    }

    const stored = sessionStorage.getItem("prevHasPremiumPlan");
    if (stored !== null) {
      prevHasPremiumPlan.current = stored === "true";
    } else {
      prevHasPremiumPlan.current = hasPremiumPlan;
    }

    if (prevHasPremiumPlan.current && !hasPremiumPlan) {
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
          setIsVisible(false);
          window.location.reload();
        } catch (err) {
          console.error("Erro ao zerar quantidade:", err);
        }
      };
      resetQuantity();
    } else if (!prevHasPremiumPlan.current && hasPremiumPlan && !valided) {
      setIsVisible(false);
      sessionStorage.setItem("setValided", "true");
      window.location.reload();
    } else if (prevHasPremiumPlan.current && hasPremiumPlan && valided) {
      const handleLoad = () => {
        setIsVisible(true);
        timeoutRef.current = setTimeout(() => {
          setIsVisible(false);
          setValided(false);
          sessionStorage.setItem("setValided", "false");
        }, 3000);
      };
      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
        return () => {
          window.removeEventListener("load", handleLoad);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
      }
    }

    if (hasPremiumPlan) {
      sessionStorage.setItem("prevHasPremiumPlan", "true");
    }

    prevHasPremiumPlan.current = hasPremiumPlan;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPremiumPlan, isLoaded]);

  return null;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [setVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme === "light" ? "light" : "dark");
  }, []);
  return (
    <html lang="en">
      <body className={`${mulish.className} dark antialiased`}>
        <ClerkProvider
          appearance={{
            baseTheme: theme === "light" ? undefined : dark,
          }}
        >
          <PlanChangeHandler setIsVisible={setIsVisible} />
          <div className="flex h-full flex-col overflow-x-hidden">
            {children}

            <AnimatePresence>
              <Sucess isVisible={setVisible} />
            </AnimatePresence>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
