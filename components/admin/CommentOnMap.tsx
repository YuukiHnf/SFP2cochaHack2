import { Marker } from "@react-google-maps/api";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectPointingLocations } from "../../features/uiHelperSlice";

const CommentOnMap = () => {
  const pointingLocation = useAppSelector(selectPointingLocations);

  return (
    <>
      {pointingLocation && (
        <Marker
          position={pointingLocation.location}
          label={{
            text: pointingLocation.text,
            color: "white",
            fontWeight: "blod",
          }}
        />
      )}
    </>
  );
};

export default CommentOnMap;
