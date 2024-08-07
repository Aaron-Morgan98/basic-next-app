
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DefaultButton from "../components/defaultButton";

interface Props {
  rows: any[];
  collumnOne: string;
  collumnTwo: string;
  collumnThree: string;
  // buttonClick: any;
  buttonTranslation: string;
}

export default async function ObjectList(props: Props) {
  return (
    <div style={{ height: 550, width: "50%", margin: "auto", marginTop: 50 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{props.collumnOne}</TableCell>
              <TableCell align="right">{props.collumnTwo}</TableCell>
              <TableCell align="right">{props.collumnThree}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.length > 0 ? (
              props.rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  {/* <TableCell align="right">
                    <DefaultButton click={props.buttonClick} translation={props.buttonTranslation} />
                  </TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
