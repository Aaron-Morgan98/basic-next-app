"use client";
import { useEffect, useState, useTransition } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import axios from "axios";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import ObjectList from "../components/objectList";


interface DataRow {
  id: string;
  name: string;
  data: any;
}

export default function Home() {
  const router = useRouter();
  //handle the translations set up via i18n
  const t = useTranslations("Index");
  //when switching between pages, keep the language of the users browser to display translations.
  const locale = useLocale();

  
  const [rows, setRows] = useState<DataRow[]>([]);
  const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api.restful-api.dev/objects");
        const mappedData = res.data.map((item: DataRow) => ({
          id: item.id,
          name: item.name,
          data: item.data,
        }));
        setRows(mappedData);
        console.log("Fetched Data: ", res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleSelection = (selection: GridRowSelectionModel) => {
    if (selection.length > 1) {
      setSelectedRow([selection[0]]);
    } else {
      setSelectedRow(selection);
    }
    console.log("ID selected:", selection);
  };

  const handleMoreInfo = () => {
    if (selectedRow.length === 1) {
      const selectedRowData = rows.find((row) => row.id === selectedRow[0]);
      if (selectedRowData) {
        // Use encodeURIComponent to ensure proper URL encoding
        const query = new URLSearchParams({
          id: selectedRowData.id,
          // Serialise and encode name and data to be sent over to be displayed on more info page
          name: encodeURIComponent(selectedRowData.name), 
          data: encodeURIComponent(JSON.stringify(selectedRowData.data)), 
        });

        router.push(`/${locale}/moreInfo?${query.toString()}`);
      }
    } else {
      alert("Please select a single row to view and try again.");
    }
  };

  return (
    <>
    
      <ObjectList rowData={rows} handleSelection={handleSelection} />

      <div>
        <Stack direction="row" mt={3} justifyContent="center">
          <Button variant="outlined" onClick={handleMoreInfo}>
            {t("MORE_INFO_BUTTON")}
          </Button>
        </Stack>
      </div>
    </>
  );
}
