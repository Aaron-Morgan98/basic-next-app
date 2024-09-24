"use client";
import { useTranslations } from "next-intl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DefaultButton from "../components/defaultButton";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

interface Props {
  rows: any[];
}

export default function ObjectList({ rows }: Props) {
  const t = useTranslations("Home");
  const router = useRouter();
  const locale = useLocale();

  const handleMoreInfoClick = (id: string) => {
    console.log("More info clicked for ID:", id);
    router.push(`/${locale}/moreInfo/${id}`);
  };

  return (
    <div style={{ height: 550, width: "50%", margin: "auto", marginTop: 50 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("ID_COLLUMN")}</TableCell>
              <TableCell align="right">{t("NAME_COLLUMN")}</TableCell>
              <TableCell align="right">{t("MORE_INFORMATION_COLLUMN")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">
                    <DefaultButton
                      click={() => handleMoreInfoClick(row.id)}
                      translation={t("VIEW_BUTTON")}
                    />
                  </TableCell>
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
