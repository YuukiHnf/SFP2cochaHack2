import { collection, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectBasicInfo } from "../features/basicInfoSlice";
import { db, Location } from "../utils/firebase/FirebaseStore";

const useUserHooks = () => {
  const basicInfo = useAppSelector(selectBasicInfo);

  const uploadMyLocation = async (loc: Location) => {
    if (basicInfo.userId === "") return;
    const userRef = doc(collection(db, "users"), basicInfo.userId);

    await updateDoc(userRef, { location: loc });
  };
  return { uploadMyLocation };
};

export default useUserHooks;
