import { render, screen } from "@testing-library/react";
import Home from "../src/app/[locale]/page";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders without crashing", () => {
    render(<Home />);
    expect(screen.getByRole("button", { name: /more info/i })).toBeInTheDocument();
  });
});
