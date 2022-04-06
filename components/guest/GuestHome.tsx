import { Marker } from "@react-google-maps/api";
import React, { useEffect, useState, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectBasicInfo } from "../../features/basicInfoSlice";
import { selectGuestTaskState } from "../../features/guestSlice";
import useCommentHooks from "../../hooks/useCommentHooks";
import { Location } from "../../utils/firebase/FirebaseStore";
import DefaultGoogleMapComponent from "../googlemap/DefaultGoogleMapComponent";
import Direction from "../googlemap/Direction";
import TaskViewElementForGuest from "../googlemap/TaskViewElementForGuest";
import GuestComment from "./GuestComment";

import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const _mapContainerStyle = {
  width: "90%",
  height: "550px",
  margin: "0 auto",
};

export type GuestInputType = {
  commentText: string;
  pointerLocation: Location | null;
};

const initGuestInput: GuestInputType = {
  commentText: "",
  pointerLocation: null,
};

type GuestUIMode = "Origin" | "Inputting";

const GuestHome: VFC = () => {
  const guestTaskState = useAppSelector(selectGuestTaskState);
  const basicInfo = useAppSelector(selectBasicInfo);
  const [ptrLocation, setPtrLocation] = useState<Location>({ lat: 0, lng: 0 });

  // UIのMode切り替え
  const [UIMode, setUIMode] = useState<GuestUIMode>("Origin");
  console.log(UIMode);

  /**Comment系の処理 */
  const [guestInput, setGuestInput] = useState<GuestInputType>(initGuestInput);
  const { uploadComment } = useCommentHooks();

  const handleCommentUpload = (taskId: string) => {
    if (guestInput.commentText.length === 0) {
      return;
    }
    var imageUrl = "";
    if (!guestInput.pointerLocation) {
      //locationの画像と、場所をexplaingに追加する
      // imageUrl = "....";
    }

    //upload
    imageUrl === ""
      ? uploadComment(
          { text: guestInput.commentText, sendBy: basicInfo.userId },
          taskId
        )
      : uploadComment(
          {
            text: guestInput.commentText,
            sendBy: basicInfo.userId,
            photoUrl: imageUrl,
          },
          taskId
        );

    //init
    setGuestInput(initGuestInput);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPtrLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      console.log(position.coords);
    });
  }, []);

  return (
    <div style={{ margin: "0 auto" }}>
      <DefaultGoogleMapComponent mapContainerStyle={_mapContainerStyle}>
        <>
          {guestTaskState[0] ? (
            <TaskViewElementForGuest
              key={guestTaskState[0].id}
              taskdata={guestTaskState[0]}
            />
          ) : (
            <div>休憩</div>
          )}
          {/* <Marker title={"here"} position={ptrLocation} /> */}
          {guestTaskState[0] && (
            <Direction
              origin={ptrLocation}
              destination={guestTaskState[0].content.move[0].location}
            />
          )}
        </>
      </DefaultGoogleMapComponent>
      {guestTaskState[0] && (
        <>
          <div
            style={{ margin: "30px", position: "relative", display: "flex" }}
          >
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
              style={{ width: "80%" }}
              value={guestInput.commentText}
              onChange={(e) =>
                setGuestInput({ ...guestInput, commentText: e.target.value })
              }
              onFocus={(e) => {
                setUIMode("Inputting");
              }}
              onBlur={(e) => {
                setUIMode("Origin");
              }}
            />
            <Button
              size="small"
              variant="outlined"
              fullWidth={false}
              color="inherit"
              onClick={() => {
                handleCommentUpload(guestTaskState[0].id);
              }}
              disabled={guestInput.commentText.length === 0}
            >
              <SendIcon style={{ width: "90%", flex: "right" }} />
            </Button>
          </div>
          <GuestComment taskId={guestTaskState[0].id} />
        </>
      )}
    </div>
  );
};

export default GuestHome;
