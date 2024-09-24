import { render, screen, fireEvent } from "@testing-library/react";
import ObjectList from "../src/app/components/objectList";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
  useLocale: jest.fn(),
}));

const mockPush = jest.fn();
const mockTranslation = jest.fn((key: string) => key);
const mockLocale = jest.fn(() => "en");

describe("ObjectList Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useTranslations as jest.Mock).mockReturnValue(mockTranslation);
    (useLocale as jest.Mock).mockReturnValue(mockLocale());
  });

  it("renders the table with data", () => {
    //Arrange
    const rows = [
      { id: "1", name: "Item 1" },
      { id: "2", name: "Item 2" },
    ];
    //Act
    render(<ObjectList rows={rows} />);

    // Assert
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("displays 'No Data Available' when rows are empty", () => {
    render(<ObjectList rows={[]} />);

    expect(screen.getByText("No Data Available")).toBeInTheDocument();
  });

  it("calls handleMoreInfoClick when 'More Info' button is clicked", () => {
    //Arrange
    const rows = [{ id: "1", name: "Item 1" }];

    //Act
    render(<ObjectList rows={rows} />);
    const moreInfoButton = screen.getByText("VIEW_BUTTON");
    fireEvent.click(moreInfoButton);

    // Assert
    expect(mockPush).toHaveBeenCalledWith("/en/moreInfo/1");
  });
});
