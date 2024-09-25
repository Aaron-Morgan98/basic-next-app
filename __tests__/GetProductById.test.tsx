import axios from "axios";
import { getDataById } from "../src/api/getProductById";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getDataById API call", () => {

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it("fetches and returns data when API call is successful", async () => {
    //Arrange
    const mockResponseData = {
      id: 1,
      title: "Item 1",
      body: "Value 1"
    };

    mockedAxios.get.mockResolvedValue({ data: mockResponseData });

    //Act
    const result = await getDataById(1);

    const expectedData = {
      id: mockResponseData.id,
      title: mockResponseData.title,
      body: mockResponseData.body,
    };
    //Assert
    expect(result).toEqual(expectedData);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/posts/1");
  });

  it("returns null when the API call fails", async () => {
    //Arrange
    mockedAxios.get.mockRejectedValue(new Error("API call failed"));
    //Act
    const result = await getDataById(1);
    //Assert
    expect(result).toBeNull();
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/posts/1");
  });

  it("returns null when the provided id is null", async () => {
    const result = await getDataById(null);

    expect(result).toBeNull();
    expect(mockedAxios.get).not.toHaveBeenCalled();  // Ensure axios is not called when id is null
  });
});