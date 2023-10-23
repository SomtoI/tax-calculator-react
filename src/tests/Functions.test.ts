import { calculateTax, TaxBracket } from "../utils/Functions";

// Test case for a single tax bracket
test("calculates tax correctly for a single tax bracket", () => {
  const income = 50000;
  const taxBrackets: TaxBracket[] = [{ min: 0, max: undefined, rate: 0.2 }];
  const taxResult = calculateTax(income, taxBrackets);
  expect(taxResult.totalTaxes).toBe(10000);
  expect(taxResult.taxesPerBand).toHaveLength(1);
  expect(taxResult.effectiveRate).toBe(20);
});

// Test case for multiple tax brackets
test("calculates tax correctly for multiple tax brackets", () => {
  const income = 75000;
  const taxBrackets: TaxBracket[] = [
    { min: 0, max: 50000, rate: 0.2 },
    { min: 50000, max: undefined, rate: 0.3 },
  ];
  const taxResult = calculateTax(income, taxBrackets);
  expect(taxResult.totalTaxes).toBe(17500);
  expect(taxResult.taxesPerBand).toHaveLength(2);
  expect(taxResult.effectiveRate.toFixed(2)).toBe("23.33");
});

// Test case for income below the first bracket
test("calculates tax correctly for income below the first bracket", () => {
  const income = 25000;
  const taxBrackets: TaxBracket[] = [
    { min: 30000, max: undefined, rate: 0.25 },
    { min: 50000, max: undefined, rate: 0.35 },
  ];
  const taxResult = calculateTax(income, taxBrackets);
  expect(taxResult.totalTaxes).toBe(0);
  expect(taxResult.taxesPerBand).toHaveLength(0);
  expect(taxResult.effectiveRate).toBe(0);
});

// Tests to check value in each band is correct

const taxBrackets: TaxBracket[] = [
  { min: 0, max: 20000, rate: 0.1 },
  { min: 20000, max: 50000, rate: 0.2 },
  { min: 50000, max: undefined, rate: 0.3 },
];

test("calculates tax owed for income in the first bracket", () => {
  const income = 15000;
  const taxResult = calculateTax(income, taxBrackets);
  // Assert that only the tax for the first bracket is returned
  const firstBandTax = taxResult.taxesPerBand.find(
    (band) => band.min === 0 && band.max === 20000
  );
  expect(firstBandTax).toBeDefined();
  expect(firstBandTax?.tax).toBe(1500);
});

test("calculates tax owed for income in the middle bracket", () => {
  const income = 35000;
  const taxResult = calculateTax(income, taxBrackets);
  // Assert that only the tax for the second bracket is returned
  const secondBandTax = taxResult.taxesPerBand.find(
    (band) => band.min === 20000 && band.max === 50000
  );
  expect(secondBandTax).toBeDefined();
  expect(secondBandTax?.tax).toBe(3000);
});

test("calculates tax owed for income in the highest bracket", () => {
  const income = 75000;
  const taxResult = calculateTax(income, taxBrackets);
  // Assert that only the tax for the third bracket is returned
  const thirdBandTax = taxResult.taxesPerBand.find(
    (band) => band.min === 50000
  );
  expect(thirdBandTax).toBeDefined();
  expect(thirdBandTax?.tax).toBe(7500);
});
