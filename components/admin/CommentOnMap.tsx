import { Marker } from "@react-google-maps/api";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectChatInput,
  selectPointingLocations,
} from "../../features/uiHelperSlice";

const CommentOnMap = () => {
  const pointingLocation = useAppSelector(selectPointingLocations);
  const chatInput = useAppSelector(selectChatInput);

  return (
    <>
      {/* すでにあるチャットの選択 */}
      {pointingLocation?.location && (
        <Marker
          position={pointingLocation.location}
          label={{
            text: pointingLocation.text,
            color: "white",
          }}
        />
      )}
      {/* 今入力しているチャット */}
      {chatInput.pointerLocation && (
        <Marker
          position={chatInput.pointerLocation}
          label={{
            text: chatInput.commentText,
            color: "white",
            fontWeight: "blod",
          }}
        />
      )}
    </>
  );
};

export default CommentOnMap;
