import React from "react";
import { render } from "@testing-library/react";
import Footer from "../src/app/components/footer";

// Mocking the Material-UI icons
jest.mock('@mui/icons-material/LinkedIn', () => () => <div data-testid="LinkedInIcon" />);
jest.mock('@mui/icons-material/GitHub', () => () => <div data-testid="GitHubIcon" />);

describe("Footer component", () => {
  it("renders correctly and matches snapshot", () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays the current year and author name", () => {
    const { getByText } = render(<Footer />);
    const currentYear = new Date().getFullYear();
    
    // Match the text using a regular expression that ignores extra spaces
    expect(getByText(new RegExp(`${currentYear}\\s+Aaron Morgan`, 'i'))).toBeInTheDocument();
  });

  it("renders LinkedIn and GitHub icons", () => {
    const { getByTestId } = render(<Footer />);
    // Assert that the icons are rendered
    expect(getByTestId("LinkedInIcon")).toBeInTheDocument();
    expect(getByTestId("GitHubIcon")).toBeInTheDocument();
  });
});