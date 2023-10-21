import { useEffect } from "react";
import { useTax } from "../context/TaxContext";
import { useTaxBracket } from "../context/TaxBracketContext";
import { calculateTax, TaxBracket } from "../utils/Functions";

interface MetricsProps {
  years: string[];
}

interface TaxBracketResponse {
  tax_brackets: TaxBracket[]; // Define the structure of your tax brackets
}

const Metrics = ({ years }: MetricsProps) => {
  const { annualIncome, taxYear, setAnnualIncome, setTaxYear, setTaxOwed } =
    useTax();
  const { taxBrackets, setTaxBrackets } = useTaxBracket();

  useEffect(() => {
    // Fetch the tax brackets data based on the selected year when year changes
    const fetchTaxBrackets = async () => {
      try {
        const response = await fetch(`/tax-calculator/`);
        //tax-year/${taxYear}
        if (response.ok) {
          const data: TaxBracketResponse =
            (await response.json()) as TaxBracketResponse;
          if (Array.isArray(data.tax_brackets)) {
            // Assuming that the API response contains an array of tax brackets
            setTaxBrackets(data.tax_brackets);
          } else {
            // Handle unexpected data structure
            console.error("Unexpected data structure in API response");
          }
        } else {
          // Handle non-OK response
          console.error("API request failed with status:", response.status);
        }
      } catch (error) {
        // Handle API request errors
        console.error("Error while fetching tax brackets:", error);
      }
    };

    fetchTaxBrackets().catch((error) => {
      // Handle any uncaught promise rejections here
      console.error("Uncaught promise rejection:", error);
    }); // Fetch when the component mounts and when year changes
  }, [taxYear, setTaxBrackets]);

  const handleCalculateTax = () => {
    // Calculate the tax owed based on the input salary and the fetched tax brackets
    // Implement your tax calculation logic here
    // Set the result in the state variable taxOwed
    const calculatedTax = calculateTax(
      annualIncome,
      taxBrackets as TaxBracket[]
    );
    setTaxOwed(calculatedTax);
  };

  return (
    <div>
      <h2>Tax Metrics</h2>
      <form>
        <div>
          <label>Annual Income:</label>
          <input
            type="number"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Tax Year:</label>
          <select value={taxYear} onChange={(e) => setTaxYear(e.target.value)}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={handleCalculateTax}>
          Calculate Tax Owed
        </button>
      </form>
    </div>
  );
};

export default Metrics;
