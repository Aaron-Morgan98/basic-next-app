import { DataGrid, GridColDef} from "@mui/x-data-grid";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "../components/button";


interface Props {
    rows: any,
    handleSelection: any,
    handleMoreInfo: any,
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 400 },
  ];

export default function ObjectList(props:Props){

    return(
        <div style={{ height: 550, width: "40%", margin: "auto", marginTop: 50}}>

      <TableContainer component={Paper}>
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
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0} }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">
                      <Button handleMoreInfo={props.handleMoreInfo}/>
                    </TableCell>

                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
      </div>
    );
};