import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { route } from "next/dist/server/router";
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
  console.log("ADMINWRAPPER");

  useEffect(() => {
    if (basicInfo.userId.length == 0 || basicInfo.teamId.length == 0) {
      router.push("/login");
      return;
    }
    if (!db) {
      router.push("/login");
      return;
    }
    // // admin用のState入力
    //const teamRef = doc(db, `team/${basicInfo.teamId}`);
    const colRef = collection(db, "team");
    const teamRef = doc(colRef, basicInfo.teamId);
    const unSub = onSnapshot(teamRef, (doc) => {
      console.log(doc.data());
      if (doc.data()) {
        const _data = doc.data() as TEAM;
        dispatch(
          adminSetter({
            place: _data.place,
            timeSche: _data.timeSche,
            taskBlock: _data.taskBlock,
            objects: [],
          })
        );
      }
    });
    return () => unSub();
  }, [basicInfo]);

  return <div>{children}</div>;
};

export default AdminWrapper;
