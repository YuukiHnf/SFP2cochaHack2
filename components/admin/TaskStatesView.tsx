import React, { useState, VFC } from "react";
import OneTaskStateView from "./OneTaskStateView";

type Props = {
  taskIds: string[];
};

const TaskStatesView: VFC<Props> = ({ taskIds }) => {
  const [isTappings, setIsTappings] = useState<boolean[]>([]);

  const handleSelectedTask = (_index: number, value: boolean) => {
    setIsTappings((_state) =>
      _state.map((tapping, index) => (_index === index ? value : tapping))
    );
  };

  return (
    <div>
      {taskIds.map((_id, index) => (
        <OneTaskStateView
          key={_id + index}
          taskId={_id}
          isTapping={isTappings[index] ?? true}
        />
      ))}
    </div>
  );
};

export default TaskStatesView;
