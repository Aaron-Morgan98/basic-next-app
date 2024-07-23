import { DataGrid, GridColDef} from "@mui/x-data-grid";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


interface Props {
    rows: any,
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
          rows={props.rows}
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

      {/* <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">More Info</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.rows.map((row: any) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
      </div>
    );
};