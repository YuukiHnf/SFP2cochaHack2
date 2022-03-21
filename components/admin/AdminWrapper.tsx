import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, VFC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { adminSetter } from "../../features/adminSlice";
import { selectBasicInfo } from "../../features/basicInfoSlice";
import { db, PLACE, TEAM } from "../../utils/firebase/FirebaseStore";

interface Props {
  children: React.ReactNode;
}

const AdminWrapper: VFC<Props> = ({ children }) => {
  const basicInfo = useAppSelector(selectBasicInfo);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    if (!basicInfo.userId) {
      router.push("/login");
    }
    // // admin用のState入力
    const unSub = onSnapshot(doc(db, "team", basicInfo.teamId), (doc) => {
      //console.log(doc.data());
      if (doc.data()) {
        const _data = doc.data() as TEAM;
        dispatch(
          adminSetter({
            place: _data.place,
            timeSche: _data.timeSche,
            taskBlock: _data.taskBlock,
            objects: null,
          })
        );
      }
    });
    return () => unSub();
  }, [basicInfo]);

  return <div>{children}</div>;
};

export default AdminWrapper;
