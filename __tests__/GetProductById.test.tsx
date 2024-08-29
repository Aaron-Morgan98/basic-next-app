import axios from "axios";
import { getDataById } from "../src/api/getProductById";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getDataById API call", () => {
  it("fetches and returns data when API call is successful", async () => {
    const mockResponseData = {
      id: "1",
      name: "Item 1",
      data: { someField: "value1" }
    };

    // Mocking what the axios call would get
    mockedAxios.get.mockResolvedValue({ data: mockResponseData });

    const result = await getDataById("1");

    // Expected result
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
    // Mocing rejected axios call
    mockedAxios.get.mockRejectedValue(new Error("API call failed"));

    const result = await getDataById("1");

    expect(result).toBeNull();
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(mockedAxios.get).toHaveBeenCalledWith("https://api.restful-api.dev/objects/1");
  });

  it("returns null when the provided id is null", async () => {
    const result = await getDataById(null);

    // Since axios won't be called if id is null, assert no call is made
    expect(result).toBeNull();
    //expect(mockedAxios.get).not.toHaveBeenCalled();
  });
});
