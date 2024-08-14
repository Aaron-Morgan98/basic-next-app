import ObjectList from "../components/objectList";
import {getData} from "../../api/getAllProducts";





export default async function Home() {

  //when switching between pages, keep the language of the users browser to display translations.
  // const locale = useLocale();


  const rows = await getData();



  //TODO: make api call to fetch data -- make server component 
  // const handleMoreInfo = () => {
  //   if (selectedRow.length === 1) {
  //     const selectedRowData = rows.find((row) => row.id === selectedRow[0]);
  //     if (selectedRowData) {
  //       // Use encodeURIComponent to ensure proper URL encoding
  //       const query = new URLSearchParams({
  //         id: selectedRowData.id,
  //         // Serialise and encode name and data to be sent over to be displayed on more info page
  //         name: encodeURIComponent(selectedRowData.name), 
  //         data: encodeURIComponent(JSON.stringify(selectedRowData.data)), 
  //       });

  //       router.push(`/${locale}/moreInfo?${query.toString()}`);
  //     }
  //   } else {
  //     alert("Please select a single row to view and try again.");
  //   }
  // };

  return (
    
    <ObjectList rows={rows} />

  );
}
