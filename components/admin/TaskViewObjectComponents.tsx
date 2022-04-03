import { InfoWindow, Marker } from "@react-google-maps/api";
import React, { VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAdminObjects } from "../../features/adminSlice";
import { TaskType } from "../../utils/firebase/FirebaseStore";

type Props = {
  taskdata: TaskType;
};

const TaskViewObjectComponents: VFC<Props> = ({ taskdata }) => {
  console.log(taskdata);
  const objectState = useAppSelector(selectAdminObjects);

  return (
    <>
      {/* 移動事後の出力 */}
      {taskdata.content.move.map((mv) => {
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
                url: _obj.iconUrl,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
              onClick={() => {}}
            />
            {false && (
              <InfoWindow position={mv.location}>
                <div>{mv.desc}</div>
              </InfoWindow>
            )}
          </>
        );
      })}
      {/* 移動まえの表示を出力する */}
      {taskdata.content.explaing.map((ex, index) => {
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
                url: _obj.semiIconUrl,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
              onClick={() => {}}
            />
            {/* {selectedExplainId === index && (
            <InfoWindow
              position={ex.location}
              onCloseClick={() => {
                setSelectedExplainId(-1);
                onClickAnyObject("");
              }}
            >
              <div>{ex.desc}</div>
            </InfoWindow>
          )} */}
          </>
        );
      })}
    </>
  );
};

export default TaskViewObjectComponents;
