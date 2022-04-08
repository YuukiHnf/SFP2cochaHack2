import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, VFC } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { selectBasicInfo } from "../../features/basicInfoSlice";
import {
  guestSetterTasks,
  guestSetterWithoutTasks,
} from "../../features/guestSlice";
import { setSetObject } from "../../features/setObjectSlice";
import {
  db,
  SetObjectType,
  TaskType,
  USER,
} from "../../utils/firebase/FirebaseStore";

interface Props {
  children: React.ReactNode;
}

const GuestWrapper: VFC<Props> = ({ children }) => {
  const basicInfo = useAppSelector(selectBasicInfo);
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (!db || basicInfo.userId.length === 0 || basicInfo.teamId.length === 0) {
      router.push("/login");
    }
    var unSub = () => {};
    var unSubTask = () => {};
    var unSubSetObj = () => {};
    try {
      unSub = onSnapshot(
        doc(collection(db, "users"), basicInfo.userId),
        (doc) => {
          if (doc.data()) {
            const _data = doc.data() as USER;
            console.log(_data);
            dispatch(
              guestSetterWithoutTasks({
                isActive: _data.isActive,
                isGPS: _data.isGPS,
                timeSche: _data.timeSche ?? [],
                location: _data.location,
              })
            );
          }
        }
      );

      const taskQuery = query(
        collection(db, "tasks"),
        where("by", "array-contains", basicInfo.userId)
      );
      unSubTask = onSnapshot(taskQuery, (querySnap) => {
        dispatch(
          guestSetterTasks(
            querySnap.docs.map(
              (_data) => ({ ..._data.data(), id: _data.id } as TaskType)
            )
          )
        );
      });

      // set Object
      const unSubSetObj = onSnapshot(
        collection(doc(collection(db, "team"), basicInfo.teamId), "sets"),
        (setObjSnaps) => {
          if (!setObjSnaps.empty) {
            dispatch(
              setSetObject(
                setObjSnaps.docs.map(
                  (snap) => ({ ...snap.data(), id: snap.id } as SetObjectType)
                )
              )
            );
          }
        }
      );
    } catch (e) {
      router.push("/login");
    }

    return () => {
      unSub();
      unSubSetObj();
      unSubTask();
    };
  }, [basicInfo, dispatch, guestSetterTasks, guestSetterWithoutTasks]);

  return <div>{children}</div>;
};

export default GuestWrapper;
