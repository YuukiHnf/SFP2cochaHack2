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
import { db, TaskType, USER } from "../../utils/firebase/FirebaseStore";

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
        where("by", "==", basicInfo.userId)
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
    } catch (e) {
      router.push("/login");
    }

    return () => unSub();
  }, [basicInfo, dispatch, guestSetterTasks, guestSetterWithoutTasks]);

  return <div>{children}</div>;
};

export default GuestWrapper;
