"use client";

import { Dispatch, SetStateAction } from "react";
import TaskType from "@/types/taskType";
import TasksType from "@/types/tasksType";
import "./taskItem.scss";

type TaskItemProps = {
  task: TaskType;
  tasks: TasksType;
  openDeleteModal: () => void;
  setTasks: Dispatch<SetStateAction<TasksType>>;
  setSelectedTask: Dispatch<SetStateAction<TaskType | null>>;
};

export default function TaskItem(taskItemProps: TaskItemProps) {
  const { task, tasks, setTasks, setSelectedTask, openDeleteModal } = taskItemProps;

  const handleCheckboxClick = () => {
    task.done = !task.done;

    const currentTasks: TasksType = {
      open: [...tasks.open],
      completed: [...tasks.completed],
    };

    if (task.done) {
      const taskIndex = currentTasks.open.findIndex((t) => t.title === task.title);
      currentTasks.open.splice(taskIndex, 1);
      task.id = currentTasks.completed.length > 0 ? currentTasks.completed[currentTasks.completed.length - 1].id + 1 : 0;
      currentTasks.completed.push(task);
    } else {
      const taskIndex = currentTasks.completed.findIndex((t) => t.title === task.title);
      currentTasks.completed.splice(taskIndex, 1);
      task.id = currentTasks.open.length > 0 ? currentTasks.open[currentTasks.open.length - 1].id + 1 : 0;
      currentTasks.open.push(task);
    }

    localStorage.setItem("completed_tasks", JSON.stringify(currentTasks.completed));
    localStorage.setItem("open_tasks", JSON.stringify(currentTasks.open));

    setTasks(currentTasks);
  }

  const handleDeleteTask = () => {
    setSelectedTask(task);
    openDeleteModal();
  };

  return (
    <li className="task_container" >
      <label className="checkbox_container">
        <input type="checkbox" checked={task.done} onChange={handleCheckboxClick} />
        <div className="checkbox" ></div>
      </label>
      <p className={`task_description ${task.done ? "completed_task" : ""}`}>{task.title}</p>
      <input type="image" className="task_delete_button" src="trash.svg" onClick={handleDeleteTask} />
    </li>
  );
}
