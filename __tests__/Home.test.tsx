import Home from "../src/app/[locale]/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import axios from "axios";

// Mocks for next.js hooks and axios to ensure jest can properly mount them
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: any) => key,
  useLocale: () => 'en',  // TODO: set up mocks for other languages to test
}));

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Home Page", () => {
  // Mock data to be returned by axios
  const mockData = [
    { id: "1", name: "Test Item 1", data: { info: "Some data 1" } },
    { id: "2", name: "Test Item 2", data: { info: "Some data 2" } },
  ];
// Mock axios get request to return mockData
// Mock useRouter to provide a mock implementation for push method
  beforeEach(() => {
    
    mockedAxios.get.mockResolvedValue({ data: mockData });
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });
    // Clear all mocks after each test to avoid interference between tests
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Home component and fetches data", async () => {
    render(<Home />);

    // Check if DataGrid is rendered
    expect(screen.getByRole("grid")).toBeInTheDocument();

    await waitFor(() => {
      // Verify that axios get request was made with the correct URL
      expect(mockedAxios.get).toHaveBeenCalledWith("https://api.restful-api.dev/objects");
      // Verify that each item from mockData is displayed in the document
      mockData.forEach((item) => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
      });
    });
  });

  test("selects a row and navigates to more info page", async () => {
    render(<Home />);

    // Wait for axios get request to be made
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled();
    });

    // Wait for the checkboxes to be rendered and log the number of checkboxes found
    await waitFor(() => {
      const checkboxes = screen.getAllByRole("checkbox");
      console.log("Checkboxes found: ", checkboxes.length);
      expect(checkboxes.length).toBeGreaterThan(1);
    });

    // Select the first row checkbox
    const firstRowCheckbox = screen.getAllByRole("checkbox")[1];
    fireEvent.click(firstRowCheckbox);

    // Click the More Info button
    const moreInfoButton = screen.getByText("MORE_INFO_BUTTON");
    fireEvent.click(moreInfoButton);

    // Verify the correct URL was used with useRouter()
    //TODO: add tests to check other languages (e.g fr)
    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith(
        expect.stringContaining("/en/moreInfo?id=1")
      );
    });
  });

  test("alerts if no row or multiple rows are selected", async () => {
    render(<Home />);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    //below we are testing what happens when 0 rows are selected
    // Mock the window error message
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Click the more info button without selecting any row (so the error message shows)
    const moreInfoButton = screen.getByText("MORE_INFO_BUTTON");
    fireEvent.click(moreInfoButton);

    // Verify that the alert was called with the correct message
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Please select a single row to view and try again.");
    });

    //below we now need to include what happens when multiple rows are selected
    // Wait for the checkboxes to be rendered and log the number of checkboxes found
    await waitFor(() => {
      const checkboxes = screen.getAllByRole("checkbox");
      console.log("Checkboxes found: ", checkboxes.length);
      expect(checkboxes.length).toBeGreaterThan(2);
    });

    // Select the first and second row checkboxes
    const firstRowCheckbox = screen.getAllByRole("checkbox")[1];
    const secondRowCheckbox = screen.getAllByRole("checkbox")[2];
    fireEvent.click(firstRowCheckbox);
    fireEvent.click(secondRowCheckbox);

    fireEvent.click(moreInfoButton);

    // Verify that the alert was called with the correct message for multiple rows selected
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Please select a single row to view and try again.");
    });

    // Restore the original window.alert method
    alertMock.mockRestore();
  });
});
