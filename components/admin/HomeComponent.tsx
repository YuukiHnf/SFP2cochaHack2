import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectAdminObjects,
  selectAdminTaskBlock,
  // selectAdminInitObjects,
} from "../../features/adminSlice";
import {
  selectInputType,
  setChatInputLocation,
} from "../../features/uiHelperSlice";
import { ObjectLocation, TaskBlock } from "../../utils/firebase/FirebaseStore";
import ArgumentDrawingManage from "../googlemap/ArgumentDrawingManage";
import DefaultGoogleMapComponent from "../googlemap/DefaultGoogleMapComponent";
import MapSettingComponent from "../googlemap/MapSettingComponent";
import CommentCard from "./CommentCard";
import CommentOnMap from "./CommentOnMap";
import HomeObjectComponent from "./HomeObjectComponent";
import HomeObjectView from "./HomeObjectView";
import InputTypeToggle from "./InputTypeToggle";
import MemberLocation from "./MemberLocation";
import MultiToggleMode from "./MultiToggleMode";
import TaskStateView from "./TaskStatesView";
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
  const [selectedTaskBlockId, setSelectedTaskBlockId] = useState<string>("");

  // UIの表示Toggleボタン
  const [UIToggle, setUIToggle] = useState(() => ["MemberPosition"]);
  //console.log(UIToggle);
  const InputType = useAppSelector(selectInputType);
  const dispatch = useAppDispatch();

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <div style={_tableStyle}>
          <TimeTable setter={setSelectedTaskBlockId} />
        </div>
        <DefaultGoogleMapComponent
          mapContainerStyle={_mapContainerStyle}
          mapStyle={
            UIToggle.includes("TaskState")
              ? "Dark"
              : InputType === "ADD"
              ? "Green"
              : "Origin"
          } //Mapの色を変える
          onClick={
            InputType === "CHATINPUT"
              ? (e) => {
                  //chat用のInput
                  e.latLng &&
                    dispatch(
                      setChatInputLocation({
                        lat: e.latLng?.lat(),
                        lng: e.latLng?.lng(),
                      })
                    );
                }
              : () => {}
          }
        >
          <MultiToggleMode formats={UIToggle} setFormats={setUIToggle} />
          {!UIToggle.includes("TaskState") && <InputTypeToggle />}
          {/* UIレイヤーの表示 */}
          {UIToggle.map((mode) => {
            switch (mode) {
              case "MemberPosition":
                return (
                  <>
                    <MemberLocation />
                  </>
                );
              case "TaskState":
                return (
                  <>
                    {taskBlock?.filter(
                      (block) => block.id === selectedTaskBlockId
                    )[0] && (
                      <TaskStateView
                        taskIds={
                          taskBlock?.filter(
                            (block) => block.id === selectedTaskBlockId
                          )[0].taskIds
                        }
                      />
                    )}
                  </>
                );
              default:
                return <></>;
            }
          })}
          {/* 描画用のComponent */}
          {!UIToggle.includes("TaskState") && InputType === "ADD" && (
            <ArgumentDrawingManage taskBlockId={selectedTaskBlockId} />
          )}
          {/* タスク提示用のComponent */}
          {(!UIToggle.includes("TaskState") &&
            taskBlock?.filter(
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
          {!UIToggle.includes("TaskState") && selectedTaskBlockId ? ( // select taskBlock
            <>
              {InputType === "ADD" ? (
                // タスクを追加するとき
                <HomeObjectComponent
                  selectedTaskBlockId={selectedTaskBlockId}
                />
              ) : (
                // Objectを普通に表示する時
                <HomeObjectView
                  selectedTaskBlockId={selectedTaskBlockId}
                ></HomeObjectView>
              )}
            </>
          ) : (
            <></>
          )}
          ) : (<></>){/* 全体説明用オブジェクト*/}
          <MapSettingComponent />
          {/* commentの表示用 */}
          <CommentOnMap />
        </DefaultGoogleMapComponent>
      </div>
      <div>
        <CommentCard />
      </div>
    </>
  );
};

export default HomeComponent;
