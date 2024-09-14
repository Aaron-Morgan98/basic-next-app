import axios from "axios";
import { getDataById } from "../src/api/getProductById";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getDataById API call", () => {

  beforeEach(() => {
    jest.clearAllMocks();  // Clear mocks before each test
  });

  it("fetches and returns data when API call is successful", async () => {
    const mockResponseData = {
      id: "1",
      name: "Item 1",
      data: { someField: "value1" }
    };

    mockedAxios.get.mockResolvedValue({ data: mockResponseData });

    const result = await getDataById("1");

    const expectedData = {
      id: mockResponseData.id,
      name: mockResponseData.name,
      data: mockResponseData.data,
    };

    expect(result).toEqual(expectedData);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith("https://api.restful-api.dev/objects/1");
  });

  it("returns null when the API call fails", async () => {
    mockedAxios.get.mockRejectedValue(new Error("API call failed"));

    const result = await getDataById("1");

    expect(result).toBeNull();
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith("https://api.restful-api.dev/objects/1");
  });

  it("returns null when the provided id is null", async () => {
    const result = await getDataById(null);

    expect(result).toBeNull();
    expect(mockedAxios.get).not.toHaveBeenCalled();  // Ensure axios is not called when id is null
  });
});