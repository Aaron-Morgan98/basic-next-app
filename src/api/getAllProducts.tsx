import axios from "axios";

interface Data {
    id: number;
    title: string;
    body: any,
  }
  
  export async function getData(){
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const mappedData = res.data.map((item: Data) => ({
        id: item.id,
        title: item.title,
        body: item.body,
      }));
      console.log("Fetched Data: ", res);
      return mappedData;
    } catch (err) {
      console.log(err);
      return[];
    }
  
  }
  