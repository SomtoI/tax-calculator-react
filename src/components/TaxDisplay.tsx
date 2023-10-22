import { useTax } from "../context/TaxContext";
import { useError } from "../context/ErrorContext";
import "../css/TaxDisplay.css";

function TaxDisplay() {
  const { taxOwed, loading } = useTax();
  const { error } = useError();

  return (
    <div className="tax-display">
      <h3>Tax Results:</h3>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : taxOwed ? (
        <div>
          <p>Total Taxes Owed: ${taxOwed.totalTaxes.toFixed(2)}</p>
          <p>Effective Tax Rate: {taxOwed.effectiveRate.toFixed(2)}%</p>
          <h4>Taxes Owed Per Band:</h4>
          <ul>
            {taxOwed.taxesPerBand.map((band, index) => (
              <li key={index}>
                {`Min: ${band.min}, Max: ${
                  band.max || "∞"
                }, Tax Owed: $${band.tax.toFixed(2)}`}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No tax information available.</p>
      )}
    </div>
  );
}

export default TaxDisplay;
