import { Button, Divider, Icon, IconButton } from "@mui/material";
import { Box, BoxProps } from "@mui/system";
import { DrawingManager } from "@react-google-maps/api";
import { useState, VFC } from "react";

//icon
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SwipeLeftIcon from "@mui/icons-material/SwipeLeft";
import { TaskDialog } from "../admin/TaskDialog";
import { Location, TaskType } from "../../utils/firebase/FirebaseStore";
import useTaskCRUD from "../../hooks/useTaskCRUD";
import { useAppSelector } from "../../app/hooks";
import { selectBasicInfo } from "../../features/basicInfoSlice";
import InputTaskViewComponent from "./InputingTaskViewComponents";

export type MarkerType = "HumanPos" | "Up" | "Down" | "Left" | "Right" | null;

export const humanPosUrl = `http://localhost:9199/v0/b/default-bucket/o/humanTaskIcon.png?alt=media&token=389a05b0-c6d7-4de2-86da-1559154b17f8`;
export const upUrl = `http://localhost:9199/v0/b/default-bucket/o/upIcon.png?alt=media&token=4fef015d-c9c5-43c5-8a5b-06671d2c6a61`;
export const rightUrl = `http://localhost:9199/v0/b/default-bucket/o/rightIcon.png?alt=media&token=0de0d1a4-06f3-49f8-9971-df1fd0f7709e`;
export const downUrl = `http://localhost:9199/v0/b/default-bucket/o/downIcon.png?alt=media&token=e6f3bb0e-7687-42fd-a7e1-d0543c78d1fd`;
export const leftUrl = `http://localhost:9199/v0/b/default-bucket/o/leftIcon.png?alt=media&token=1a605b22-b3c4-4fe5-9e63-694b98186af6`;

export const marker2Url = {
  HumanPos: humanPosUrl,
  Up: upUrl,
  Down: downUrl,
  Left: leftUrl,
  Right: rightUrl,
};

type Props = {
  taskBlockId: string;
};

const initInputTask: Omit<TaskType, "id"> = {
  title: "",
  kindOf: "HUMAN",
  taskState: "UNDO",
  team: "",
  content: { move: [], explaing: [] },
  by: "",
};

const initPtrMarker = {
  makerType: null,
  location: { lat: 0, lng: 0 },
  explaingOrMove: null,
};

/**
 * HumanタスクのCRUD管理
 * @param param0
 * @returns
 */

const ArgumentDrawingManage: VFC<Props> = ({ taskBlockId }) => {
  const basicInfo = useAppSelector(selectBasicInfo);

  // drawing Mode の切り替え（Google Maps 純正のDrawingOption用
  const [googleDrawingMode, setGoogleDrawingMode] =
    useState<google.maps.drawing.OverlayType.MARKER | null>(null);
  // drawing Mode の切り替え（自作のModeを切り替える
  const [ptrMarker, setPtrMarker] = useState<{
    makerType: MarkerType;
    location: Location;
    explaingOrMove: "Explaing" | "Move" | null;
  }>(initPtrMarker);
  //console.log(ptrMarker);

  // 現在のデータ
  const [inputingTask, setInputingTask] = useState<Omit<TaskType, "id">>({
    ...initInputTask,
    team: basicInfo.teamId,
  });
  // taskを追加するためのCustom Hooks
  const { addTaskInBlock } = useTaskCRUD();

  // DrawingManagerに付与するiConについて
  const markerOptions = {
    HumanPos: {
      icon: {
        url: humanPosUrl,
        scaledSize: new google.maps.Size(40, 40),
      },
    },
    Up: {
      icon: {
        url: upUrl,
        scaledSize: new google.maps.Size(35, 35),
      },
    },
    Right: {
      icon: {
        url: rightUrl,
        scaledSize: new google.maps.Size(35, 35),
      },
    },
    Down: {
      icon: {
        url: downUrl,
        scaledSize: new google.maps.Size(35, 35),
      },
    },
    Left: {
      icon: {
        url: leftUrl,
        scaledSize: new google.maps.Size(35, 35),
      },
    },
  };

  /**
   * DrawingManagerOption: https://developers.google.com/maps/documentation/javascript/reference/drawing?hl=en
   */
  const drawingManagerOption: google.maps.drawing.DrawingManagerOptions = {
    markerOptions: markerOptions[ptrMarker?.makerType ?? "Down"],
    drawingControlOptions: {
      drawingModes: [google.maps.drawing.OverlayType.MARKER],
      position: google.maps.ControlPosition.TOP_RIGHT,
    },
  };

  /**
   * Iconを操作して、Dialogを出すまで
   */
  // 選択しているIconを切り替えたとき
  const setIconMode = (_marker: MarkerType) => {
    if (_marker) {
      setGoogleDrawingMode(google.maps.drawing.OverlayType.MARKER);
      setPtrMarker({
        makerType: _marker,
        location: { lat: 0, lng: 0 },
        explaingOrMove: _marker === "HumanPos" ? "Move" : "Explaing",
      });
    } else {
      //普通の指
      setGoogleDrawingMode(null);
    }
  };

  // 選択しているIconの場所を決定したとき
  const setIconLocation = (_maker: google.maps.Marker) => {
    const latlng = _maker.getPosition();
    if (latlng) {
      setPtrMarker({
        ...ptrMarker,
        // makerType: ptrMarker?.makerType ?? null,
        location: { lat: latlng.lat(), lng: latlng.lng() },
      });
    }
  };

  /**
   * Dialogの中身
   */
  // dialog用
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setAddOpen(true);
  };

  const handleClose = async () => {
    // DialogがCloseした時の処理
    setAddOpen(false);
    setPtrMarker(initPtrMarker);
  };

  const handleDelete = (taskBlockId: string) => {
    //deleteBlockTime(taskBlockId);
    console.log("[未実装]");
  };

  /** 全てをSaveさせに行くとき */
  const handleSave = (title: string) => {
    // TaskをDBに追加する
    if (inputingTask && ptrMarker.explaingOrMove === "Explaing") {
      addTaskInBlock(taskBlockId, {
        ...inputingTask,
        content: {
          ...inputingTask.content,
          explaing: [
            ...inputingTask.content.explaing,
            {
              location: ptrMarker.location,
              desc: title,
              iconId: ptrMarker.makerType,
            },
          ],
        },
      });
    } else if (inputingTask && ptrMarker.explaingOrMove === "Move") {
      addTaskInBlock(taskBlockId, {
        ...inputingTask,
        content: {
          ...inputingTask.content,
          move: [
            ...inputingTask.content.move,
            { location: ptrMarker.location, desc: title },
          ],
        },
      });
    }
    // Inputを全て無効にする
    setInputingTask(initInputTask);
    handleClose();
    // Drawingの物を全て無くしたい
  };

  // explaingなObjectを足すとき...,現在の入力をStateに入れ込んで、Explaing Modeにしながら、入力をまつ
  const handleExplaing = (title: string) => {
    if (!ptrMarker) return;
    if (ptrMarker.explaingOrMove === "Explaing") {
      //Explaingの入力が行われている場合、
      setInputingTask({
        ...inputingTask,
        content: {
          ...inputingTask.content,
          explaing: [
            ...inputingTask.content.explaing,
            {
              location: ptrMarker.location,
              desc: title,
              iconId: ptrMarker.makerType,
            },
          ],
        },
      });
    } else if (ptrMarker.explaingOrMove === "Move") {
      // Moveの入力が行われている場合
      setInputingTask({
        ...inputingTask,
        content: {
          ...inputingTask.content,
          move: [
            ...inputingTask.content.move,
            { location: ptrMarker.location, desc: title },
          ],
        },
      });
    }
    setGoogleDrawingMode(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "fit-content",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          bgcolor: "background.paper",
          color: "text.secondary",
          "& svg": {
            m: 1.0,
          },
          "& hr": {
            mx: 0.5,
          },
        }}
      >
        <Button
          size="small"
          variant="outlined"
          fullWidth={false}
          color="inherit"
          onClick={() => setIconMode(null)}
        >
          <SwipeLeftIcon />
        </Button>
        <Button
          size="small"
          variant="outlined"
          fullWidth={false}
          color="inherit"
          onClick={() => setIconMode("Up")}
        >
          <ArrowUpwardIcon />
        </Button>
        <Button
          size="small"
          variant="outlined"
          fullWidth={false}
          color="inherit"
          onClick={() => setIconMode("Down")}
        >
          <ArrowDownwardIcon />
        </Button>
        <Button
          size="small"
          variant="outlined"
          fullWidth={false}
          color="inherit"
          onClick={() => setIconMode("Left")}
        >
          <ArrowBackIcon />
        </Button>
        <Button
          size="small"
          variant="outlined"
          fullWidth={false}
          color="inherit"
          onClick={() => setIconMode("Right")}
        >
          <ArrowRightAltIcon />
        </Button>
        <Button
          size="small"
          variant="outlined"
          fullWidth={false}
          color="inherit"
          onClick={() => setIconMode("HumanPos")}
        >
          <img
            src={
              "http://localhost:9199/v0/b/default-bucket/o/humanTaskIcon.png?alt=media&token=389a05b0-c6d7-4de2-86da-1559154b17f8"
            }
            width={44}
            height={40}
          ></img>
        </Button>
      </Box>
      <DrawingManager
        drawingMode={googleDrawingMode} //ここを変えれば、切り替えができる！！
        onMarkerComplete={
          /**markerが完了したタイミング */ (marker: google.maps.Marker) => {
            setAddOpen(true);
            setIconLocation(marker);
            // markerを消す
            marker.setMap(null);
          }
        }
        options={drawingManagerOption}
      />
      {/* StateでInput中のタスクを表示する */}
      <InputTaskViewComponent taskdata={inputingTask} />
      {/* Dialog用 */}
      <TaskDialog
        open={addOpen}
        onClose={handleClose}
        onSave={handleSave}
        onDelete={() => handleDelete("")}
        onExplaing={handleExplaing}
      />
    </>
  );
};

export default ArgumentDrawingManage;
