import { useEffect, useState } from "react";
import ReutilizavelFormat from "../formatFunctions";

export default function CurrentDate() {
  const currentDate = new Date().toISOString();
  const formattedDate = ReutilizavelFormat(currentDate);

  return <span>{formattedDate}</span>;
}

export function getSelectedIndices(
  length: number,
  deviceType: string,
  maxLength: number = 10,
): number[] {
  const maxValues = deviceType === "pc" ? 10 : deviceType === "tablet" ? 6 : 4;
  if (length > maxLength) {
    const len = length;
    const midPoint = Math.floor(len / 2);
    const baseIndices = [
      0,
      1,
      2, // 3 primeiros
      midPoint - 1,
      midPoint,
      midPoint + 1, // 3 do meio
      len - 3,
      len - 2,
      len - 1, // 3 últimos
    ].filter((idx) => idx >= 0 && idx < len);
    if (deviceType === "pc") {
      return baseIndices.slice(0, maxValues);
    } else if (deviceType === "tablet") {
      return [
        baseIndices[0],
        baseIndices[1],
        baseIndices[3],
        baseIndices[4],
        baseIndices[baseIndices.length - 2],
        baseIndices[baseIndices.length - 1],
      ].filter((idx) => idx !== undefined && idx < len);
    } else {
      return [
        baseIndices[0],
        baseIndices[3],
        baseIndices[4],
        baseIndices[baseIndices.length - 1],
      ].filter((idx) => idx !== undefined && idx < len);
    }
  } else {
    return Array.from({ length: length }, (_, i) => i);
  }
}

export function useDeviceType(): "pc" | "tablet" | "mobile" {
  const [deviceType, setDeviceType] = useState<"pc" | "tablet" | "mobile">(
    "pc",
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setDeviceType("mobile");
      } else if (width <= 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("pc");
      }
    };

    handleResize(); // Chama na inicialização
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize); // Limpeza
    };
  }, []);

  return deviceType;
}
