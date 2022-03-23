import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, VFC } from "react";
import { db } from "../../utils/firebase/FirebaseStore";

type Props = {
  taskId: string;
};

const TaskViewComponents: VFC<Props> = ({ taskId }) => {
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "tasks", taskId), (doc) => {
      console.log(doc.data());
    });

    return () => unSub();
  }, [taskId]);

  return <div>TaskViewComponents</div>;
};

export default TaskViewComponents;
