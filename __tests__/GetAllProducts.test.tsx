import axios from "axios";
import { getData } from "../src/api/getAllProducts"; 

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getData API call", () => {
  // Mock console
  const logSpy = jest.spyOn(global.console, "log").mockImplementation(() => {});


  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  //Arrange
  it("fetches and returns mapped data when API call is successful", async () => {
    const mockData = [
      { id: 1, title: "Item 1", body: "Value 1" },
      { id: 2, title: "Item 2", body: "Value 2" }
    ];

    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await getData();
    //Act
    const expectedData = mockData.map(item => ({
      id: item.id,
      title: item.title,
      body: item.body,
    }));

    //Assert
    expect(result).toEqual(expectedData);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/posts");
  });

  //Test for when API call fails
  it("returns an empty array when the API call fails", async () => {
    //Arrange
    mockedAxios.get.mockRejectedValue(new Error("API call failed"));
    
    //Act
    const result = await getData();

    //Assert
    expect(result).toEqual([]);  
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});