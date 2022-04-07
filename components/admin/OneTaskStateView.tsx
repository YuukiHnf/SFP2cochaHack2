import { InfoWindow, Marker } from "@react-google-maps/api";
import { doc, onSnapshot, TaskState } from "firebase/firestore";
import React, { useEffect, useState, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAdminObjects } from "../../features/adminSlice";
import {
  db,
  OBJECTPARAM,
  TaskProgressState,
  TaskType,
} from "../../utils/firebase/FirebaseStore";
import { inputingMarker2Url } from "../googlemap/EditingTaskViewComponent";

type Props = {
  taskId: string;
  isTapping: boolean;
};

const humanPosUrl = "/(UNDO)humanTaskIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/(input)humanTaskIcon.png?alt=media&token=2a7a1373-0953-4fa9-997b-dbdedac8ca99`;
const upUrl = "/(UNDO)upIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/(input)upIcon.png?alt=media&token=4f539cdd-5e04-4322-a9de-d2eed5ff4492`;
const rightUrl = "/(UNDO)rightIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/(input)rightIcon.png?alt=media&token=2abda230-fd6a-459e-8568-d18a004fa412`;
const downUrl = "/(UNDO)downIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/(input)downIcon.png?alt=media&token=bc36d33f-f178-4981-9042-1d4e87c9d4b2`;
const leftUrl = "/(UNDO)leftIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/(input)leftIcon.png?alt=media&token=e1ee0208-882a-4281-b3f5-d263c813a012`;

export const UNDOMarker2Url = {
  HumanPos: humanPosUrl,
  Up: upUrl,
  Down: downUrl,
  Left: leftUrl,
  Right: rightUrl,
};

const _humanPosUrl = "/(DONE)humanTaskIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/(input)humanTaskIcon.png?alt=media&token=2a7a1373-0953-4fa9-997b-dbdedac8ca99`;
const _upUrl = "/(DONE)upIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/(input)upIcon.png?alt=media&token=4f539cdd-5e04-4322-a9de-d2eed5ff4492`;
const _rightUrl = "/(DONE)rightIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/(input)rightIcon.png?alt=media&token=2abda230-fd6a-459e-8568-d18a004fa412`;
const _downUrl = "/(DONE)downIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/(input)downIcon.png?alt=media&token=bc36d33f-f178-4981-9042-1d4e87c9d4b2`;
const _leftUrl = "/(DONE)leftIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/(input)leftIcon.png?alt=media&token=e1ee0208-882a-4281-b3f5-d263c813a012`;

export const DONEMarker2Url = {
  HumanPos: _humanPosUrl,
  Up: _upUrl,
  Down: _downUrl,
  Left: _leftUrl,
  Right: _rightUrl,
};

const taskAndDataView = (
  taskData: TaskType,
  isTapping: boolean,
  state: TaskProgressState
) => {
  return (
    <>
      {taskData.content.move.map((mv) => (
        <>
          <Marker
            key={mv.location.lat * mv.location.lng * Math.random()}
            position={mv.location}
            icon={{
              url:
                state === "UNDO"
                  ? UNDOMarker2Url["HumanPos"]
                  : state === "DONE"
                  ? DONEMarker2Url["HumanPos"]
                  : inputingMarker2Url["HumanPos"],
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
          <InfoWindow position={mv.location} onCloseClick={() => {}}>
            <div
              style={{
                backgroundColor: state === "UNDO" ? "#FF9966" : "#008000",
              }}
            >
              <div>{mv.desc}</div>
              <p>
                State:
                {state === "UNDO"
                  ? "未着手"
                  : state === "DONE"
                  ? "完了"
                  : "進行中"}
              </p>
              {/* <SvgIcon
                      component={DeleteIcon}
                      onClick={() => {
                        deleteTaskInBlock(taskBlockId, taskId);
                      }}
                      //onClick={() => console.log("Delete", taskId)}
                    />
                    <SvgIcon component={EditIcon} /> */}
            </div>
          </InfoWindow>
        </>
      ))}
      {taskData.content.explaing.map((ex, index) => (
        <>
          <Marker
            key={ex.location.lat + ex.location.lng + index}
            position={ex.location}
            icon={{
              url: ex.iconId
                ? state === "UNDO"
                  ? UNDOMarker2Url[ex.iconId]
                  : state === "DONE"
                  ? DONEMarker2Url[ex.iconId]
                  : inputingMarker2Url[ex.iconId]
                : "",
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
          {/* {isTapping && (
            <InfoWindow
              key={ex.location.lat + ex.location.lng + index + 1}
              position={ex.location}
            >
              <div>
                <div>{`${taskData.title}の説明`}</div>
                <p>
                  State:
                  {state === "UNDO"
                    ? "未着手"
                    : state === "DONE"
                    ? "完了"
                    : "進行中"}
                </p>
                <p>{"Comment"}</p>
              </div>
            </InfoWindow>
          )} */}
        </>
      ))}
    </>
  );
};

const OneTaskStateView: VFC<Props> = ({ taskId, isTapping }) => {
  const [taskData, setTaskData] = useState<TaskType>();
  const objectState = useAppSelector(selectAdminObjects);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "tasks", taskId), (doc) => {
      //console.log(doc.data());
      const _data = doc.data() as Omit<TaskType, "id">;
      //console.log(doc.data());
      setTaskData({
        ..._data,
        id: doc.id,
      });
    });

    return () => unSub();
  }, [taskId]);

  if (!taskData) return <></>;
  console.log("[target]", taskData);

  const taskAndDataViewObject = (
    taskData: TaskType,
    isTapping: boolean,
    state: TaskProgressState
  ) => {
    //return <></>;
    console.log("[TEST]");
    return (
      <>
        {taskData.content.move.map((mv) => {
          // 移動後の物品情報
          const _obj = objectState.find((obj) =>
            obj.objectTimeLocations?.find((loc) => loc.id === mv.desc)
          );
          if (!_obj) {
            return <></>;
          }
          const _objLoc = _obj.objectTimeLocations?.find(
            (loc) => loc.id === mv.desc
          );
          if (!_objLoc) {
            return <></>;
          }
          return (
            <>
              <Marker
                key={_objLoc.location.lat * _objLoc.location.lng * 0.7}
                position={_objLoc.location}
                icon={{
                  url: state === "DONE" ? _obj.iconUrl : _obj.semiIconUrl,
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
                onClick={() => {}}
              />
              {!(state === "UNDO") && (
                <InfoWindow position={_objLoc.location}>
                  <div
                    style={{
                      backgroundColor: state === "DONE" ? "#808080" : "#008000",
                    }}
                  >
                    <div>{mv.desc}</div>
                    <p>
                      State:
                      {state === "DONE" ? "完了" : "進行中"}
                    </p>
                  </div>
                </InfoWindow>
              )}
            </>
          );
        })}
        {/* 移動まえの表示を出力する */}
        {taskData.content.explaing.map((ex, index) => {
          // 移動前の物品情報
          const _obj = objectState.find((obj) =>
            obj.objectTimeLocations?.find((loc) => loc.id === ex.desc)
          );
          if (!_obj) {
            return <></>;
          }
          const _objLoc = _obj.objectTimeLocations?.find(
            (loc) => loc.id === ex.desc
          );
          if (!_objLoc) {
            return <></>;
          }
          return (
            <>
              <Marker
                key={_objLoc.location.lat * _objLoc.location.lng * 0.1}
                position={_objLoc.location}
                icon={{
                  url:
                    state === "UNDO"
                      ? _obj.iconUrl
                      : state === "DONE"
                      ? _obj.semiIconUrl
                      : _obj.semiIconUrl,
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
                onClick={() => {}}
              />
              {!(state === "DONE") && (
                <InfoWindow position={_objLoc.location} onCloseClick={() => {}}>
                  <div
                    style={{
                      backgroundColor: state === "UNDO" ? "#FF9966" : "#008000",
                    }}
                  >
                    <div>移動タスク</div>
                    <div>State: {state === "UNDO" ? "未着手" : "進行中"}</div>
                  </div>
                </InfoWindow>
              )}
            </>
          );
        })}
      </>
    );
  };

  /**
   * Humanタスクの場合
   */
  if (taskData.kindOf === "HUMAN") {
    switch (taskData.taskState) {
      case "UNDO":
        return taskAndDataView(taskData, isTapping, "UNDO");
      case "DOING":
      case "CHECK":
        return taskAndDataView(taskData, isTapping, "DOING");
      case "DONE":
        return taskAndDataView(taskData, isTapping, "DONE");
    }
  }
  /**
   * Objectタスクの場合
   */
  switch (taskData.taskState) {
    case "UNDO":
      return taskAndDataViewObject(taskData, isTapping, "UNDO");
    case "DOING":
    case "CHECK":
      return taskAndDataViewObject(taskData, isTapping, "DOING");
    case "DONE":
      return taskAndDataViewObject(taskData, isTapping, "DONE");
  }
};

export default OneTaskStateView;
