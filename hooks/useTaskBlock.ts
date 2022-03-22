/**
 * taskBlockの管理ツール
 */

import {
  collection,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useAppSelector } from "../app/hooks";
import { selectBasicInfo } from "../features/basicInfoSlice";
import { db, TaskBlock } from "../utils/firebase/FirebaseStore";

interface Props {
  teamId: string;
}

const useTaskBlock = ({ teamId }: Props) => {
  // Timeをuploadする
  const updateBlockTime = async (
    taskBlockId: string,
    newTime: Date,
    isCreate: boolean = false
  ) => {
    const teamRef = doc(db, "team", teamId);
    const blockRef = doc(collection(teamRef, "taskBlock"), taskBlockId);

    await updateDoc(blockRef, {
      time: newTime,
    });
  };

  const deleteBlockTime = () => {};

  const createBlockTime = async (newTime: Date, newTitle: string) => {
    const teamRef = doc(db, "team", teamId);
    const blockRef = doc(collection(teamRef, "taskBlock"));

    const newData: Omit<TaskBlock, "id"> = {
      title: newTitle,
      time: Timestamp.fromDate(newTime),
      taskIds: [],
      objectLocations: [],
      isInit: false,
    };

    await setDoc(blockRef, newData, { merge: true });
  };

  return { updateBlockTime, createBlockTime };
};

export default useTaskBlock;
