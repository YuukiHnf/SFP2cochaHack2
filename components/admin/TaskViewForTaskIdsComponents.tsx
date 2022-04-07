import React, { useState, VFC } from "react";
import EditingTaskViewComponent from "../googlemap/EditingTaskViewComponent";
import TaskViewComponents from "./TaskViewComponents";

type Props = {
  taskIds: string[];
  taskBlockId: string;
};

/**
 * すでにDBにあるタスクを表示、管理するComponents
 * @returns
 */

const TaskViewForTaskIdsComponents: VFC<Props> = ({ taskIds, taskBlockId }) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");

  const hanldeSelectedTask = (_taskId: string) => {
    setSelectedTaskId(_taskId);
  };
  return (
    <>
      {taskIds?.map((_id) =>
        selectedTaskId === _id ? ( //現在選択中のタスク
          <EditingTaskViewComponent
            key={_id}
            taskId={_id}
            onClickSelectedTaskId={hanldeSelectedTask}
            taskBlockId={taskBlockId}
          />
        ) : (
          //それ以外
          <TaskViewComponents
            key={_id}
            taskId={_id}
            onClickAnyObject={hanldeSelectedTask}
          />
        )
      ) ?? <></>}
    </>
  );
};

export default TaskViewForTaskIdsComponents;
