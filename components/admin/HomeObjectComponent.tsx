import { memo, useEffect, useState, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectAdminObjects,
  selectAdminTaskBlock,
  selectAdminTimeSche,
} from "../../features/adminSlice";
import useObjectHooks from "../../hooks/useObjectHooks";
import useTaskCRUD from "../../hooks/useTaskCRUD";
import { ObjectLocation } from "../../utils/firebase/FirebaseStore";
import DragDropMarker from "../googlemap/DragDropMarker";
import { TaskDialog } from "./TaskDialog";

type Props = {
  selectedTaskBlockId: string;
};

interface ObjectTaskstate {
  objectId: string;
  timeLocationId: string;
  mouseEvent: google.maps.MapMouseEvent | null;
}

const initTimeObject: ObjectTaskstate = {
  objectId: "",
  timeLocationId: "",
  mouseEvent: null,
};

/**
 * Objectをタスク操作する画面
 * @param param0
 * @returns
 */

const HomeObjectComponent: VFC<Props> = ({ selectedTaskBlockId }) => {
  const taskBlocks = useAppSelector(selectAdminTaskBlock);
  const objectParams = useAppSelector(selectAdminObjects);
  const ptrDate = taskBlocks
    ?.filter((block) => block.id === selectedTaskBlockId)[0]
    .time?.toDate();
  const timeSchedule = useAppSelector(selectAdminTimeSche);
  // 表示するObjectを時間から算出して保存するState
  const [ptrLocations, setPtrLocations] = useState<ObjectLocation[]>([]);

  const { Date2ObjectsLocations } = useObjectHooks();
  useEffect(() => {
    // 現在選択されているtaskBlockの始まる時間
    if (!taskBlocks) {
      return;
    }
    // 現在選択されているObjectのLocationを算出
    if (ptrDate) {
      setPtrLocations(Date2ObjectsLocations(ptrDate));
    }
  }, [selectedTaskBlockId]);

  /**タスク追加系 */
  // 操作中のObject ID
  const [ptrTimeObject, setPtrTimeObject] =
    useState<ObjectTaskstate>(initTimeObject);
  const { addObjectTaskInBlock } = useTaskCRUD();
  const [addOpen, setAddOpen] = useState<boolean>(false);

  const onHandleSave = (title: string) => {
    if (
      ptrTimeObject === initTimeObject ||
      !ptrDate ||
      !ptrTimeObject.mouseEvent
    ) {
      return;
    }

    addObjectTaskInBlock(
      ptrTimeObject.mouseEvent,
      selectedTaskBlockId,
      ptrDate,
      ptrTimeObject.objectId,
      ptrTimeObject.timeLocationId,
      title
    );

    setPtrTimeObject(initTimeObject);
  };

  return (
    <>
      {ptrLocations.map((loc, index) => (
        <DragDropMarker
          key={
            index *
            loc.objectId.length *
            loc.locationTime.location.lat *
            loc.locationTime.location.lng
          }
          position={loc.locationTime.location}
          icon={{
            url:
              //loc.id === ptrObjectId
              objectParams.find((value) => value.id === loc.objectId)
                ?.iconUrl ?? "",
            // : objectParams.find((value) => value.id === obj.id)
            //     ?.semiIconUrl ?? "",
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
          onStartDrag={() =>
            setPtrTimeObject((_state) => ({
              ..._state,
              objectId: loc.objectId,
              timeLocationId: loc.locationTime.id,
            }))
          }
          //onEndDrag={(e) => onHandleSave(e)}
          onEndDrag={(e) => {
            setAddOpen(true);
            setPtrTimeObject((_state) => ({
              ..._state,
              mouseEvent: e,
            }));
          }}
          draggable={timeSchedule.start?.toDate() !== ptrDate}
        />
      ))}
      <TaskDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onExplaing={onHandleSave}
        _inputTitle={"物品移動"}
      />
    </>
  );
};

export default memo(HomeObjectComponent);
