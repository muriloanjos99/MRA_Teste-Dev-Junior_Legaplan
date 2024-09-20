'use client';

import { Dispatch, SetStateAction, useState } from "react";
import TaskType from "@/types/taskType";
import "./taskItem.scss";

type TaskItemProps = {
  task: TaskType;
  setSelectedTask: Dispatch<SetStateAction<TaskType | null>>;
  openDeleteModal: () => void;
};

export default function TaskItem(taskItemProps: TaskItemProps) {
  const { task, setSelectedTask, openDeleteModal } = taskItemProps;

  const [isChecked, setIsChecked] = useState<boolean>(task.done);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  }

  const handleDeleteTask = () => {
    setSelectedTask(task);
    openDeleteModal();
  };

  return (
    <li className="task_container" >
      <label className="checkbox_container">
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxClick} />
        <div className="checkbox" ></div>
      </label>
      <p className={`task_description ${isChecked ? "completed_task" : ""}`}>{task.title}</p>
      <input type="image" className="task_delete_button" src="trash.svg" onClick={handleDeleteTask} />
    </li>
  );
}
