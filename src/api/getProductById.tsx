import axios from "axios";

interface Data {
    id: string;
    name: string;
    data: any;
}

export async function getDataById(id: Data){
    try{
        const res = await axios.get(`https://api.restful-api.dev/objects/${id}`);
        const mappedData = res.data.map((item: Data) => ({
            id: item.id,
            name: item.name,
            data: item.data,
          }));
          console.log("Fetched Data: ", mappedData);
          return mappedData;
    } catch (err){
        console.error(err);
        return [];
    }
}