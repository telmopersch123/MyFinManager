export function formatarNumeroVirgulas(input: string): string {
  const apenasNumeros = input.replace(/\D/g, "");
  if (apenasNumeros.length > 4) {
    return "";
  }
  if (apenasNumeros.length >= 3) {
    return apenasNumeros.slice(0, 2) + "," + apenasNumeros.slice(2);
  }
  return apenasNumeros;
}

export function formatarNumeroVirgulasOne(input: string): string {
  const apenasNumeros = input.replace(/\D/g, "");
  if (apenasNumeros.length > 3) {
    return "";
  }
  if (apenasNumeros.length >= 2) {
    return apenasNumeros.slice(0, 1) + "," + apenasNumeros.slice(1);
  }
  return apenasNumeros;
}

export function formatarNumero(input: string): string {
  const apenasNumeros = input.replace(/\D/g, "");
  if (apenasNumeros.length > 5) {
    return "";
  }
  if (apenasNumeros.length >= 5) {
    return (
      apenasNumeros.slice(0, 2) +
      apenasNumeros.slice(-1) +
      "," +
      apenasNumeros.slice(2)
    ).slice(0, -1);
  }
  if (apenasNumeros.length >= 3) {
    return apenasNumeros.slice(0, 2) + "," + apenasNumeros.slice(2);
  }

  return apenasNumeros;
}

export function notCaracteres(input: string): string {
  return input.replace(/\D/g, "");
}
