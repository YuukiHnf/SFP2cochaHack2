import { Button, SvgIcon } from "@mui/material";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { Dispatch, SetStateAction, VFC } from "react";
import { OBJECTPARAM } from "../../utils/firebase/FirebaseStore";

//icon
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useObjectHooks from "../../hooks/useObjectHooks";
import { useAppSelector } from "../../app/hooks";
import { selectBasicInfo } from "../../features/basicInfoSlice";

type Props = {
  objectParams: Omit<OBJECTPARAM, "initLocation">[];
  setPtrObjectId: Dispatch<SetStateAction<any>>;
};

const ObjectTable: VFC<Props> = ({ objectParams, setPtrObjectId }) => {
  const basicInfo = useAppSelector(selectBasicInfo);
  const { incrementObjectNum } = useObjectHooks({ teamId: basicInfo.teamId });
  const columns: GridColDef[] = [
    {
      field: "selectedButton",
      headerName: "Select",
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
    {
      field: "image",
      headerName: "Image",
      width: 90,
      renderCell: (params) => {
        //console.log(params);
        return <img src={params.row.iconUrl} width={16} height={16} />;
      },
    },
    { field: "objectName", headerName: "Name", width: 130 },
    {
      field: "num",
      headerName: "Num",
      width: 90,
      renderCell: (params) => {
        return (
          <div>
            <div style={{ float: "left", width: "80%", margin: "0 auto" }}>
              {params.value}
            </div>
            <div
              style={{
                float: "right",
                width: "20%",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <SvgIcon
                  component={KeyboardArrowUpIcon}
                  onClick={() => {
                    const { createAt, num, ..._row } = params.row;
                    incrementObjectNum(_row);
                  }}
                />
                <SvgIcon
                  component={KeyboardArrowDownIcon}
                  onClick={() => {
                    const { createAt, num, ..._row } = params.row;
                    console.log("Down", _row);
                  }}
                />
              </div>
            </div>
          </div>
        );
      },
    },
    {
      field: "weight",
      headerName: "Weight",
      sortable: false,
      width: 90,
    },
    {
      field: "editBtn",
      headerName: "Edit",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            //console.log(params.id);
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      field: "deleteBtn",
      headerName: "Delete",
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

  // countする
  var counts = {} as any;
  for (var i = 0; i < objectParams.length; i++) {
    var key = objectParams[i].objectName;
    console.log(key);
    counts[key] = counts[key] ? counts[key] + 1 : 1;
  }

  // 重複フィルタ
  const objectParamsFilter = objectParams.filter(
    (element, index, self) =>
      self.findIndex(
        (dataElement) => dataElement.objectName === element.objectName
      ) === index
  );

  console.log(counts);
  console.log(objectParamsFilter);

  return (
    <div style={{ height: 280, width: "80%", margin: "0 auto" }}>
      <DataGrid
        rows={objectParamsFilter.map((param) => ({
          ...param,
          num: counts[param.objectName] ?? 0,
        }))}
        columns={columns}
        pageSize={3}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={(selectionModel: GridSelectionModel) => {
          setPtrObjectId(selectionModel[0]);
        }}
      />
    </div>
  );
};
export default ObjectTable;
