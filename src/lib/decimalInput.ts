/** Accept one decimal separator, including unfinished values while typing. */
export function isDecimalInput(value: string): boolean {
  return /^\d*(?:[.,]\d*)?$/.test(value);
}

/** Parse the full value without changing the separator displayed in the field. */
export function parseDecimalInput(value: string): number {
  if (!isDecimalInput(value) || !/\d/.test(value)) return NaN;

  const number = Number(value.replace(',', '.'));
  return Number.isFinite(number) ? number : NaN;
}
