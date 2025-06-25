export function customHandleCapitalChange(
  e: React.ChangeEvent<HTMLInputElement>,
  setValue: React.Dispatch<React.SetStateAction<string>>,
) {
  const value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
  if (value.trim() === "") return "";
  // Converte para número com duas casas decimais
  const numberValue = parseFloat(value) / 100;

  // Formata como moeda brasileira
  const formatted = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue);

  setValue(formatted);
}

export const isValidDate = (dateStr: string) => {
  const [dayStr, monthStr, yearStr] = dateStr.split("/");
  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);
  const date = new Date(year, month - 1, day);
  const ano = new Date().getFullYear();

  if (day > 31 || month > 12 || year > ano + 100) return false;

  if (
    date.getDate() !== day ||
    date.getMonth() !== month - 1 ||
    date.getFullYear() !== year
  )
    return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  if (date < today) return false;

  return true;
};

export function FormatDate(
  e: React.ChangeEvent<HTMLInputElement>,
  setValue: React.Dispatch<React.SetStateAction<string>>,
) {
  const date = e.target.value.replace(/\D/g, "");
  let formatted = "";
  if (date.length <= 2) {
    formatted = date;
  } else if (date.length <= 4) {
    formatted = `${date.slice(0, 2)}/${date.slice(2)}`;
  } else if (date.length <= 8) {
    formatted = `${date.slice(0, 2)}/${date.slice(2, 4)}/${date.slice(4, 8)}`;
  } else {
    formatted = `${date.slice(0, 2)}/${date.slice(2, 4)}/${date.slice(4, 8)}`;
  }
  setValue(formatted);
}
export default function ReutilizavelFormat(catchDate: string) {
  if (!catchDate || isNaN(Date.parse(catchDate))) return "";
  const date = new Date(catchDate);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatToBRL(value: string | number): string {
  const number = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(number)) return "R$ 0,00";

  // Arredonda para duas casas decimais antes de formatar
  const rounded = Math.round(number * 100) / 100;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rounded);
}

export function formatFromFractionToBRL(value: string | number): string {
  const number = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(number)) return "R$ 0,00";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}

export function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;
  const formattedDate = `${day}/${month}/${year}`;

  return `${time} - ${formattedDate} `;
}
