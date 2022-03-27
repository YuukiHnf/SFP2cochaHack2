import React, { VFC } from "react";
import { TaskType } from "../../utils/firebase/FirebaseStore";

type Props = {
  taskdata: TaskType;
};

const TaskViewObjectComponents: VFC<Props> = ({ taskdata }) => {
  return <div>TaskViewObjectComponents</div>;
};

export default TaskViewObjectComponents;
