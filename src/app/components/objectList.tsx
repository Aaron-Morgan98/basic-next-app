import { DataGrid, GridColDef} from "@mui/x-data-grid";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MyButton from "../components/button";


interface Props {
    rows: any,
    handleButton: any,
    collumnOne: string,
    collumnTwo: string,
    collumnThree: string,
  };



export default function ObjectList(props:Props){

    return(
        <div style={{ height: 550, width: "40%", margin: "auto", marginTop: 50}}>

      <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                {/* TODO: make the collumns props */}
                  <TableCell>{props.collumnOne}</TableCell>
                  <TableCell align="right">{props.collumnTwo}</TableCell> 
                  <TableCell align="right">{props.collumnThree}</TableCell>
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
                      <MyButton click={""} />
                    </TableCell>

                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
      </div>
    );
};