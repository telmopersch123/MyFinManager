export function getMonthDateRange(year: number, month: number) {
  const start = new Date(year, month - 1, 1); // Primeiro dia do mês
  const end = new Date(year, month, 1); // Primeiro dia do mês seguinte

  return { start, end };
}
