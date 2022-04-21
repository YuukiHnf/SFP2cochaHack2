import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const TableStyle = {
  width: "80%",
  margin: "0 auto",
};

type props = {
  time: Date;
  content: string;
  taskNum: string;
};

export const PDFTable1 = () => {
  return (
    <TableContainer component={Paper} style={TableStyle}>
      <Table aria-label="simple table" style={{ tableLayout: "auto" }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "25%" }}>時間</TableCell>
            <TableCell style={{ width: "25%" }} align="right">
              コンテンツ
            </TableCell>
            <TableCell style={{ width: "25%" }} align="right">
              タスク数(個)
            </TableCell>
            <TableCell style={{ width: "25%" }} align="right">
              人数(人)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
