import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, VFC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  adminObjectSetter,
  adminSetter,
  adminTaskSetter,
} from "../../features/adminSlice";
import { selectBasicInfo } from "../../features/basicInfoSlice";
import {
  db,
  OBJECTPARAM,
  PLACE,
  TaskBlock,
  TEAM,
} from "../../utils/firebase/FirebaseStore";

interface Props {
  children: React.ReactNode;
}

const AdminWrapper: VFC<Props> = ({ children }) => {
  const basicInfo = useAppSelector(selectBasicInfo);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    // if (basicInfo.userId.length == 0 || basicInfo.teamId.length == 0) {
    //   router.push("/login");
    //   return;
    // }
    if (!db || basicInfo.userId.length == 0 || basicInfo.teamId.length == 0) {
      console.log("AdminWrapper");
      router.push("/login");
      return;
    }
    // // admin用のState入力
    //const teamRef = doc(db, `team/${basicInfo.teamId}`);
    const colRef = collection(db, "team");
    const teamRef = doc(colRef, basicInfo.teamId);
    const unSub = onSnapshot(teamRef, (doc) => {
      console.log("[usSub]:", doc.data());
      if (doc.data()) {
        const _data = doc.data() as TEAM;
        dispatch(
          adminSetter({
            place: _data.place,
            timeSche: _data.timeSche,
          })
        );
      }
    });

    // Object Collection
    const unSubObj = onSnapshot(
      query(
        collection(doc(db, "team", basicInfo.teamId), "objects"),
        orderBy("createAt", "asc")
      ),
      (objectSnaps) => {
        dispatch(
          adminObjectSetter(
            objectSnaps.docs.map(
              (snap) => ({ ...snap.data(), id: snap.id } as OBJECTPARAM)
            )
          )
        );
        console.log("[unSubObj]", objectSnaps.docs);
      }
    );

    // TaskBlockCollection
    const taskBlockRef = collection(
      doc(db, "team", basicInfo.teamId),
      "taskBlock"
    );
    const blockQuery = query(taskBlockRef, orderBy("time", "asc"));
    const unSubTaskBlock = onSnapshot(blockQuery, (blockSnaps) => {
      if (!blockSnaps.empty) {
        dispatch(
          adminTaskSetter(
            blockSnaps.docs.map(
              (snap) => ({ ...snap.data(), id: snap.id } as TaskBlock)
            )
          )
        );
      }
    });
    return () => {
      unSub();
      unSubObj();
      unSubTaskBlock();
    };
  }, [basicInfo]);

  return <div>{children}</div>;
};

export default AdminWrapper;
