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
import { Location } from "../../utils/firebase/FirebaseStore";

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

const ArgumentDrawingManage: VFC = () => {
  // drawing Mode の切り替え
  const [drawingMode, setDrawingMode] =
    useState<google.maps.drawing.OverlayType.MARKER | null>(null);
  const [marker, setMarker] = useState<{
    makerType: MarkerType | null;
    location: Location | null;
  } | null>(null);

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
    markerOptions: markerOptions[marker?.makerType ?? "Down"],
    drawingControlOptions: {
      drawingModes: [google.maps.drawing.OverlayType.MARKER],
      position: google.maps.ControlPosition.TOP_RIGHT,
    },
  };

  // iconを表示されるように取り替える
  const setIconMode = (_marker: MarkerType) => {
    if (_marker) {
      setDrawingMode(google.maps.drawing.OverlayType.MARKER);
      setMarker({ makerType: _marker, location: null });
    } else {
      //普通の指
      setDrawingMode(null);
    }
  };

  const setIconLocation = (_maker: google.maps.Marker) => {
    const latlng = _maker.getPosition();
    if (latlng) {
      setMarker({
        makerType: marker?.makerType ?? null,
        location: { lat: latlng.lat(), lng: latlng.lng() },
      });
    }
  };

  // dialog用
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setAddOpen(true);
  };

  const handleClose = async () => {
    // DialogがCloseした時の処理
    setAddOpen(false);
    setMarker(null);
  };

  const handleDelete = (taskBlockId: string) => {
    //deleteBlockTime(taskBlockId);
    console.log("[未実装]");
  };

  const handleSave = (title: string) => {
    if (title.length !== 0) {
      //createBlockTime(newTime, title); taskの追加をする
      console.log(
        `try to save ${marker?.makerType} at ${marker?.location?.lat}, ${marker?.location?.lng} by ${title}`
      );
    }
    handleClose();
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
        drawingMode={drawingMode} //ここを変えれば、切り替えができる！！
        onMarkerComplete={
          /**markerが完了したタイミング */ (marker: google.maps.Marker) => {
            setAddOpen(true);
            setIconLocation(marker);
          }
        }
        options={drawingManagerOption}
      />
      {/* Dialog用 */}
      <TaskDialog
        open={addOpen}
        onClose={handleClose}
        onSave={handleSave}
        onDelete={() => handleDelete("")}
      />
    </>
  );
};

export default ArgumentDrawingManage;
