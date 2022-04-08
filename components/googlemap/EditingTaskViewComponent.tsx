import { InfoWindow, Marker } from "@react-google-maps/api";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, VFC } from "react";
import { db, TaskType } from "../../utils/firebase/FirebaseStore";

// info window のIcon
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, SvgIcon } from "@mui/material";
import useTaskCRUD from "../../hooks/useTaskCRUD";
import { useAppSelector } from "../../app/hooks";
import { selectBasicInfo } from "../../features/basicInfoSlice";

type Props = {
  taskId: string;
  taskBlockId: string;
  onClickSelectedTaskId: (_id: string) => void;
};

const humanPosUrl = "/(input)humanTaskIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/(input)humanTaskIcon.png?alt=media&token=2a7a1373-0953-4fa9-997b-dbdedac8ca99`;
const upUrl = "/(input)upIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/(input)upIcon.png?alt=media&token=4f539cdd-5e04-4322-a9de-d2eed5ff4492`;
const rightUrl = "/(input)rightIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/(input)rightIcon.png?alt=media&token=2abda230-fd6a-459e-8568-d18a004fa412`;
const downUrl = "/(input)downIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/(input)downIcon.png?alt=media&token=bc36d33f-f178-4981-9042-1d4e87c9d4b2`;
const leftUrl = "/(input)leftIcon.png"; //`http://localhost:9199/v0/b/default-bucket/o/(input)leftIcon.png?alt=media&token=e1ee0208-882a-4281-b3f5-d263c813a012`;

export const inputingMarker2Url = {
  HumanPos: humanPosUrl,
  Up: upUrl,
  Down: downUrl,
  Left: leftUrl,
  Right: rightUrl,
};

const EditingTaskViewComponent: VFC<Props> = ({
  taskId,
  taskBlockId,
  onClickSelectedTaskId,
}) => {
  const basicInfo = useAppSelector(selectBasicInfo);
  const [taskdata, setTaskdata] = useState<TaskType>();
  const [selectedExplainIndex, setSelectedExplainIndex] = useState<number>(-1);
  const { deleteTaskInBlock } = useTaskCRUD();

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

  //console.log(taskdata);

  if (!taskdata) return <></>;
  /**
   * Objectタスクの表示
   */
  if (taskdata.kindOf === "OBJECT") return <></>;

  /**
   * Humanタスクの表示
   */
  return (
    <>
      {/* moveの表示を出力する */}
      {taskdata.content.move.map((mv) => (
        <>
          <Marker
            key={mv.location.lat * mv.location.lng * Math.random()}
            position={mv.location}
            icon={{
              url: inputingMarker2Url["HumanPos"],
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
          <InfoWindow
            position={mv.location}
            onCloseClick={() => {
              onClickSelectedTaskId("");
            }}
          >
            <>
              <div>{mv.desc}</div>
              <p>{`必要人数:${taskdata.memberNum}`}</p>
              <p>{`担当:${
                taskdata.by.length === 0 ? "未定" : taskdata.by.join(",")
              }`}</p>
              <SvgIcon
                component={DeleteIcon}
                onClick={() => {
                  deleteTaskInBlock(taskBlockId, taskId);
                }}
                //onClick={() => console.log("Delete", taskId)}
              />
              <SvgIcon component={EditIcon} />
            </>
          </InfoWindow>
        </>
      ))}
      {/* explaingの表示を出力する */}
      {taskdata.content.explaing.map((ex, index) => (
        <>
          <Marker
            key={ex.location.lat * ex.location.lng * Math.random()}
            position={ex.location}
            icon={{
              url: ex.iconId ? inputingMarker2Url[ex.iconId] : "",
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
          {
            <InfoWindow position={ex.location}>
              <>
                <div>{ex.desc}</div>
              </>
            </InfoWindow>
          }
        </>
      ))}
    </>
  );
};

export default EditingTaskViewComponent;
