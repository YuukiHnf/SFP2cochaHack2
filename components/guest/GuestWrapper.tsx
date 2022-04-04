import { collection, doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, VFC } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { selectBasicInfo } from "../../features/basicInfoSlice";
import { guestSetter } from "../../features/guestSlice";
import { db, USER } from "../../utils/firebase/FirebaseStore";

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
    try {
      unSub = onSnapshot(
        doc(collection(db, "users"), basicInfo.userId),
        (doc) => {
          if (doc.data()) {
            const _data = doc.data() as USER;
            console.log(_data);
            dispatch(
              guestSetter({
                isActive: _data.isActive,
                isGPS: _data.isGPS,
                taskId: _data.taskId,
              })
            );
          }
        }
      );
    } catch (e) {
      router.push("/login");
    }

    return () => unSub();
  }, [basicInfo, dispatch, guestSetter]);

  return <div>{children}</div>;
};

export default GuestWrapper;
