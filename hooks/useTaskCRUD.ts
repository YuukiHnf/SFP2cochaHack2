import { TaskType } from "../utils/firebase/FirebaseStore";

const useTaskCRUD = () => {
  /**
   * タスクを新規に作成して、それをIDとして受け取り、TaskBlockに入れる
   * @param taskBlockId
   */
  const addTaskInBlock = (
    taskBlockId: string,
    taskItem: Omit<TaskType, "id">
  ) => {
    console.log(taskItem);
  };

  return { addTaskInBlock };
};

export default useTaskCRUD;
