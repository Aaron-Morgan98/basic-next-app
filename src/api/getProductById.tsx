import axios from "axios";

interface Data {
    id: number | null;
    name: string;
    data: any;
}

export async function getDataById(id: number | null) {
    if (!id) {
        console.log("No ID provided");
        return null;  
    }
    
    try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const itemId = res.data.id;
        const itemTitle = res.data.title;
        const itemBody = res.data.body;

        console.log("Fetched Data: ", "ID:", itemId, "Name:", itemTitle, "Data:", itemBody);
        return { id: itemId, name: itemTitle, data: itemBody };
    } catch (err) {
        console.log(err);
        return null;
    }
}