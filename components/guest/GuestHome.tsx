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
import useUserHooks from "../../hooks/useUserHooks";

const _mapContainerStyle = {
  width: "90%",
  height: "550px",
  margin: "0 auto",
};

export type GuestInputType = {
  commentText: string;
  pointerLocation: Location | null;
};

export type PointingLocationType = {
  location: Location;
  text: string;
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
  const { uploadMyLocation } = useUserHooks();

  // UIのMode切り替え
  const [UIMode, setUIMode] = useState<GuestUIMode>("Origin");
  console.log(UIMode);

  /**Comment系の処理 */
  const [guestInput, setGuestInput] = useState<GuestInputType>(initGuestInput);
  const { uploadComment } = useCommentHooks();

  // comment用のposition
  const [pointingLocation, setPointingLocation] =
    useState<PointingLocationType | null>(null);

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
    guestInput.pointerLocation
      ? uploadComment(
          {
            text: guestInput.commentText,
            sendBy: basicInfo.userId,
            location: guestInput.pointerLocation,
          },
          taskId
        )
      : uploadComment(
          { text: guestInput.commentText, sendBy: basicInfo.userId },
          taskId
        );

    //init
    setGuestInput(initGuestInput);
    setUIMode("Origin");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPtrLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      uploadMyLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      console.log(position.coords);
    });
  }, []);

  return (
    <div style={{ margin: "0 auto" }}>
      <DefaultGoogleMapComponent
        mapContainerStyle={_mapContainerStyle}
        onClick={
          UIMode === "Inputting"
            ? (e: google.maps.MapMouseEvent) => {
                setGuestInput((_state) =>
                  e.latLng
                    ? {
                        ..._state,
                        pointerLocation: {
                          lat: e.latLng?.lat(),
                          lng: e.latLng?.lng(),
                        },
                      }
                    : _state
                );
              }
            : () => {}
        }
        mapStyle={UIMode === "Inputting" ? "Modest" : "Origin"}
      >
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
          {/* GuestからCommentとして持ちたい位置情報を表示 */}
          {guestInput.pointerLocation && (
            <Marker
              position={guestInput.pointerLocation}
              label={guestInput.commentText}
            />
          )}
          {pointingLocation && (
            <Marker
              position={pointingLocation.location}
              label={pointingLocation.text}
            />
          )}
        </>
      </DefaultGoogleMapComponent>
      <div
        style={{ marginLeft: "30px", position: "relative", display: "flex" }}
      >
        <Button
          variant="outlined"
          color={UIMode === "Origin" ? "error" : "success"}
          onClick={() => {
            UIMode === "Origin" ? setUIMode("Inputting") : setUIMode("Origin");
          }}
        >
          {UIMode === "Origin" ? "場所を伝える" : "戻る"}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setGuestInput((_state) => ({
              ..._state,
              pointerLocation: initGuestInput.pointerLocation,
            }));
            setPointingLocation(null);
          }}
        >
          {"場所取り消し"}
        </Button>
      </div>

      {/* コメント部分のUI */}
      {guestTaskState[0] && (
        <>
          <div
            style={{
              marginLeft: "30px",
              position: "relative",
              display: "flex",
            }}
          >
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
              style={{ width: "80%" }}
              value={guestInput.commentText}
              onChange={(e) =>
                setGuestInput((_state) => ({
                  ..._state,
                  commentText: e.target.value,
                }))
              }
              onFocus={(e) => {
                //setUIMode("Inputting");
              }}
              onBlur={(e) => {
                //setUIMode("Origin");
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
          <GuestComment
            taskId={guestTaskState[0].id}
            setPointingLocation={setPointingLocation}
          />
        </>
      )}
    </div>
  );
};

export default GuestHome;
