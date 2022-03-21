import { Button } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Dispatch, SetStateAction, VFC } from "react";
import { OBJECTPARAM } from "../../utils/firebase/FirebaseStore";

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
      renderCell: (params) => {
        console.log(params);
        return <img src={params.row.iconUrl} width={16} height={16} />;
      },
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
