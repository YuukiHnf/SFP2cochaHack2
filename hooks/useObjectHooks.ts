/** Custom Hooks
 * Objectデータを受け持つ
 */

import {
  collection,
  deleteDoc,
  doc,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { useAppSelector } from "../app/hooks";
import {
  selectAdminInitObjects,
  selectAdminObjects,
} from "../features/adminSlice";
import {
  db,
  ObjectLocation,
  OBJECTPARAM,
  PLACE,
  TaskBlock,
} from "../utils/firebase/FirebaseStore";

type Props = {
  teamId: string;
};

//const path = "place";

const useObjectHooks = ({ teamId }: Props) => {
  const initObjectLocations = useAppSelector(selectAdminInitObjects);
  const globalObjects = useAppSelector(selectAdminObjects);
  // 最初の位置をUpdateする
  const saveInitObjectLocation = async (
    objectIds: string[],
    value: ObjectLocation
  ) => {
    const teamRef = doc(db, "team", teamId);
    //console.log("useObjectHooks", value);

    // await updateDoc(objectRef, {
    //   initLocation: value.location,
    // });

    // batch書き込みで、全Objectを変更
    const batch = writeBatch(db);
    const len = objectIds.length;
    for (var i = 0; i < len; i++) {
      const objectRef = doc(collection(teamRef, "objects"), objectIds[i]);
      batch.update(objectRef, { initLocation: value.location });
    }
    await batch.commit();
  };

  // objectの重複なし情報
  const FilteredObjectParam = () => {
    return globalObjects.filter(
      (element, index, self) =>
        self.findIndex(
          (dataElement) => dataElement.objectName === element.objectName
        ) === index
    );
  };

  // objectを一つ足す
  const incrementObjectNum = async (
    objectValue: Omit<OBJECTPARAM, "createAt" | "initLocation">
  ) => {
    // const objectValue = objectParams.filter(
    //   (param) => param.objectName === _objectName
    // )[0];
    const teamRef = doc(db, "team", teamId);
    // idを抜く
    const { id, ...param } = objectValue;
    await setDoc(doc(collection(teamRef, "objects")), {
      ...param,
      initLocation: initObjectLocations.filter(
        (_obj) => objectValue.id === _obj.objectId
      )[0].location,
      createAt: serverTimestamp(),
    });
  };

  // objectを１つ減らす
  const decrementObjectNum = async (
    objectValue: Omit<OBJECTPARAM, "createAt" | "initLocation">
  ) => {
    const teamRef = doc(db, "team", teamId);
    await deleteDoc(
      doc(
        collection(teamRef, "objects"),
        globalObjects
          .filter((obj) => obj.objectName === objectValue.objectName)
          .slice(-1)[0].id
      )
    );
  };

  return {
    saveInitObjectLocation,
    incrementObjectNum,
    decrementObjectNum,
    FilteredObjectParam,
  };
};

export default useObjectHooks;
