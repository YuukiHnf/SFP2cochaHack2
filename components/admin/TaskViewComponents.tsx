import { InfoWindow, Marker } from "@react-google-maps/api";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, VFC } from "react";
import { db, TaskType } from "../../utils/firebase/FirebaseStore";
import { marker2Url } from "../googlemap/ArgumentDrawingManage";
import TaskViewObjectComponents from "./TaskViewObjectComponents";

type Props = {
  taskId: string;
  onClickAnyObject: (_id: string) => void;
};

/**
 * 指定のタスクに対する表示をサポートするやつ
 * @param param0
 * @returns
 */

const TaskViewComponents: VFC<Props> = ({ taskId, onClickAnyObject }) => {
  const [taskdata, setTaskdata] = useState<TaskType>();
  const [selectedExplainId, setSelectedExplainId] = useState<number>(-1);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "tasks", taskId), (doc) => {
      //console.log(doc.data());
      if (doc.exists()) {
        const _data = doc.data() as Omit<TaskType, "id">;
        setTaskdata({
          ..._data,
          id: doc.id,
        });
      }
    });

    return () => unSub();
  }, [taskId]);

  if (!taskdata) return <></>;
  /**
   * Objectタスクの表示
   */
  if (taskdata.kindOf === "OBJECT")
    return <TaskViewObjectComponents taskdata={taskdata} />;

  /**
   * Humanタスクの表示
   */
  //console.log(taskdata);
  return (
    <>
      {/* moveの表示を出力する */}
      {taskdata.content.move.map((mv) => (
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
            onClick={() => onClickAnyObject(taskId)}
          />
          {false && (
            <InfoWindow position={mv.location}>
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
              //setSelectedExplainId(index);
              onClickAnyObject(taskId);
            }}
          />
          {selectedExplainId === index && (
            <InfoWindow
              position={ex.location}
              onCloseClick={() => {
                setSelectedExplainId(-1);
                onClickAnyObject("");
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

export default TaskViewComponents;
