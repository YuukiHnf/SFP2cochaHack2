import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectBasicInfo } from "../features/basicInfoSlice";
import { db, SetObjectType } from "../utils/firebase/FirebaseStore";

const useSetObjectHooks = () => {
  const basicInfo = useAppSelector(selectBasicInfo);
  const setObjectCollection = collection(
    doc(collection(db, "team"), basicInfo.teamId),
    "sets"
  );
  const addSetObject = async (params: Omit<SetObjectType, "id">) => {
    await addDoc(setObjectCollection, {
      ...params,
    });
  };

  const deleteSetObject = async (setObjectId: string) => {
    const setObjRef = doc(setObjectCollection, setObjectId);

    await deleteDoc(setObjRef);
  };
  return { addSetObject, deleteSetObject };
};

export default useSetObjectHooks;
