export function parseUserDocuments(
  text: string
): { valids: string[]; invalids: number } {
  const lines = text
    .split("\n")
    .map((line) => line.trim().split(",")[0].trim())
    .filter((line) => line.length > 0);

  const valids = lines.filter((line) => /^\d+$/.test(line));
  return { valids, invalids: lines.length - valids.length };
}

export function formatCurrency(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  const number = parseInt(digits, 10);
  return "$ " + number.toLocaleString("es-CO");
}

const SPANISH_MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];

export function validateMonth(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.length < 3) return "El mes debe tener al menos 3 caracteres";

  const parts = trimmed.split(/\s+/);
  if (parts.length !== 2) return 'Formato inválido. Debe ser "Mes Año" (ej: Marzo 2026)';

  const [monthPart, yearPart] = parts;

  if (!/^\d{4}$/.test(yearPart)) return "El año debe tener 4 dígitos (ej: 2026)";

  const yearNumber = parseInt(yearPart, 10);
  if (yearNumber < 2000 || yearNumber > 2100) return "El año debe estar entre 2000 y 2100";

  const isSpanishMonth = SPANISH_MONTHS.some(
    (m) => m.toLowerCase() === monthPart.toLowerCase()
  );
  if (!isSpanishMonth) return "Mes no válido. Usa español (ej: Marzo, marzo, mar)";

  return null;
}
