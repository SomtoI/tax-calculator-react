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
    loading,
    setAnnualIncome,
    setTaxYear,
    setTaxOwed,
    setLoading,
  } = useTax();
  const { setError } = useError();
  const [incomeError, setIncomeError] = useState<string | null>(null);
  const [taxYearError, setTaxYearError] = useState<string | null>(null);
  //const [inputIncome, setInputIncome] = useState<string | null>(null);

  /**
   * Handles the calculation of tax owed based on the input values and the fetched tax brackets.
   */
  const handleCalculateTax = () => {
    setError(null);
    setTaxOwed(null);
    setLoading(true);

    fetch(`/tax-calculator/tax-year/${taxYear}`)
      .then(async (response) => {
        if (!response.ok) {
          /**
           * Error Handling to handle multiple error statuses and provide custom error message
           * @param response response message with code returned from call
           * Originally thought to handle 500 code with retry to a certain number
           * Could use asynce.retry, or write custom retry handler, but kept simple for assessment purposes
           */
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
        const calculatedTax = calculateTax(annualIncome, data.tax_brackets);

        setLoading(false);
        setTaxOwed(calculatedTax);
      })
      .catch((error) => {
        console.error("Error in API request: ", (error as Error).message);
        setLoading(false);
      });
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
              setAnnualIncome(value);
              // Checking Input is a valid positive number
              if (value === "" || parseFloat(value) > 0) {
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
              setTaxYear(value);
              //regex to test value input only contains digits
              if (
                value === "" ||
                (/^\d+$/.test(value) && parseInt(value) > 0)
              ) {
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
            loading === true ||
            incomeError !== null ||
            taxYearError !== null ||
            taxYear === ""
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
