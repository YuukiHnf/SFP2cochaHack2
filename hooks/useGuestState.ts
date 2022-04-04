import { collection, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectBasicInfo } from "../features/basicInfoSlice";
import { db } from "../utils/firebase/FirebaseStore";

const useGuestState = () => {
  const basicInfo = useAppSelector(selectBasicInfo);

  // Activeを切り替える
  const setIsActive = async (value: boolean) => {
    await updateDoc(doc(collection(db, "users"), basicInfo.userId), {
      isActive: value,
    });
  };

  // GPSの設定を切り替える
  const setIsGPS = async (value: boolean) => {
    await updateDoc(doc(collection(db, "users"), basicInfo.userId), {
      isGPS: value,
    });
  };
  return { setIsActive, setIsGPS };
};

export default useGuestState;
