import { render } from "@testing-library/react";
import Header from "../src/app/components/header";

// Mock useTranslations
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key === "TITLE" ? "Mocked Title" : key,
}));

describe("Header component", () => {
  it("renders correctly and matches snapshot", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays the correct title text", () => {
    const { getByText } = render(<Header />);
    // Assert
    expect(getByText("Mocked Title")).toBeInTheDocument();
  });
});
