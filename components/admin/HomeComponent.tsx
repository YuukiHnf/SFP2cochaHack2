import { DrawingManager, Marker, Polygon } from "@react-google-maps/api";
import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectAdminObjects,
  selectAdminTaskBlock,
  selectAdminTaskBlockInit,
} from "../../features/adminSlice";
import { ObjectLocation, TaskBlock } from "../../utils/firebase/FirebaseStore";
import ArgumentDrawingManage from "../googlemap/ArgumentDrawingManage";
import DefaultGoogleMapComponent from "../googlemap/DefaultGoogleMapComponent";
import MapSettingComponent from "../googlemap/MapSettingComponent";
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
          <ArgumentDrawingManage />
          {/* Objectを指定した時間ごとに描画する */}
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
          <MapSettingComponent />
        </DefaultGoogleMapComponent>
      </div>
    </>
  );
};

export default HomeComponent;
