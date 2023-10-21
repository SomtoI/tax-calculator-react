import { createContext, useContext, ReactNode, useState } from "react";

export interface TaxBracket {
  min: number;
  max?: number;
  rate: number;
}

export interface TaxBracketContextType {
  taxBrackets: TaxBracket[];
  setTaxBrackets: (brackets: TaxBracket[]) => void;
}

const TaxBracketContext = createContext<TaxBracketContextType | undefined>(
  undefined
);

export function TaxBracketProvider({ children }: { children: ReactNode }) {
  const [taxBrackets, setTaxBrackets] = useState<TaxBracket[]>([]);

  return (
    <TaxBracketContext.Provider value={{ taxBrackets, setTaxBrackets }}>
      {children}
    </TaxBracketContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTaxBracket() {
  const context = useContext(TaxBracketContext);
  if (!context) {
    throw new Error("useTaxBracket must be used within a TaxBracketProvider");
  }
  return context;
}
