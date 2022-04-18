import { InfoWindow, Marker } from "@react-google-maps/api";
import React, { useState, VFC } from "react";
import { TaskType } from "../../utils/firebase/FirebaseStore";
import { marker2Url } from "./ArgumentDrawingManage";

type Props = {
  taskdata: TaskType;
};

const TaskViewElementForGuest: VFC<Props> = ({ taskdata }) => {
  const [isTapping, setIsTapping] = useState<boolean[]>(
    taskdata.content.move.map(() => false)
  );
  const [isTappingEx, setIsTappingEx] = useState<boolean[]>(
    taskdata.content.explaing.map(() => false)
  );

  return (
    <>
      {taskdata.content.move.map((mv, index) => (
        <>
          <Marker
            key={mv.location.lat * mv.location.lng * 0.7}
            position={mv.location}
            icon={{
              url: marker2Url["HumanPos"],
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            onClick={() => {
              setIsTapping((_state) =>
                _state.map((isTap, _index) => (_index === index ? true : isTap))
              );
            }}
          />
          {isTapping[index] && (
            <InfoWindow
              position={mv.location}
              onCloseClick={() => {
                setIsTapping((_state) =>
                  _state.map((isTap, _index) =>
                    _index === index ? false : isTap
                  )
                );
              }}
            >
              <div>{mv.desc}</div>
            </InfoWindow>
          )}
        </>
      ))}
      {/* explaingの表示を出力する */}
      {taskdata.content.explaing.map((ex, index) => (
        <>
          <Marker
            key={ex.location.lat * ex.location.lng * 0.1}
            position={ex.location}
            icon={{
              url: ex.iconId ? marker2Url[ex.iconId] : "",
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            onClick={() => {
              setIsTappingEx((_state) =>
                _state.map((isTap, _index) => (_index === index ? true : isTap))
              );
            }}
          />
          {isTappingEx[index] && (
            <InfoWindow
              position={ex.location}
              onCloseClick={() => {
                setIsTappingEx((_state) =>
                  _state.map((isTap, _index) =>
                    _index === index ? false : isTap
                  )
                );
              }}
            >
              <div>{ex.desc}</div>
            </InfoWindow>
          )}
        </>
      ))}
    </>
  );
};

export default TaskViewElementForGuest;
