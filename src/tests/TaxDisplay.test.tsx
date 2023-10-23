/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { render, screen } from "@testing-library/react";
import TaxDisplay from "../components/TaxDisplay";
import { TaxProvider } from "../context/TaxContext";
import { ErrorProvider } from "../context/ErrorContext";

describe("TaxDisplay", () => {
  /*
  it("should render loading message when loading is true", () => {
    const { container } = render(
      <TaxProvider value={{ loading: true }}>
        <ErrorProvider>
          <TaxDisplay />
        </ErrorProvider>
      </TaxProvider>
    );

    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should render error message when error is present", () => {
    const { container } = render(
      <TaxProvider>
        <ErrorProvider value={{ error: "An error occurred." }}>
          <TaxDisplay />
        </ErrorProvider>
      </TaxProvider>
    );

    const errorMessage = screen.getByText("An error occurred.");
    expect(errorMessage).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should render tax information when taxOwed is provided", () => {
    const taxOwed = {
      totalTaxes: 5000.5,
      effectiveRate: 10.75,
      taxesPerBand: [
        { min: 0, max: 50000, rate: 0.1, tax: 5000 },
        { min: 50000, max: undefined, rate: 0.2, tax: 500.5 },
      ],
    };

    const { container } = render(
      <TaxProvider value={{ taxOwed }}>
        <ErrorProvider>
          <TaxDisplay />
        </ErrorProvider>
      </TaxProvider>
    );

    const totalTaxes = screen.getByText("Total Taxes Owed: $5000.50");
    const effectiveRate = screen.getByText("Effective Tax Rate: 10.75%");
    const minMaxTax = screen.getAllByText(/Min:/);
    expect(totalTaxes).toBeInTheDocument();
    expect(effectiveRate).toBeInTheDocument();
    expect(minMaxTax.length).toBe(2);
    expect(container).toMatchSnapshot();
  });
*/
  it("should render 'No tax information available.' when taxOwed is not provided", () => {
    const { container } = render(
      <TaxProvider>
        <ErrorProvider>
          <TaxDisplay />
        </ErrorProvider>
      </TaxProvider>
    );

    const noInfoMessage = screen.getByText("No tax information available.");
    expect(noInfoMessage).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
