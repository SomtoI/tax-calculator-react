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
  annualIncome: string;
  taxYear: string;
  taxOwed: TaxCalculationResult | null;
  loading: boolean;
  setAnnualIncome: (income: string) => void;
  setTaxYear: (year: string) => void;
  setTaxOwed: (tax: TaxCalculationResult | null) => void;
  setLoading: (isLoading: boolean) => void;
};

const TaxContext = createContext<TaxContextType | undefined>(undefined);

export function TaxProvider({ children }: { children: ReactNode }) {
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [taxYear, setTaxYear] = useState<string>("");
  const [taxOwed, setTaxOwed] = useState<TaxCalculationResult | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <TaxContext.Provider
      value={{
        annualIncome,
        taxYear,
        taxOwed,
        loading,
        setAnnualIncome,
        setTaxYear,
        setTaxOwed,
        setLoading,
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
