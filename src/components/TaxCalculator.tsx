import { useEffect, useState } from "react";
import Metrics from "./Metrics";
import TaxDisplay from "./TaxDisplay";
import { TaxProvider } from "../context/TaxContext";
import { TaxBracketProvider } from "../context/TaxBracketContext";

import data from "../data/years.json";

function TaxCalculator() {
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    /* Fetch the list of years when the component mounts
     This is to simulate the actual thing. In a real world application,
     The list of years would likely be fetched and prepopulated and not hard-coded.
    */
    setYears(data);
  }, []);

  return (
    <TaxProvider>
      <TaxBracketProvider>
        <div>
          <h1>Tax Calculator</h1>
          <Metrics years={years} />
          <TaxDisplay />
        </div>
      </TaxBracketProvider>
    </TaxProvider>
  );
}

export default TaxCalculator;
