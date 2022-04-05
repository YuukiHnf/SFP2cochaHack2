import { Marker } from "@react-google-maps/api";
import React, { useEffect, useState, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectGuestTaskState } from "../../features/guestSlice";
import { Location } from "../../utils/firebase/FirebaseStore";
import DefaultGoogleMapComponent from "../googlemap/DefaultGoogleMapComponent";
import Direction from "../googlemap/Direction";
import TaskViewElementForGuest from "../googlemap/TaskViewElementForGuest";
import GuestComment from "./GuestComment";

const _mapContainerStyle = {
  width: "90%",
  height: "550px",
  margin: "0 auto",
};

const GuestHome: VFC = () => {
  const guestTaskState = useAppSelector(selectGuestTaskState);
  const [ptrLocation, setPtrLocation] = useState<Location>({ lat: 0, lng: 0 });

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
      {guestTaskState[0] && <GuestComment taskId={guestTaskState[0].id} />}
    </div>
  );
};

export default GuestHome;
