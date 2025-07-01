"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Mulish } from "next/font/google";

import { AnimatePresence } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import PlanChangeHandler from "./(home)/_components/PlanChangeHandler";
import Sucess from "./_components/sucess";
import "./globals.css";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

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
          <Suspense>
            <PlanChangeHandler setIsVisibleAction={setIsVisible} />
          </Suspense>
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
