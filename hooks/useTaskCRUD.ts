import { async } from "@firebase/util";
import { addDoc, collection, doc, runTransaction } from "firebase/firestore";
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

  return { addTaskInBlock };
};

export default useTaskCRUD;
