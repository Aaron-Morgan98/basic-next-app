import ObjectList from "../components/objectList";
import {getData} from "../../api/getAllProducts";





export default async function Home() {

  //when switching between pages, keep the language of the users browser to display translations.
  // const locale = useLocale();

  const rows = await getData();

  return (
    
    <ObjectList rows={rows} />

  );
}
