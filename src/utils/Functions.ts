import { TaxCalculationResult } from "../context/TaxContext";

export type TaxBracket = {
  min: number;
  max: number | undefined; // Use 'undefined' for the last band
  rate: number;
};
/**
 * Calculate the tax owed based on the input salary and the provided tax brackets.
 * Tax calculation logic here:
 * - Tax per band is calculated by multiplying the income in a given bracket by the tax rate.
 * - Maximum of the upper bound and income for that bracket is used.
 * - Function assumes that there is no limit in the last band and that the first band starts at zero.
 *
 * @param {string} income - The annual income to calculate tax for.
 * @param {TaxBracket[]} taxBrackets - An array of tax brackets containing the minimum and maximum income limits and the corresponding tax rates.
 * @returns {TaxCalculationResult} An object containing the total taxes, taxes per band, and the effective tax rate.
 */
export function calculateTax(
  income: string,
  taxBrackets: TaxBracket[]
): TaxCalculationResult {
  // Sort the tax brackets by 'min' values
  taxBrackets.sort((a, b) => a.min - b.min);
  const numIncome = parseFloat(income);

  let totalTaxes = 0;
  const taxesPerBand: {
    min: number;
    max: number | undefined;
    rate: number;
    tax: number;
  }[] = [];
  let remainingIncome = numIncome;

  for (const bracket of taxBrackets) {
    const { min, max, rate } = bracket;

    // If there's no 'max' value (the last bracket), assume it's infinity
    const upperBound = max === undefined ? Infinity : max;

    if (remainingIncome <= 0) {
      // No more income to tax
      break;
    }

    let taxableIncome = 0;
    if (numIncome > min) {
      if (Math.min(upperBound, remainingIncome) === upperBound) {
        taxableIncome = Math.min(upperBound, remainingIncome) - min;
      } else {
        taxableIncome = Math.min(upperBound, remainingIncome);
      }

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

  const effectiveRate = (totalTaxes / numIncome) * 100; // as a percentage

  const calculatedTax: TaxCalculationResult = {
    totalTaxes,
    taxesPerBand,
    effectiveRate,
  };
  return calculatedTax;
}
