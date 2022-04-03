import { Marker } from "@react-google-maps/api";
import { useEffect, useState, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectAdminObjects,
  selectAdminTaskBlock,
} from "../../features/adminSlice";
import { selectBasicInfo } from "../../features/basicInfoSlice";
import {
  ObjectLocation,
  OBJECTPARAM,
  ObjectTimeLocations,
} from "../../utils/firebase/FirebaseStore";

type Props = {
  selectedTaskBlockId: string;
};

const HomeObjectComponent: VFC<Props> = ({ selectedTaskBlockId }) => {
  const taskBlocks = useAppSelector(selectAdminTaskBlock);
  const objectParams = useAppSelector(selectAdminObjects);

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
              location: {},
            } as ObjectLocation;
          }
          if (targetTimeLocationsIndex[index] !== -1) {
            // 現在の時刻より後かつ最初のObjectを選択
            // console.log(
            //   param.objectTimeLocations[targetTimeLocationsIndex[index]]
            // );
            return {
              objectId: param.id,
              location: {
                ...param.objectTimeLocations[targetTimeLocationsIndex[index]]
                  .location,
              },
            } as ObjectLocation;
          } /*if (param.objectTimeLocations.length !== 0)*/ else {
            // 最新の位置を表示
            return {
              objectId: param.id,
              location:
                param.objectTimeLocations[param.objectTimeLocations.length - 1]
                  .location,
            } as ObjectLocation;
          }
          // それ以外
        })
      );
    }
  }, [selectedTaskBlockId]);

  // Objectのrendering方式
  const markerJSX = (obj: ObjectLocation) => (
    <Marker
      key={obj.objectId}
      position={obj.location}
      icon={{
        url:
          objectParams.find((value) => value.id === obj.objectId)?.iconUrl ??
          "",
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(15, 15),
        scaledSize: new window.google.maps.Size(30, 30),
      }}
    />
  );
  return <>{ptrLocations.map((loc) => markerJSX(loc))}</>;
};

export default HomeObjectComponent;
