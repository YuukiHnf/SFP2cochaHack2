import {
  addDoc,
  collection,
  doc,
  runTransaction,
  writeBatch,
} from "firebase/firestore";
import { useAppSelector } from "../app/hooks";
import { selectBasicInfo } from "../features/basicInfoSlice";
import { db, TaskBlock, TaskType } from "../utils/firebase/FirebaseStore";

const useTaskCRUD = () => {
  const basicInfo = useAppSelector(selectBasicInfo);
  /**
   * タスクを新規に作成して、それをIDとして受け取り、TaskBlockに入れる
   * @param taskBlockId
   */
  const addTaskInBlock = async (
    taskBlockId: string,
    taskItem: Omit<TaskType, "id">
  ) => {
    // console.log(taskItem);
    // tasks collectionにタスクを追加する
    const taskRef = await addDoc(collection(db, "tasks"), taskItem);

    // taskIdをtaskBlockのtaskIdsに追加する
    const taskBlockRef = doc(
      collection(doc(db, "team", basicInfo.teamId), "taskBlock"),
      taskBlockId
    );
    try {
      const newTaskBlock = await runTransaction(db, async (transaction) => {
        const taskBlockDoc = await transaction.get(taskBlockRef);
        if (!taskBlockDoc.exists()) {
          throw "[MyError] Document does not exist! [transaction]";
        }

        const _oldData = taskBlockDoc.data() as Omit<TaskBlock, "id">;

        const newTaskIds = [..._oldData.taskIds, taskRef.id];
        transaction.update(taskBlockRef, { taskIds: newTaskIds });
        return newTaskIds;
      });
    } catch (e) {
      // This will be a "population is too big" error.
      console.error(e);
    }
  };

  const deleteTaskInBlock = async (taskBlockId: string, taskId: string) => {
    // taskIdをtaskBlockのtaskIdsに追加する
    const taskBlockRef = doc(
      collection(doc(db, "team", basicInfo.teamId), "taskBlock"),
      taskBlockId
    );
    const taskRef = doc(db, "tasks", taskId);
    try {
      // 削除するものを削除してUpdate
      await runTransaction(db, async (transaction) => {
        //taskBlockについて
        const taskBlockDoc = await transaction.get(taskBlockRef);
        if (!taskBlockDoc.exists()) {
          throw `[MyError] Document does not exist! [transaction]:${taskBlockId}`;
        }
        const _oldData = taskBlockDoc.data() as Omit<TaskBlock, "id">;

        const newTaskIds = _oldData.taskIds.filter((_id) => _id !== taskId);
        transaction.update(taskBlockRef, { taskIds: newTaskIds });
        // taskについて
        transaction.delete(taskRef);
      });
      console.log("[SUCCESS DELETE]", taskId);
    } catch (e) {
      // This will be a "population is too big" error.
      console.error(e);
    }
  };

  // task内の一部説明やMoveを編集する
  const editTaskExplaingOrMoveInBlockId = (
    taskBlockId: string,
    taskId: string,
    moveOrExplaing: "Move" | "Explaing",
    targetIndex: number
  ) => {};

  // task内の一部説明やMoveを削除する batchで消去する
  const deleteTaskExplaingOrMoveInBlockId = async (
    taskBlockId: string,
    taskId: string,
    moveOrExplaing: "Move" | "Explaing",
    targetIndex: number
  ) => {};

  return {
    addTaskInBlock,
    deleteTaskInBlock,
    editTaskExplaingOrMoveInBlockId,
    deleteTaskExplaingOrMoveInBlockId,
  };
};

export default useTaskCRUD;
