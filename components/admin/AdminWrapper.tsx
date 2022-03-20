import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectBasicInfo } from "../../features/basicInfoSlice";
import { db } from "../../utils/firebase/FirebaseStore";

interface Props {
  children: React.ReactNode;
}

const AdminWrapper: VFC<Props> = ({ children }) => {
  const basicInfo = useAppSelector(selectBasicInfo);

  const router = useRouter();

  useEffect(() => {
    if (!basicInfo.userId) {
      router.push("/login");
    }
    // admin用のState入力
    const unSub = onSnapshot(doc(db, "users", basicInfo.userId), (doc) => {});
    return () => unSub();
  }, [basicInfo]);

  return <div>{children}</div>;
};

export default AdminWrapper;
