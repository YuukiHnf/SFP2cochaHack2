import { DrawingManager, Marker, Polygon } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectAdminObjects,
  selectAdminTaskBlock,
  // selectAdminInitObjects,
} from "../../features/adminSlice";
import { ObjectLocation, TaskBlock } from "../../utils/firebase/FirebaseStore";
import ArgumentDrawingManage from "../googlemap/ArgumentDrawingManage";
import DefaultGoogleMapComponent from "../googlemap/DefaultGoogleMapComponent";
import MapSettingComponent from "../googlemap/MapSettingComponent";
import HomeObjectComponent from "./HomeObjectComponent";
import TaskViewComponents from "./TaskViewComponents";
import TaskViewForTaskIdsComponents from "./TaskViewForTaskIdsComponents";
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
  const taskBlock = useAppSelector(selectAdminTaskBlock);
  const initTaskBlockId = taskBlock?.find((block) => block.isInit)?.id ?? "";
  const objectParams = useAppSelector(selectAdminObjects);
  const [selectedTaskBlockId, setSelectedTaskBlockId] = useState<string>("");

  // Objectのrendering方式
  const markerJSX = (obj: ObjectLocation) => (
    <Marker
      key={obj.objectId}
      position={obj.locationTime.location}
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
  // console.log(
  //   taskBlock?.filter((block) => block.id === selectedTaskBlockId)[0]
  // );

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <div style={_tableStyle}>
          <TimeTable setter={setSelectedTaskBlockId} />
        </div>
        <DefaultGoogleMapComponent mapContainerStyle={_mapContainerStyle}>
          {/* 描画用のComponent */}
          <ArgumentDrawingManage taskBlockId={selectedTaskBlockId} />
          {/* タスク提示用のComponent */}
          {(taskBlock?.filter(
            (block) => block.id === selectedTaskBlockId
          )[0] && (
            <TaskViewForTaskIdsComponents
              taskIds={
                taskBlock?.filter(
                  (block) => block.id === selectedTaskBlockId
                )[0].taskIds
              }
              taskBlockId={selectedTaskBlockId}
            />
          )) ?? <></>}
          {/* この時のObject用の描画ツール */}
          {/* Objectを指定した時間ごとに描画する */}
          {
            /*selectedTaskBlockId === initTaskBlockId ? ( // if init
            initObjectLocations.map(markerJSX)
          ) :*/ selectedTaskBlockId ? ( // select taskBlock
              <>
                <HomeObjectComponent
                  selectedTaskBlockId={selectedTaskBlockId}
                />
              </>
            ) : (
              <></>
            )
          }
          //それぞれのObjectを表示させる場所 ) : (<></>)
          {/* 擬似的な全体説明用オブジェクト、後々、ここもDBからとってくるようにする or statusに入れる */}
          <MapSettingComponent />
        </DefaultGoogleMapComponent>
      </div>
    </>
  );
};

export default HomeComponent;
