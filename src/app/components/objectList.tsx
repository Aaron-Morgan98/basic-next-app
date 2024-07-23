import { DataGrid, GridColDef} from "@mui/x-data-grid";


interface Props {
    rowData: any,
    handleSelection: any
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 400 },
  ];

export default function ObjectList(props:Props){

    return(
        <div style={{ height: 550, width: "50%", margin: "auto", marginTop: 50}}>
        <DataGrid
          rows={props.rowData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 15 },
            },
          }}
          pageSizeOptions={[15, 30]}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) =>
            props.handleSelection(newSelection)
          }
        />
      </div>
    );
};