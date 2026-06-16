export function parseUserDocuments(
  text: string
): { valids: string[]; invalids: number } {
  const lines = text
    .split("\n")
    .map((l) => l.trim().split(",")[0].trim())
    .filter((l) => l.length > 0);

  const valids = lines.filter((l) => /^\d+$/.test(l));
  return { valids, invalids: lines.length - valids.length };
}
