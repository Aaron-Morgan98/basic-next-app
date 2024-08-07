"use client";
import { useEffect, useState} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import ObjectList from "../components/objectList";
import {getData} from "../../api/getAllProducts";



interface Data {
  id: string,
  name: string,
  data: any,
}


export default async function Home() {
  // const router = useRouter();

  //when switching between pages, keep the language of the users browser to display translations.
  // const locale = useLocale();

  //handle the translations set up via i18n
  const t = useTranslations("Home");

  const [rows, setRows] = useState<Data[]>([]);

  const res = await getData();
  setRows(res);


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

    <ObjectList
      rows={rows}
      collumnOne={t("ID_COLLUMN")}
      collumnTwo={t("NAME_COLLUMN")}
      collumnThree={t("MORE_INFORMATION_COLLUMN")}
      // buttonClick={""}
      buttonTranslation={t("VIEW_BUTTON")}
    />


  );
}
