import { createContext, useContext, useState, ReactNode } from "react";

export type TaxCalculationResult = {
  totalTaxes: number;
  taxesPerBand: {
    min: number;
    max: number | undefined;
    rate: number;
    tax: number;
  }[];
  effectiveRate: number;
};

type TaxContextType = {
  annualIncome: number;
  taxYear: string;
  taxOwed: TaxCalculationResult | null;
  setAnnualIncome: (income: number) => void;
  setTaxYear: (year: string) => void;
  setTaxOwed: (tax: TaxCalculationResult | null) => void;
};

const TaxContext = createContext<TaxContextType | undefined>(undefined);

export function TaxProvider({ children }: { children: ReactNode }) {
  const [annualIncome, setAnnualIncome] = useState<number>(0);
  const [taxYear, setTaxYear] = useState<string>("");
  const [taxOwed, setTaxOwed] = useState<TaxCalculationResult | null>(null);

  return (
    <TaxContext.Provider
      value={{
        annualIncome,
        taxYear,
        taxOwed,
        setAnnualIncome,
        setTaxYear,
        setTaxOwed,
      }}
    >
      {children}
    </TaxContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTax() {
  const context = useContext(TaxContext);
  if (!context) {
    throw new Error("useTax must be used within a TaxProvider");
  }
  return context;
}
