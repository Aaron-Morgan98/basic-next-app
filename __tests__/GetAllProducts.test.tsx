import axios from "axios";
import { getData } from "../src/api/getAllProducts";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getData API call", () => {

  it("fetches and returns mapped data when API call is successful", async () => {
    const mockData = [
      { id: "1", name: "Item 1", data: { someField: "value1" } },
      { id: "2", name: "Item 2", data: { someField: "value2" } }
    ];

    // Mocking the value the axios call would get
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await getData();

    // Expected result after mapping
    const expectedData = mockData.map(item => ({
      id: item.id,
      name: item.name,
      data: item.data,
    }));

    expect(result).toEqual(expectedData);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith("https://api.restful-api.dev/objects");
  });

  it("returns an empty array when the API call fails", async () => {
    // Mocking rejected axios call
    mockedAxios.get.mockRejectedValue(new Error("API call failed"));

    const result = await getData();

    expect(result).toEqual([]);  // Expected to return an empty array
  });
});
