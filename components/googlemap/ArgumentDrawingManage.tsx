import {
  Alert,
  Button,
  Divider,
  FormControl,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  Snackbar,
} from "@mui/material";
import { DrawingManager } from "@react-google-maps/api";
import { memo, useState, VFC } from "react";

//icon
import { TaskDialog } from "../admin/TaskDialog";
import { Location, TaskType } from "../../utils/firebase/FirebaseStore";
import useTaskCRUD from "../../hooks/useTaskCRUD";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectBasicInfo } from "../../features/basicInfoSlice";
import InputTaskViewComponent from "./InputingTaskViewComponents";
import { getDownloadURL } from "firebase/storage";
import Image from "next/image";
import DrawingToggle from "../admin/DrawingToggle";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { setInputType } from "../../features/uiHelperSlice";
export type MarkerType = "HumanPos" | "Up" | "Down" | "Left" | "Right" | null;

export const humanPosUrl = "/humanTaskIcon.png"; //`https://firebasestorage.googleapis.com/v0/b/next-fb-project.appspot.com/o/default%2FhumanTaskIcon.png`;
export const upUrl = "/upIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/upIcon.png?alt=media&token=4fef015d-c9c5-43c5-8a5b-06671d2c6a61`;
export const rightUrl = "/rightIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/rightIcon.png?alt=media&token=0de0d1a4-06f3-49f8-9971-df1fd0f7709e`;
export const downUrl = "/downIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/downIcon.png?alt=media&token=e6f3bb0e-7687-42fd-a7e1-d0543c78d1fd`;
export const leftUrl = "/leftIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/leftIcon.png?alt=media&token=1a605b22-b3c4-4fe5-9e63-694b98186af6`;

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
  by: [],
  memberNum: 1,
};

const initPtrMarker = {
  makerType: null,
  location: { lat: 0, lng: 0 },
  explaingOrMove: null,
};

/**
 * Human????????????CRUD??????
 * @param param0
 * @returns
 */

const ArgumentDrawingManage: VFC<Props> = ({ taskBlockId }) => {
  const basicInfo = useAppSelector(selectBasicInfo);
  const dispatch = useAppDispatch();

  // drawing Mode ??????????????????Google Maps ?????????DrawingOption???
  const [googleDrawingMode, setGoogleDrawingMode] =
    useState<google.maps.drawing.OverlayType.MARKER | null>(null);
  // drawing Mode ???????????????????????????Mode??????????????????
  const [ptrMarker, setPtrMarker] = useState<{
    makerType: MarkerType;
    location: Location;
    explaingOrMove: "Explaing" | "Move" | null;
  }>(initPtrMarker);
  //console.log(ptrMarker);

  // ??????????????????
  const [inputingTask, setInputingTask] = useState<Omit<TaskType, "id">>({
    ...initInputTask,
    team: basicInfo.teamId,
  });
  // task????????????????????????Custom Hooks
  const { addTaskInBlock } = useTaskCRUD();

  // DrawingManager???????????????iCon????????????
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
      position: google.maps.ControlPosition.BOTTOM_LEFT, //google.maps.ControlPosition.TOP_RIGHT,
    },
  };

  /**
   * Icon??????????????????Dialog???????????????
   */
  // ??????????????????Icon????????????????????????
  const setIconMode = (_marker: MarkerType) => {
    if (_marker) {
      setGoogleDrawingMode(google.maps.drawing.OverlayType.MARKER);
      setPtrMarker({
        makerType: _marker,
        location: { lat: 0, lng: 0 },
        explaingOrMove: _marker === "HumanPos" ? "Move" : "Explaing",
      });
    } else {
      //????????????
      setGoogleDrawingMode(null);
    }
  };

  // ??????????????????Icon??????????????????????????????
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
   * Dialog?????????
   */
  // dialog???
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setAddOpen(true);
  };

  /**
   * snackbar?????????
   */
  const [isSnacks, setIsSnacks] = useState<{ save: boolean; info: boolean }>({
    save: false,
    info: true,
  });

  const handleClose = async () => {
    // Dialog???Close??????????????????
    setAddOpen(false);
    setPtrMarker(initPtrMarker);
  };

  const handleDelete = (taskBlockId: string) => {
    //deleteBlockTime(taskBlockId);
    console.log("[?????????]");
  };

  // ????????????????????????
  const handleInit = async () => {
    setInputingTask({
      ...initInputTask,
      team: basicInfo.teamId,
    });
    handleClose();
    //dispatch(setInputType("ORIGINAL"));
  };

  /** ?????????Save????????????????????? */
  const handleSave = () => {
    // Task???DB???????????????
    inputingTask && addTaskInBlock(taskBlockId, inputingTask);
    // Input????????????????????????
    handleInit();
    // Drawing??????????????????????????????

    // snack??????????????????false?????????
    setIsSnacks((state) => ({ ...state, save: true, info: false }));
  };

  // explaing???Object???????????????...,??????????????????State?????????????????????Explaing Mode?????????????????????????????????
  const handleExplaing = (title: string) => {
    if (!ptrMarker) return;
    if (ptrMarker.explaingOrMove === "Explaing") {
      //Explaing???????????????????????????????????????
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
      // Move????????????????????????????????????
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
    // snack????????????????????????true?????????
    !isSnacks.info && setIsSnacks((state) => ({ ...state, info: true }));
  };

  /**member???????????? */
  const handleTaskMemberNum = (num: number) => {
    setInputingTask((_state) => ({ ..._state, memberNum: num }));
  };

  return (
    <>
      {/* ????????????Toggle */}
      <DrawingToggle setIconMode={setIconMode} />
      {/* save????????????snakbar */}
      <Snackbar open={isSnacks.save} autoHideDuration={5000}>
        <Alert
          onClose={() => {
            setIsSnacks((state) => ({ ...state, save: false }));
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          SAVE
        </Alert>
      </Snackbar>
      {/* ?????????snackbar */}
      <Snackbar open={isSnacks.info}>
        <Alert
          onClose={() => {
            setIsSnacks((state) => ({ ...state, info: false }));
          }}
          severity="info"
          sx={{ width: "100%" }}
        >
          <>
            <span>{`Inputing... ${inputingTask.content.move.length}moves & ${inputingTask.content.explaing.length}explains`}</span>

            <span>
              <FormControl>
                <InputLabel id="select-member-num">MemberNum</InputLabel>
                <Select
                  labelId="select-member-num"
                  id="selecter-memeber-num"
                  label="member-num"
                  value={inputingTask.memberNum}
                  onChange={(e) => {
                    handleTaskMemberNum(Number(e.target.value));
                  }}
                >
                  {/* <NativeSelect
                  defaultValue={inputingTask.memberNum}
                  inputProps={{
                    name: "num",
                    // onChange={(e)=> {
                    //   handleTaskMemberNum(Number(e.target.value));
                    // }},
                  }}
                > */}
                  <MenuItem value={1}>{"1???"}</MenuItem>
                  <MenuItem value={2}>{"2???"}</MenuItem>
                  <MenuItem value={3}>{"3???"}</MenuItem>
                  {/* </NativeSelect> */}
                </Select>
              </FormControl>
            </span>
            <span>
              <Button color="success" size="small" onClick={() => handleSave()}>
                <SaveAsIcon />
              </Button>
            </span>
            <span>
              <Button color="error" size="small" onClick={() => handleInit()}>
                <DeleteOutlineIcon />
              </Button>
            </span>
          </>
        </Alert>
      </Snackbar>
      <DrawingManager
        drawingMode={googleDrawingMode} //??????????????????????????????????????????????????????
        onMarkerComplete={
          /**marker?????????????????????????????? */ (marker: google.maps.Marker) => {
            setAddOpen(true);
            setIconLocation(marker);
            // marker?????????
            marker.setMap(null);
          }
        }
        options={drawingManagerOption}
      />
      {/* State???Input?????????????????????????????? */}
      <InputTaskViewComponent taskdata={inputingTask} />
      {/* Dialog??? */}
      <TaskDialog
        open={addOpen}
        onClose={handleClose}
        //onSave={handleSave}
        //onDelete={() => handleDelete("")}
        onExplaing={handleExplaing}
      />
    </>
  );
};

export default memo(ArgumentDrawingManage);
