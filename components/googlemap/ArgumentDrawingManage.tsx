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

type MarkerType = "HumanPos" | "Up" | "Down" | "Left" | "Right" | null;

const ArgumentDrawingManage: VFC = () => {
  // drawing Mode の切り替え
  const [drawingMode, setDrawingMode] =
    useState<google.maps.drawing.OverlayType.MARKER | null>(null);
  const [marker, setMarker] = useState<MarkerType>(null);
  // DrawingManagerに付与するiConについて
  const markerOptions = {
    HumanPos: {
      icon: {
        url: `http://localhost:9199/v0/b/default-bucket/o/humanTaskIcon.png?alt=media&token=389a05b0-c6d7-4de2-86da-1559154b17f8`,
        scaledSize: new google.maps.Size(40, 40),
      },
    },
    Up: {
      icon: {
        url: `http://localhost:9199/v0/b/default-bucket/o/upIcon.png?alt=media&token=4fef015d-c9c5-43c5-8a5b-06671d2c6a61`,
        scaledSize: new google.maps.Size(35, 35),
      },
    },
    Right: {
      icon: {
        url: `http://localhost:9199/v0/b/default-bucket/o/rightIcon.png?alt=media&token=0de0d1a4-06f3-49f8-9971-df1fd0f7709e`,
        scaledSize: new google.maps.Size(35, 35),
      },
    },
    Down: {
      icon: {
        url: `http://localhost:9199/v0/b/default-bucket/o/downIcon.png?alt=media&token=e6f3bb0e-7687-42fd-a7e1-d0543c78d1fd`,
        scaledSize: new google.maps.Size(35, 35),
      },
    },
    Left: {
      icon: {
        url: `http://localhost:9199/v0/b/default-bucket/o/leftIcon.png?alt=media&token=1a605b22-b3c4-4fe5-9e63-694b98186af6`,
        scaledSize: new google.maps.Size(35, 35),
      },
    },
  };

  /**
   * DrawingManagerOption: https://developers.google.com/maps/documentation/javascript/reference/drawing?hl=en
   *
   */
  const drawingManagerOption: google.maps.drawing.DrawingManagerOptions = {
    markerOptions: markerOptions[marker ?? "Down"],
    drawingControlOptions: {
      drawingModes: [google.maps.drawing.OverlayType.MARKER],
      position: google.maps.ControlPosition.TOP_RIGHT,
    },
  };

  // iconを表示されるように取り替える
  const setIconMode = (marker: MarkerType) => {
    if (marker) {
      setDrawingMode(google.maps.drawing.OverlayType.MARKER);
      setMarker(marker);
    } else {
      //普通の指
      setDrawingMode(null);
    }
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
        onMarkerComplete={/**markerが完了したタイミング */ () => {}}
        options={drawingManagerOption}
      />
    </>
  );
};

export default ArgumentDrawingManage;
