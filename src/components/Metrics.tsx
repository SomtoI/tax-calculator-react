import React from 'react';
import { useTax } from '../utils/TaxContext';

interface MetricsProps {
    years: string[];
    //onComparisonValueChange: (value: string) => void;
}

const Metrics = ({ years }: MetricsProps) => {
    const { annualIncome, taxYear, setAnnualIncome, setTaxYear } = useTax();

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnualIncome(Number(e.target.value));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTaxYear(e.target.value);
  };

  
}

export default Metrics;

