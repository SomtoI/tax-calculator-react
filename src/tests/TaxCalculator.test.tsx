/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { render, screen } from "@testing-library/react";
import TaxCalculator from "../components/TaxCalculator";

describe("TaxCalculator", () => {
  it("should render the TaxCalculator component", () => {
    const { container } = render(<TaxCalculator />);
    expect(container).toBeInTheDocument();
  });

  it('should display the title "Tax Calculator" and titles for child components', () => {
    render(<TaxCalculator />);
    const titleElement = screen.getByText("Tax Calculator");
    const metricsElement = screen.getByText("Tax Metrics");
    const taxDisplayElement = screen.getByText("Tax Results:");

    expect(metricsElement).toBeInTheDocument();
    expect(taxDisplayElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });
});
