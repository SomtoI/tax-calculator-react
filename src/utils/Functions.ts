import { TaxCalculationResult } from "../context/TaxContext";

export type TaxBracket = {
  min: number;
  max: number | undefined; // Use 'undefined' for the last bracket
  rate: number;
};

export function calculateTax(
  income: number,
  taxBrackets: TaxBracket[]
): TaxCalculationResult {
  // Sort the tax brackets by 'min' values
  taxBrackets.sort((a, b) => a.min - b.min);

  let totalTaxes = 0;
  const taxesPerBand: {
    min: number;
    max: number | undefined;
    rate: number;
    tax: number;
  }[] = [];
  let remainingIncome = income;

  for (const bracket of taxBrackets) {
    const { min, max, rate } = bracket;

    // If there's no 'max' value (the last bracket), assume it's infinity
    const upperBound = max === undefined ? Infinity : max;

    if (remainingIncome <= 0) {
      // No more income to tax
      break;
    }

    if (income > min) {
      const taxableIncome = Math.min(upperBound, remainingIncome) - min;
      const taxForBand = taxableIncome * rate;
      totalTaxes += taxForBand;
      taxesPerBand.push({
        min,
        max,
        rate,
        tax: taxForBand,
      });
      remainingIncome -= taxableIncome;
    }
  }

  const effectiveRate = (totalTaxes / income) * 100; // as a percentage

  const calculatedTax: TaxCalculationResult = {
    totalTaxes,
    taxesPerBand,
    effectiveRate,
  };
  console.log(calculatedTax);
  return calculatedTax;
}
