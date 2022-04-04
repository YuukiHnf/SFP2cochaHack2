import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectGuestTaskState } from "../../features/guestSlice";
import DefaultGoogleMapComponent from "../googlemap/DefaultGoogleMapComponent";
import TaskViewElementForGuest from "../googlemap/TaskViewElementForGuest";

const _mapContainerStyle = {
  width: "90%",
  height: "550px",
  marginLeft: "auto",
  marginTop: "0",
  float: "left",
};

const GuestHome = () => {
  const guestTaskState = useAppSelector(selectGuestTaskState);
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
        </>
      </DefaultGoogleMapComponent>
    </div>
  );
};

export default GuestHome;
