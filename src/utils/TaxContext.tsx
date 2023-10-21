
import { createContext, useContext, useState, ReactNode } from 'react';

type TaxContextType = {
  annualIncome: number;
  taxYear: string;
  setAnnualIncome: (income: number) => void;
  setTaxYear: (year: string) => void;
};

const TaxContext = createContext<TaxContextType | undefined>(undefined);

export function TaxProvider({ children }: { children: ReactNode }) {
  const [annualIncome, setAnnualIncome] = useState<number>(0);
  const [taxYear, setTaxYear] = useState<string>('2022');

  return (
    <TaxContext.Provider value={{ annualIncome, taxYear, setAnnualIncome, setTaxYear }}>
      {children}
    </TaxContext.Provider>
  );
}

export function useTax() {
  const context = useContext(TaxContext);
  if (!context) {
    throw new Error('useTax must be used within a TaxProvider');
  }
  return context;
}
