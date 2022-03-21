import { Button } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Dispatch, SetStateAction, VFC } from "react";
import { OBJECTPARAM } from "../../utils/firebase/FirebaseStore";

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

type Props = {
  objectParams: OBJECTPARAM[];
  setPtrObjectId: Dispatch<SetStateAction<any>>;
};

const ObjectTable: VFC<Props> = ({ objectParams, setPtrObjectId }) => {
  const columns: GridColDef[] = [
    {
      field: "selectedButton",
      headerName: "編集",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => {
            setPtrObjectId(params.id);
          }}
        >
          Select
        </Button>
      ),
    },
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "image",
      headerName: "Image",
      width: 90,
      renderCell: (params) => (
        <>
          <img src={params.value} />
        </>
      ),
    },
    { field: "name", headerName: "Name", width: 130 },
    {
      field: "num",
      headerName: "Num",
      width: 90,
    },
    {
      field: "weight",
      headerName: "Weight",
      sortable: false,
      width: 90,
    },
    {
      field: "editBtn",
      headerName: "編集",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            console.log(params.id);
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      field: "deleteBtn",
      headerName: "削除",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            console.log(params.id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];
  return (
    <div style={{ height: 280, width: "80%", margin: "0 auto" }}>
      <DataGrid
        rows={objectParams}
        columns={columns}
        pageSize={3}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};
export default ObjectTable;
