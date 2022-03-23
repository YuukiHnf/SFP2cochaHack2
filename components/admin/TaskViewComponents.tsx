import { InfoWindow, Marker } from "@react-google-maps/api";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, VFC } from "react";
import { db, TaskType } from "../../utils/firebase/FirebaseStore";
import { marker2Url } from "../googlemap/ArgumentDrawingManage";

type Props = {
  taskId: string;
};

const TaskViewComponents: VFC<Props> = ({ taskId }) => {
  const [taskdata, setTaskdata] = useState<TaskType>();
  const [selectedExplainIndex, setSelectedExplainIndex] = useState<number>(-1);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "tasks", taskId), (doc) => {
      //console.log(doc.data());
      const _data = doc.data() as Omit<TaskType, "id">;
      setTaskdata({
        ..._data,
        id: doc.id,
      });
    });

    return () => unSub();
  }, [taskId]);

  console.log(taskdata);

  if (!taskdata) return <></>;

  return (
    <>
      {/* moveの表示を出力する */}
      {taskdata.content.move.map((mv) => (
        <>
          <Marker
            key={mv.location.lat * mv.location.lng}
            position={mv.location}
            icon={{
              url: marker2Url["HumanPos"],
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
          <InfoWindow position={mv.location}>
            <div>{mv.desc}</div>
          </InfoWindow>
        </>
      ))}
      {/* explaingの表示を出力する */}
      {taskdata.content.explaing.map((ex, index) => (
        <>
          <Marker
            key={ex.location.lat * ex.location.lng}
            position={ex.location}
            icon={{
              url: ex.iconId ? marker2Url[ex.iconId] : "",
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            onClick={() => setSelectedExplainIndex(index)}
          />
          {selectedExplainIndex === index && (
            <InfoWindow
              position={ex.location}
              onCloseClick={() => setSelectedExplainIndex(-1)}
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
