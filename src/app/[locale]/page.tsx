import ObjectList from "../components/objectList";
import {getData} from "../../api/getAllProducts";





export default async function Home() {

  const rows = await getData();

  return (
    
    <ObjectList rows={rows} />

  );
}
