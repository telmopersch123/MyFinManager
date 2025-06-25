"use client";

import AlertComponent from "@/app/(home)/_components/alert";
import { useEffect, useRef, useState } from "react";

interface AlertManagerProps {
  triggerAlert: number;
  message: string;
  alertColor: string;
}
export function AlertManager({
  triggerAlert,
  message,
  alertColor,
}: AlertManagerProps) {
  const [alertVisible, setAlertVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (triggerAlert > 0) {
      setAlertVisible(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    }
  }, [triggerAlert]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <AlertComponent
      isVisible={alertVisible}
      message={message}
      alertColor={alertColor}
    />
  );
}
