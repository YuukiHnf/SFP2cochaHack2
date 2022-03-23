import { Marker, Polygon } from "@react-google-maps/api";
import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectAdminObjects,
  selectAdminTaskBlock,
  selectAdminTaskBlockInit,
} from "../../features/adminSlice";
import { ObjectLocation, TaskBlock } from "../../utils/firebase/FirebaseStore";
import DefaultGoogleMapComponent from "../googlemap/DefaultGoogleMapComponent";
import TimeTable from "./TimeTable";

const _mapContainerStyle = {
  width: "80%",
  height: "600px",
  marginLeft: "auto",
  marginTop: "0",
  float: "left",
};

const _tableStyle: React.CSSProperties = {
  float: "left",
  width: "20%",
};

const rectAngleOption = {
  fillColor: "teal",
  fillOpactiy: 0.3,
  strokeColor: "teal",
  strokeOpacity: 0.3,
};

const HomeComponent = () => {
  const initTaskBlock = useAppSelector(selectAdminTaskBlockInit);
  const taskBlock = useAppSelector(selectAdminTaskBlock);
  const objectParams = useAppSelector(selectAdminObjects);
  const [selectedTaskBlockId, setSelectedTaskBlockId] = useState<string>(
    initTaskBlock.id
  );

  // Objectのrendering方式
  const markerJSX = (obj: ObjectLocation) => (
    <Marker
      key={obj.objectId}
      position={obj.location}
      icon={{
        url:
          objectParams.find((value) => value.id === obj.objectId)?.iconUrl ??
          "",
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(15, 15),
        scaledSize: new window.google.maps.Size(30, 30),
      }}
    />
  );

  console.log(selectedTaskBlockId);

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <div style={_tableStyle}>
          <TimeTable setter={setSelectedTaskBlockId} />
        </div>
        <DefaultGoogleMapComponent mapContainerStyle={_mapContainerStyle}>
          {selectedTaskBlockId === initTaskBlock.id ? ( // if init
            initTaskBlock.objectLocations.map(markerJSX)
          ) : selectedTaskBlockId ? ( // select taskBlock
            taskBlock
              ?.filter((block) => block.id === selectedTaskBlockId)[0]
              .objectLocations.map(markerJSX)
          ) : (
            <></>
          )}
          {/* 擬似的な全体説明用オブジェクト、後々、ここもDBからとってくるようにする or statusに入れる */}
          <Polygon
            path={[
              new google.maps.LatLng(43.080180692594475, 141.34037284277449),
              new google.maps.LatLng(43.07991425690792, 141.34044258020887),
              new google.maps.LatLng(43.07994560234294, 141.34059814833174),
              new google.maps.LatLng(43.08020666961666, 141.3405176820613),
            ]}
            options={rectAngleOption}
          />
        </DefaultGoogleMapComponent>
      </div>
    </>
  );
};

export default HomeComponent;
