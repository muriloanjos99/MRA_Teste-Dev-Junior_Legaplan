'use client';

import { useState } from "react";
import "./taskItem.scss";

type TaskItemProps = {
  description: string;
  checked: boolean;
};

export default function TaskItem({ description, checked }: TaskItemProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const onClick = () => {
    setIsChecked(!isChecked);
  }

  return (
    <li className="task_container" >
      <label className="checkbox_container">
        <input type="checkbox" checked={isChecked} onChange={onClick} />
        <div className="checkbox" ></div>
      </label>
      <p className={`task_description ${isChecked ? "completed_task" : ""}`}>{description}</p>
      <input type="image" className="task_delete_button" src="trash.svg" />
    </li>
  );
}
