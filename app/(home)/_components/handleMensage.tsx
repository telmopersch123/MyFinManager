"use client";
import { AlertManager } from "@/app/transactions/_components/components/alert-manager";
import { useState } from "react";

export const useHandleMensage = () => {
  const [alertTrigger, setAlertTrigger] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("default");

  const handleFunctionAlert = () => {
    setAlertTrigger((prev) => prev + 1);
  };
  const handleMessage = (messagen: string, color: string) => {
    setAlertMessage(messagen);
    setAlertColor(color);
  };

  const AlertComponent = (
    <AlertManager
      triggerAlert={alertTrigger}
      message={alertMessage}
      alertColor={alertColor}
    />
  );

  return {
    handleFunctionAlert,
    handleMessage,
    AlertComponent,
  };
};
