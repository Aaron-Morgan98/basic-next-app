"use client"
import Image from "next/image";
import styles from "./page.module.css";
import {useEffect, useState} from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import axios from "axios";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";


//define types for each collumn
interface DataRow{
  id: number;
  name: string;
}

//define columns
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 400 },
];



export default function Home() {
  const [rows, setRows] = useState<DataRow[]>([]);
  const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);

  //api call to fetch data from endpoint
  useEffect(() =>{
    const fetchData = async () =>{
      try{
        const res = await axios.get("https://api.restful-api.dev/objects");

       // map data to respective ID - this data will be displayed in the rows of the table
        const mappedData = res.data.map((item: DataRow) => ({
          id: item.id,
          name: item.name,
        }));

        setRows(mappedData);
        console.log("Fetched Data: ", res);
      } catch(err){
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // logic for when a user wants to view mroe info on a row
  const handleSelection = (selection: GridRowSelectionModel) => {
    // validation - if more than 1 row is selected, keep the first row only
    if(selection.length > 1){
      setSelectedRow([selection[0]]);
    } else {
      setSelectedRow(selection);
    }
    console.log("ID selected:", selection);
  };

  return (
    <>
    <div style={{ height: 550, width: '50%', margin:"auto",}}>
      
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[15, 30]}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => handleSelection(newSelection)}
      />
      
    </div>

    <div>
      <Stack direction="row" mt={3} justifyContent="center">
        <Button variant="outlined" >More Info </Button>
      </Stack>
    </div>
    </>
   
  );
}

