/** Custom Hooks
 * Objectデータを受け持つ
 */

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { useAppSelector } from "../app/hooks";
import {
  selectAdminObjects,
  selectAdminTimeSche,
} from "../features/adminSlice";
import { selectBasicInfo } from "../features/basicInfoSlice";
import {
  db,
  ObjectLocation,
  OBJECTPARAM,
  ObjectTimeLocations,
  PLACE,
  TaskBlock,
  Location,
} from "../utils/firebase/FirebaseStore";

type Props = {
  teamId?: string;
};

//const path = "place";

const useObjectHooks = () => {
  //const initObjectLocations = useAppSelector(selectAdminInitObjects);
  const globalObjects = useAppSelector(selectAdminObjects);
  const timeSchedule = useAppSelector(selectAdminTimeSche);
  const { teamId } = useAppSelector(selectBasicInfo);

  // 最初の位置をUpdateする
  const saveInitObjectLocation = async (
    objectIds: string[],
    objectTimeIds: string[],
    value: Location
  ) => {
    const teamRef = doc(db, "team", teamId);

    // batch書き込みで、全Objectを変更
    const batch = writeBatch(db);
    const len = objectTimeIds.length;
    for (var i = 0; i < len; i++) {
      const objectRef = doc(collection(teamRef, "objects"), objectIds[i]);
      const objectTimeRef = doc(
        collection(objectRef, "Locations"),
        objectTimeIds[i]
      );
      batch.update(objectTimeRef, { location: value });
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
  /**
   * 2022/04/03
   * objectの初期位置を subCollection の Locationに移した
   * @param objectValue
   * @returns
   */
  const incrementObjectNum = async (
    objectValue: Omit<OBJECTPARAM, "createAt" | "initLocation">
  ) => {
    // const objectValue = objectParams.filter(
    //   (param) => param.objectName === _objectName
    // )[0];
    if (!objectValue.objectTimeLocations) return;
    const teamRef = doc(db, "team", teamId);
    // idを抜く
    const { id, objectTimeLocations, ...param } = objectValue;

    /** 同時に書き込まないとエラーが起きる */
    // const objectRef = await addDoc(collection(teamRef, "objects"), {
    //   ...param,
    //   // initLocation: initObjectLocations.filter(
    //   //   (_obj) => objectValue.id === _obj.objectId
    //   // )[0].location,
    //   createAt: serverTimestamp(),
    // });
    // const _value = {
    //   ...objectValue.objectTimeLocations[0],
    // } as ObjectTimeLocations;

    // const objectTimeCollectionRef = collection(objectRef, "Locations");
    // await addDoc(objectTimeCollectionRef, _value);

    try {
      const newObject = await runTransaction(db, async (transaction) => {
        if (!objectValue.objectTimeLocations) return;
        const objectRef = await addDoc(collection(teamRef, "objects"), {
          ...param,
          // initLocation: initObjectLocations.filter(
          //   (_obj) => objectValue.id === _obj.objectId
          // )[0].location,
          createAt: serverTimestamp(),
        });
        const { id, ..._value } = objectTimeLocations[0];

        const objectTimeCollectionRef = collection(objectRef, "Locations");
        await addDoc(objectTimeCollectionRef, _value);
      });
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  };

  // objectを１つ減らす
  const decrementObjectNum = async (
    objectValue: Omit<OBJECTPARAM, "createAt" | "initLocation">
  ) => {
    const teamRef = doc(db, "team", teamId);
    //location全ての削除
    // batch書き込みで、全Objectを変更
    const batch = writeBatch(db);
    if (objectValue.objectTimeLocations) {
      const len = objectValue.objectTimeLocations.length;
      for (var i = 0; i < len; i++) {
        const objectLocRef = doc(
          collection(teamRef, "objects"),
          objectValue.objectTimeLocations[i].id
        );
        console.log("[DELETE]", objectValue.objectTimeLocations[i].id);
        batch.delete(objectLocRef);
      }
    }
    // 本体の削除
    batch.delete(doc(collection(teamRef, "objects"), objectValue.id));
    await batch.commit();
  };

  /**時間に対して適切なObject Refを割り当てる */
  const Date2ObjectsLocations = (ptrDate: Date) => {
    const targetTimeLocationsIndex: number[] = globalObjects.map(
      (param) =>
        param.objectTimeLocations?.findIndex(
          (timeLoc) => timeLoc.timeStamp.toDate() >= ptrDate
        ) ?? 0
    );

    return globalObjects.map((param, index) => {
      if (!param.objectTimeLocations) {
        return {
          objectId: param.id,
          locationTime: {},
        } as ObjectLocation;
      }
      if (targetTimeLocationsIndex[index] !== -1) {
        // 現在の時刻より後かつ最初のObjectを選択
        // console.log(
        //   param.objectTimeLocations[targetTimeLocationsIndex[index]]
        // );
        return {
          objectId: param.id,
          locationTime: {
            ...param.objectTimeLocations[targetTimeLocationsIndex[index]],
          },
        } as ObjectLocation;
      } /*if (param.objectTimeLocations.length !== 0)*/ else {
        // 最新の位置を表示
        return {
          objectId: param.id,
          locationTime:
            param.objectTimeLocations[param.objectTimeLocations.length - 1],
        } as ObjectLocation;
      }
      // それ以外
    });
  };

  return {
    saveInitObjectLocation,
    incrementObjectNum,
    decrementObjectNum,
    FilteredObjectParam,
    Date2ObjectsLocations,
  };
};

export default useObjectHooks;
