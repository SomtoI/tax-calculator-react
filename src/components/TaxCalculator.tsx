//import { useEffect, useState } from "react";
import Metrics from "./Metrics";
import TaxDisplay from "./TaxDisplay";
import { TaxProvider } from "../context/TaxContext";
import { ErrorProvider } from "../context/ErrorContext";

//import data from "../data/years.json";

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
