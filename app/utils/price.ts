export function parsePriceToCents(input: string | number | undefined): number {
  if (input === undefined || input === null) return 0;
  const raw = String(input).replace(/[^\d.]/g, "");
  const n = parseFloat(raw || "0");
  const cents = Math.round(n * 100);
  return Number.isFinite(cents) ? cents : 0;
}
