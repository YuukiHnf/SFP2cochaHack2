import { DataGrid, GridColumns, GridRenderCellParams } from "@mui/x-data-grid";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectAdminTaskBlock,
  selectAdminTaskBlockInit,
  selectAdminTimeSche,
} from "../../features/adminSlice";
import { TaskBlock } from "../../utils/firebase/FirebaseStore";
// date-fns
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { TextField } from "@mui/material";
import { MobileTimePicker } from "@mui/lab";
const tmpTaskBlock = [] as TaskBlock[];

const TimeTable = () => {
  const initTaskBlock = useAppSelector(selectAdminTaskBlockInit);
  const taskBlock = tmpTaskBlock; //useAppSelector(selectAdminTaskBlock);
  const timeSche = useAppSelector(selectAdminTimeSche);
  const columns: GridColumns = [
    {
      field: "time",
      headerName: "TIME",
      renderCell: (params: GridRenderCellParams<Timestamp>) => {
        //console.log(params.value);
        return (
          <MobileTimePicker
            label="初期位置"
            value={params.value.toDate()}
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
        );
      },
      width: 150,
    },
  ];

  return (
    <>
      <div style={{ height: "600px", width: "100%" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DataGrid columns={columns} rows={[initTaskBlock]} />
        </LocalizationProvider>
      </div>
      {/* <TimePicker
          label="初期位置"
          value={Date.now()}
          onChange={(newValue) => {
            console.log(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="初期位置"
          value={Date.now()}
          onChange={(newValue) => {
            console.log(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        /> */}
    </>
  );
};

export default TimeTable;
