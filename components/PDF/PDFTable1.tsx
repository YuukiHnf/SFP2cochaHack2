import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TaskBlock } from "../../utils/firebase/FirebaseStore";

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

const TableStyle = {
  width: "80%",
  margin: "0 auto",
};

type props = {
  taskBlock: TaskBlock[];
};

export const PDFTable1: React.VFC<props> = ({ taskBlock }) => {
  return (
    <TableContainer component={Paper} style={TableStyle}>
      <Table aria-label="simple table" style={{ tableLayout: "auto" }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "30%", fontWeight: "bold" }}>
              時間
            </TableCell>
            <TableCell
              style={{ width: "40%", fontWeight: "bold" }}
              align="center"
            >
              コンテンツ
            </TableCell>
            <TableCell
              style={{ width: "30%", fontWeight: "bold" }}
              align="center"
            >
              タスク数(個)
            </TableCell>
            {/* <TableCell
              style={{ width: "50%", fontWeight: "bold" }}
              align="right"
            >
              タスク名
            </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {taskBlock.map((task) => (
            <TableRow
              key={task.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {task.time?.toDate().getHours() +
                  ":" +
                  task.time?.toDate().getMinutes()}
              </TableCell>
              <TableCell align="center">{task.title}</TableCell>
              <TableCell align="center">{task.taskIds.length}</TableCell>
              {/* <TableCell align="right">{task.taskIds.join(",")}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
