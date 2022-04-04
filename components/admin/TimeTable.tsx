import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import React, { useEffect, useState, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectAdminTaskBlock,
  selectAdminInitObjects,
  selectAdminTimeSche,
} from "../../features/adminSlice";
import { TaskBlock } from "../../utils/firebase/FirebaseStore";
// date-fns
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Button, TextField } from "@mui/material";
import { MobileTimePicker } from "@mui/lab";
import useTaskBlock from "../../hooks/useTaskBlock";
import { selectBasicInfo } from "../../features/basicInfoSlice";
import { TimeDialog } from "./TimeDialog";
const tmpTaskBlock = [] as TaskBlock[];

interface Props {
  setter?: React.Dispatch<React.SetStateAction<string>>;
}

const TimeTable: VFC<Props> = ({ setter }) => {
  const basicInfo = useAppSelector(selectBasicInfo);
  //const initObjectLocations = useAppSelector(selectAdminInitObjects);
  const taskBlock = useAppSelector(selectAdminTaskBlock);
  const timeSche = useAppSelector(selectAdminTimeSche);
  const [columns, setColumns] = useState<GridColumns>([]);
  const { createBlockTime, updateBlockTime, deleteBlockTime } = useTaskBlock({
    teamId: basicInfo.teamId,
  });

  // dialog用
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setAddOpen(true);
  };

  const handleClose = async () => {
    // DialogがCloseした時の処理
    setAddOpen(false);
  };

  const handleDelete = (taskBlockId: string) => {
    //deleteBlockTime(taskBlockId);
    console.log("[未実装]");
  };

  const handleSave = (newTime: Date | null, title: string) => {
    if (newTime && title.length !== 0) {
      createBlockTime(newTime, title);
    }
    handleClose();
  };

  useEffect(() => {
    setColumns([
      {
        field: "time",
        headerName: "TIME",
        renderCell: (params: GridRenderCellParams<Timestamp>) => {
          //console.log(params.value);
          return params.value ? (
            <MobileTimePicker
              label="from"
              value={params.value.toDate() ?? ""}
              onChange={(newValue) => {
                //console.log(newValue);
                // ここでtaskBlockのtimeを変更する
              }}
              disabled={
                timeSche.start
                  ? timeSche.start?.toDate() >= params.value.toDate()
                  : true
              }
              minTime={timeSche.start?.toDate()}
              maxTime={timeSche.end?.toDate()}
              renderInput={(p) => (
                <TextField variant="filled" {...p} color="info" />
              )}
            />
          ) : (
            <div>Loading...</div>
          );
        },
        width: 110,
        sortable: false,
      },
      {
        field: "title",
        headerName: "+",
        sortable: false,
      },
    ]);
  }, [timeSche]);

  return (
    <>
      <div style={{ height: "600px", width: "100%" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DataGrid
            columns={columns}
            rows={taskBlock ?? []} //{[initObjectLocations].concat(taskBlock ?? [])}
            onSelectionModelChange={(selectionModel: GridSelectionModel) => {
              //選択された時
              //console.log(selectionModel);
              setter && setter(selectionModel[0] as string);
            }}
            onColumnHeaderClick={(
              params // dialogがOpenする
            ) => {
              console.log(params);
              params.field === "title" && setAddOpen(true);
            }}
            hideFooter
          />
          <TimeDialog
            open={addOpen}
            onClose={handleClose}
            onSave={handleSave}
            onDelete={() => handleDelete("")}
          />
        </LocalizationProvider>
      </div>
    </>
  );
};

export default TimeTable;
