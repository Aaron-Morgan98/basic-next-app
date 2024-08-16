import MoreInfo from "../src/app/[locale]/moreInfo/[id]/page";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

// Mock next hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: any) => key,
}));

describe("MoreInfo Page", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

// Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders page with data from URL Params", async () => {
    // Set up mock query parameters
    const queryParams = new URLSearchParams({
      id: "1",
      name: encodeURIComponent("Test Item 1"),
      data: encodeURIComponent(JSON.stringify({ key1: "value1", key2: "value2" })),
    });

    // Mock window.location.search to simulate URL query parameters
    //TODO: error on window.location but tests still pass?
    delete window.location;
    window.location = { search: queryParams.toString() } as any;


    render(<MoreInfo />);

    // Check if the ID and name are rendered correctly
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("NAME")).toBeInTheDocument();
    expect(screen.getByText("Test Item 1")).toBeInTheDocument();

    // Check if the data is rendered correctly
    expect(screen.getByText("DETAILS")).toBeInTheDocument();
    expect(screen.getByText("key1")).toBeInTheDocument();
    expect(screen.getByText("value1")).toBeInTheDocument();
    expect(screen.getByText("key2")).toBeInTheDocument();
    expect(screen.getByText("value2")).toBeInTheDocument();
  });

  test("handles back button click", async () => {
    render(<MoreInfo />);

    // Click the Back button
    const backButton = screen.getByText("BACK_BUTTON");
    fireEvent.click(backButton);

    // Verify that useRouter's push method was called and sends the user to the correct page (Home)
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
  
});
