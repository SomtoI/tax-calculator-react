/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { render, screen, fireEvent } from "@testing-library/react";
import Metrics from "../components/Metrics";
import { TaxProvider } from "../context/TaxContext";
import { ErrorProvider } from "../context/ErrorContext";
//import { calculateTax } from "../utils/Functions";

describe("Metrics", () => {
  // Helper function to render Metrics with context providers
  const renderMetrics = () => {
    render(
      <TaxProvider>
        <ErrorProvider>
          <Metrics />
        </ErrorProvider>
      </TaxProvider>
    );
  };

  it("should render the Metrics component", () => {
    renderMetrics();
    expect(screen.getByText("Tax Metrics")).toBeInTheDocument();
  });

  it("should render inputs for annual income and tax year", () => {
    renderMetrics();
    expect(screen.getByLabelText("Annual Income:")).toBeInTheDocument();
    expect(screen.getByLabelText("Tax Year:")).toBeInTheDocument();
  });

  it("should update annual income state when input value changes", () => {
    renderMetrics();
    const annualIncomeInput = screen.getByLabelText("Annual Income:");
    fireEvent.change(annualIncomeInput, { target: { value: "50000" } });
    expect(annualIncomeInput).toHaveValue("50000");
  });

  it("should display an error message for invalid annual income input", () => {
    renderMetrics();
    const annualIncomeInput = screen.getByLabelText("Annual Income:");
    fireEvent.change(annualIncomeInput, { target: { value: "-1000" } });
    expect(
      screen.getByText("Annual income must be a positive number.")
    ).toBeInTheDocument();
  });

  it("should update tax year state when input value changes", () => {
    renderMetrics();
    const taxYearInput = screen.getByLabelText("Tax Year:");
    fireEvent.change(taxYearInput, { target: { value: "2023" } });
    expect(taxYearInput).toHaveValue("2023");
  });

  it("should display an error message for invalid tax year input", () => {
    renderMetrics();
    const taxYearInput = screen.getByLabelText("Tax Year:");
    fireEvent.change(taxYearInput, { target: { value: "invalid" } });
    expect(
      screen.getByText("Tax year must be a positive Whole Number.")
    ).toBeInTheDocument();
  });

  it('should call handleCalculateTax when "Calculate Tax Owed" button is clicked', () => {
    const handleCalculateTax = jest.fn();
    renderMetrics();
    const calculateButton = screen.getByText("Calculate Tax Owed");
    calculateButton.onclick = handleCalculateTax;
    fireEvent.click(calculateButton);
    expect(handleCalculateTax).toHaveBeenCalled();
  });

  // it('should update the taxOwed state when "Calculate Tax Owed" button is clicked', () => {
  //   // Mock the context functions
  //   const setTaxOwed = jest.fn();
  //   const setLoading = jest.fn();
  //   const setTaxYear = jest.fn();
  //   const setAnnualIncome = jest.fn();
  //   const setError = jest.fn();

  //   render(
  //     <TaxProvider
  //       value={{
  //         annualIncome: 60000,
  //         taxYear: "2023",
  //         setTaxOwed,
  //         setLoading,
  //         setTaxYear,
  //         setAnnualIncome,
  //       }}
  //     >
  //       <ErrorProvider value={{ setError }}>
  //         <Metrics />
  //       </ErrorProvider>
  //     </TaxProvider>
  //   );

  //   const calculateButton = screen.getByText("Calculate Tax Owed");
  //   fireEvent.click(calculateButton);

  //   // Assert that the setTaxOwed function is called with the expected tax result
  //   const expectedTax = calculateTax(60000, [
  //     { min: 0, max: 50000, rate: 0.1 },
  //   ]);
  //   expect(setTaxOwed).toHaveBeenCalledWith(expectedTax);
  // });

  it('should disable the "Calculate Tax Owed" button when input is invalid', () => {
    renderMetrics();
    const annualIncomeInput = screen.getByLabelText("Annual Income:");
    const taxYearInput = screen.getByLabelText("Tax Year:");
    const calculateButton = screen.getByText("Calculate Tax Owed");

    // Set invalid input values
    fireEvent.change(annualIncomeInput, { target: { value: "-1000" } });
    fireEvent.change(taxYearInput, { target: { value: "invalid" } });

    // Assert that the button is disabled
    expect(calculateButton).toBeDisabled();
  });

  it('should enable the "Calculate Tax Owed" button when input is valid', () => {
    renderMetrics();
    const annualIncomeInput = screen.getByLabelText("Annual Income:");
    const taxYearInput = screen.getByLabelText("Tax Year:");
    const calculateButton = screen.getByText("Calculate Tax Owed");

    // Set valid input values
    fireEvent.change(annualIncomeInput, { target: { value: "50000" } });
    fireEvent.change(taxYearInput, { target: { value: "2023" } });

    // Assert that the button is enabled
    expect(calculateButton).not.toBeDisabled();
  });

  // it("should handle a failed API response", () => {
  //   // Mock a failed API response
  //   global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404 });

  //   // Mock the context functions
  //   const setTaxOwed = jest.fn();
  //   const setLoading = jest.fn();
  //   const setTaxYear = jest.fn();
  //   const setAnnualIncome = jest.fn();
  //   const setError = jest.fn();

  //   render(
  //     <TaxProvider
  //       value={{
  //         annualIncome: 60000,
  //         taxYear: "2023",
  //         setTaxOwed,
  //         setLoading,
  //         setTaxYear,
  //         setAnnualIncome,
  //       }}
  //     >
  //       <ErrorProvider value={{ setError }}>
  //         <Metrics />
  //       </ErrorProvider>
  //     </TaxProvider>
  //   );

  //   const calculateButton = screen.getByText("Calculate Tax Owed");
  //   fireEvent.click(calculateButton);

  //   // Assert that the setError function is called with the appropriate error message
  //   expect(setError).toHaveBeenCalledWith("Year not found");
  // });
});
