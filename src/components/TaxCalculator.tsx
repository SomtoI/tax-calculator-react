//import { useEffect, useState } from "react";
import Metrics from "./Metrics";
import TaxDisplay from "./TaxDisplay";
import { TaxProvider } from "../context/TaxContext";
import { ErrorProvider } from "../context/ErrorContext";

//import data from "../data/years.json";

/**
 * The `TaxCalculator` component serves as the main entry point for the tax calculation application.
 * It encapsulates the entire application structure and layout, providing a user interface for users
 * to input their financial data and view tax-related metrics.
 *
 * Calleed in this Application in App.tsx
 */

function TaxCalculator() {
  return (
    <TaxProvider>
      <ErrorProvider>
        <div>
          <h1>Tax Calculator</h1>
          <Metrics />
          <TaxDisplay />
        </div>
      </ErrorProvider>
    </TaxProvider>
  );
}

export default TaxCalculator;
