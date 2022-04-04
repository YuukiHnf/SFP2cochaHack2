import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { VFC } from "react";
import { USER } from "../../utils/firebase/FirebaseStore";
import { Avatar } from "@mui/material";

interface Props {
  rows: USER[];
}

const Table1: VFC<Props> = ({ rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Avatar</TableCell>
            <TableCell align="center">UserName</TableCell>
            <TableCell align="center">Active</TableCell>
            <TableCell align="center">isAdmin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.uid}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                <Avatar src="https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqGx5cm8knTLo61O84kVTxOan841a30-aIJSoqkmlQNsP4-Qv0KVqX9M9vYFUiwJk7TcRj-zDH3ruvzPAv1LeEkIPFbJukMCnmxb-_NSKNQz81_G_Cgmru6G9HDoV_5iJv_0CekX6g9Ht3tCz088ZsOaCogLShgRnMUau2kHZsZKj6GOU98RQVaP4bd3MQaQxrR3ITKyi5MpTq8RtQxcnusqCSV7BIZGQdH4ODYExkpW7QL5ZDEwo63PINk6gGWrEBqLj6TjLHRuBzhOiULXNXZGyA4qoZRzig2hVzsscQ_ZO-qIC0oYEZzFGrtpB2bGSo-vyGopXntWFSetv1yGCyEfFsJta-T6oz36T4S3MZ2X1xw0eP0Oqdz0dKB0VdumB_jg==/2048px-OOjs_UI_icon_userAvatar.svg.png?errorImage=false" />
              </TableCell>
              <TableCell align="center">{row.username}</TableCell>
              <TableCell align="center">
                {row.isActive ? "Active" : "DisActive"}
              </TableCell>
              <TableCell align="center">
                {row.isAdmin ? "Admin" : "Guest"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Table1;
