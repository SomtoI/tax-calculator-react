import { useState } from "react";
import { useTax } from "../context/TaxContext";
import { useError } from "../context/ErrorContext";
import { calculateTax, TaxBracket } from "../utils/Functions";
import { handleApiError } from "../utils/errorHandler";
import "../css/Metrics.css";

interface TaxBracketResponse {
  tax_brackets: TaxBracket[]; // Define the structure of tax brackets response from API Call
}

/**
 * Metrics component responsible for inputting annual income and tax year, as well as calculating tax owed.
 * Gets variables and functions from context hooks imported
 */
const Metrics = () => {
  const {
    annualIncome,
    taxYear,
    setAnnualIncome,
    setTaxYear,
    setTaxOwed,
    setLoading,
  } = useTax();
  const { setError } = useError();
  const [incomeError, setIncomeError] = useState<string | null>(null);
  const [taxYearError, setTaxYearError] = useState<string | null>(null);

  /**
   * Handles the calculation of tax owed based on the input values and the fetched tax brackets.
   */
  const handleCalculateTax = async () => {
    try {
      // Reset states before making the API request
      setError(null);
      setTaxOwed(null);
      setLoading(true);

      const response = await fetch(`/tax-calculator/tax-year/${taxYear}`);

      if (!response.ok) {
        const error = handleApiError(response);
        setError(error[0].message);
        setLoading(false);
        return;
      }

      const data: TaxBracketResponse =
        (await response.json()) as TaxBracketResponse;

      if (!Array.isArray(data.tax_brackets)) {
        setError("Something went wrong");
        throw new Error("Unexpected data structure in API response");
      }

      // Calculate tax and set the result
      const calculatedTax = calculateTax(
        Number(annualIncome),
        data.tax_brackets
      );

      setLoading(false);
      setTaxOwed(calculatedTax);
    } catch (error: unknown) {
      console.error("Error in API request: ", (error as Error).message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Tax Metrics</h2>
      <form className="tax-form">
        <div className="input-container">
          <label htmlFor="annualIncomeInput">Annual Income:</label>
          <input
            id="annualIncomeInput"
            className={incomeError ? "error" : ""}
            type="text"
            value={annualIncome}
            onChange={(e) => {
              const value = e.target.value;

              // Checking Input is a valid positive number
              if (/^\d+(\.\d*)?$/.test(value) && parseFloat(value) > 0) {
                setAnnualIncome(parseFloat(value));
                setIncomeError(null);
              } else {
                setIncomeError("Annual income must be a positive number.");
              }
            }}
          />
        </div>
        <div className="input-container">
          <label htmlFor="taxYearInput">Tax Year:</label>
          <input
            id="taxYearInput"
            className={taxYearError ? "error" : ""}
            type="text"
            value={taxYear}
            onChange={(e) => {
              const value = e.target.value;

              //regex to test value input only contains digits
              if (
                value === "" ||
                (/^\d+$/.test(value) && parseInt(value) > 0)
              ) {
                setTaxYear(value);
                setTaxYearError(null);
              } else {
                setTaxYearError("Tax year must be a positive Whole Number.");
              }
            }}
          />
        </div>
        <button
          type="button"
          onClick={handleCalculateTax}
          disabled={
            incomeError !== null || taxYearError !== null || taxYear === ""
          }
        >
          Calculate Tax Owed
        </button>
      </form>
      {incomeError && <p className="error-message">{incomeError}</p>}
      {taxYearError && <p className="error-message">{taxYearError}</p>}
    </div>
  );
};

export default Metrics;
