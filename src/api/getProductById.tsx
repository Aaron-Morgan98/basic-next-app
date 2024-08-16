import axios from "axios";

interface Data {
    id: string | null;
    name: string;
    data: any;
}

export async function getDataById(id: string | null){
    try{
        const res = await axios.get(`https://api.restful-api.dev/objects/${id}`);
        const itemId = res.data.id;
        const itemName = res.data.name;
        const itemData = res.data.data;
          console.log("Fetched Data: ", 
            "ID:", itemId,
            "Name:",itemName,
            "Data:",itemData);
          return [itemId, itemName, itemData];
    } catch (err){
        console.error(err);
        return [];
    }
}