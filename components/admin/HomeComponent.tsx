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
import MemberLocation from "./MemberLocation";
import MultiToggleMode from "./MultiToggleMode";
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

  // UIの表示Toggleボタン
  const [UIToggle, setUIToggle] = useState(() => ["MemberPosition"]);
  console.log(UIToggle);

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <div style={_tableStyle}>
          <TimeTable setter={setSelectedTaskBlockId} />
        </div>
        <DefaultGoogleMapComponent mapContainerStyle={_mapContainerStyle}>
          <MultiToggleMode formats={UIToggle} setFormats={setUIToggle} />
          {/* UIレイヤーの表示 */}
          {UIToggle.map((mode) => {
            switch (mode) {
              case "MemberPosition":
                return (
                  <>
                    <MemberLocation />
                  </>
                );
              default:
                return <></>;
            }
          })}
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
          {selectedTaskBlockId ? ( // select taskBlock
            <>
              <HomeObjectComponent selectedTaskBlockId={selectedTaskBlockId} />
            </>
          ) : (
            <></>
          )}
          ) : (<></>){/* 全体説明用オブジェクト*/}
          <MapSettingComponent />
        </DefaultGoogleMapComponent>
      </div>
    </>
  );
};

export default HomeComponent;
