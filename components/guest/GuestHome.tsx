import { Marker } from "@react-google-maps/api";
import React, { useEffect, useState, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectGuestTaskState } from "../../features/guestSlice";
import { Location } from "../../utils/firebase/FirebaseStore";
import DefaultGoogleMapComponent from "../googlemap/DefaultGoogleMapComponent";
import TaskViewElementForGuest from "../googlemap/TaskViewElementForGuest";

const _mapContainerStyle = {
  width: "90%",
  height: "550px",
  marginLeft: "auto",
  marginTop: "0",
  float: "left",
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
    <div>
      <DefaultGoogleMapComponent mapContainerStyle={_mapContainerStyle}>
        <>
          {guestTaskState[0] && (
            <TaskViewElementForGuest
              key={guestTaskState[0].id}
              taskdata={guestTaskState[0]}
            />
          )}
          <Marker title={"here"} position={ptrLocation} />
        </>
      </DefaultGoogleMapComponent>
    </div>
  );
};

export default GuestHome;
