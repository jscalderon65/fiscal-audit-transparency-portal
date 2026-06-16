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
