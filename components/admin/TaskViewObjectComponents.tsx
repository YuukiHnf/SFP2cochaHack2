import { InfoWindow, Marker } from "@react-google-maps/api";
import React, { useState, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAdminObjects } from "../../features/adminSlice";
import { TaskType } from "../../utils/firebase/FirebaseStore";

type Props = {
  taskdata: TaskType;
};

const TaskViewObjectComponents: VFC<Props> = ({ taskdata }) => {
  //console.log(taskdata);
  const objectState = useAppSelector(selectAdminObjects);
  const [isSelected, setIsSelected] = useState<boolean>(false);

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
                scaledSize: isSelected
                  ? new window.google.maps.Size(40, 40)
                  : new window.google.maps.Size(30, 30),
              }}
              onClick={(e) => setIsSelected(true)}
              zIndex={2}
            />
            {isSelected && (
              <InfoWindow
                position={_objLoc.location}
                onCloseClick={() => setIsSelected(false)}
              >
                <>
                  <div style={{ fontWeight: "bold" }}>{"移動タスク"}</div>
                  <p>{"移動後"}</p>
                  <p>{`担当:${taskdata.by === "" ? "未定" : taskdata.by}`}</p>
                </>
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
                scaledSize: isSelected
                  ? new window.google.maps.Size(40, 40)
                  : new window.google.maps.Size(30, 30),
              }}
              onClick={(e) => setIsSelected(true)}
              zIndex={0}
            />
            {isSelected && (
              <InfoWindow
                position={_objLoc.location}
                onCloseClick={() => {
                  setIsSelected(false);
                }}
              >
                <>
                  <p>{"移動前"}</p>
                </>
              </InfoWindow>
            )}
          </>
        );
      })}
    </>
  );
};

export default TaskViewObjectComponents;
