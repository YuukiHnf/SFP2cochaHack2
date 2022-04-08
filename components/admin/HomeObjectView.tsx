import { Marker } from "@react-google-maps/api";
import React, { useEffect, useState, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectAdminObjects,
  selectAdminTaskBlock,
  selectAdminTimeSche,
} from "../../features/adminSlice";
import useObjectHooks from "../../hooks/useObjectHooks";
import { ObjectLocation } from "../../utils/firebase/FirebaseStore";

type Props = {
  selectedTaskBlockId: string;
};

/**
 * Objectをただ表示して、タスクのOrigin状態を表示
 * @param param0
 * @returns
 */
const HomeObjectView: VFC<Props> = ({ selectedTaskBlockId }) => {
  const taskBlocks = useAppSelector(selectAdminTaskBlock);
  const objectParams = useAppSelector(selectAdminObjects);
  const ptrDate = taskBlocks
    ?.filter((block) => block.id === selectedTaskBlockId)[0]
    .time?.toDate();
  // 表示するObjectを時間から算出して保存するState
  const [ptrLocations, setPtrLocations] = useState<ObjectLocation[]>([]);
  const { Date2ObjectsLocations } = useObjectHooks();

  useEffect(() => {
    if (!taskBlocks) {
      return;
    }
    // 現在選択されているObjectのLocationを算出
    if (ptrDate) {
      setPtrLocations(Date2ObjectsLocations(ptrDate));
    }
  }, [selectedTaskBlockId]);

  return (
    <>
      {ptrLocations.map((loc, index) => (
        <Marker
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
                ?.semiIconUrl ?? "",
            // : objectParams.find((value) => value.id === obj.id)
            //     ?.semiIconUrl ?? "",
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />
      ))}
    </>
  );
};

export default HomeObjectView;
