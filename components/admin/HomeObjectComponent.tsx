import { Marker } from "@react-google-maps/api";
import { useEffect, useState, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectAdminObjects,
  selectAdminTaskBlock,
} from "../../features/adminSlice";
import {
  ObjectLocation,
  ObjectTimeLocations,
} from "../../utils/firebase/FirebaseStore";
import DragDropMarker from "../googlemap/DragDropMarker";

type Props = {
  selectedTaskBlockId: string;
};

interface ObjectTaskstate {
  objectId: string;
  timeLocationId: string;
}

const initTimeObject: ObjectTaskstate = {
  objectId: "",
  timeLocationId: "",
};

const HomeObjectComponent: VFC<Props> = ({ selectedTaskBlockId }) => {
  const taskBlocks = useAppSelector(selectAdminTaskBlock);
  const objectParams = useAppSelector(selectAdminObjects);
  // 表示するObjectを時間から算出して保存するState
  const [ptrLocations, setPtrLocations] = useState<ObjectLocation[]>([]);
  useEffect(() => {
    // 現在選択されているtaskBlockの始まる時間
    if (!taskBlocks) {
      return;
    }
    const ptrDate = taskBlocks
      ?.filter((block) => block.id === selectedTaskBlockId)[0]
      .time?.toDate();
    // 現在選択されているObjectのLocationを算出
    if (ptrDate) {
      // objectTimeLocationがソートされていることに注意
      const targetTimeLocationsIndex: number[] = objectParams.map(
        (param) =>
          param.objectTimeLocations?.findIndex(
            (timeLoc) => timeLoc.timeStamp.toDate() >= ptrDate
          ) ?? 0
      );
      //console.log(targetTimeLocationsIndex);
      setPtrLocations(
        objectParams.map((param, index) => {
          if (!param.objectTimeLocations) {
            return {
              objectId: param.id,
              locationTime: {},
            } as ObjectLocation;
          }
          if (targetTimeLocationsIndex[index] !== -1) {
            // 現在の時刻より後かつ最初のObjectを選択
            // console.log(
            //   param.objectTimeLocations[targetTimeLocationsIndex[index]]
            // );
            return {
              objectId: param.id,
              locationTime: {
                ...param.objectTimeLocations[targetTimeLocationsIndex[index]],
              },
            } as ObjectLocation;
          } /*if (param.objectTimeLocations.length !== 0)*/ else {
            // 最新の位置を表示
            return {
              objectId: param.id,
              locationTime:
                param.objectTimeLocations[param.objectTimeLocations.length - 1],
            } as ObjectLocation;
          }
          // それ以外
        })
      );
    }
  }, [selectedTaskBlockId]);

  // 操作中のObject ID
  const [ptrTimeObject, setPtrTimeObject] = useState<{
    objectId: string;
    timeLocationId: string;
  }>(initTimeObject);

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
            setPtrTimeObject({
              objectId: loc.objectId,
              timeLocationId: loc.locationTime.id,
            })
          }
          onEndDrag={() => setPtrTimeObject(initTimeObject)}
        />
      ))}
    </>
  );
};

export default HomeObjectComponent;
