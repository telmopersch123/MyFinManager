export const generateMonths = (
  count: number,
  startYear: number,
  startMonth: number = 1,
) => {
  const months = [];
  const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  for (let i = 0; i < count; i++) {
    const monthIndex = (startMonth - 1 + i) % 12;
    const yearOffset = Math.floor((startMonth - 1 + i) / 12);
    const year = startYear + yearOffset;
    months.push(`${monthNames[monthIndex]} ${year}`);
  }
  return months;
};
