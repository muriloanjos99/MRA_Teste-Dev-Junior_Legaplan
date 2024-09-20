import TasksType from "@/types/tasksType";
import "./newTaskModal.scss";
import { useState } from "react";

type NewTaskModalProps = {
  isModalOpen: boolean;
  handleModalOpenClose: () => void;
  tasks: TasksType;
  setTasks: (tasks: TasksType) => void;
};

export default function NewTaskModal({
  isModalOpen,
  handleModalOpenClose,
  tasks,
  setTasks,
}: NewTaskModalProps) {
  const [taskTitle, setTaskTitle] = useState<string>("");

  const handleAddTask = () => {
    const currentTasks: TasksType = {
      open: [...tasks.open],
      completed: [...tasks.completed],
    };

    currentTasks.open.push({ id: currentTasks.open.length, title: taskTitle, done: false });
    setTasks(currentTasks);

    localStorage.setItem("open_tasks", JSON.stringify(currentTasks.open));
    setTaskTitle("");
    handleModalOpenClose();
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal_container">
          <div className="modal" tabIndex={-1}>
            <p className="modal_title">Nova tarefa</p>
            <div className="modal_content">
              <p className="task_title_input_label">Título</p>
              <input
                type="text"
                className="task_title_input"
                placeholder="Digite"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
            <div className="modal_footer">
              <button type="button" className="cancel_button" onClick={handleModalOpenClose}>
                Cancelar
              </button>
              <button type="button" className="add_button" onClick={handleAddTask}>
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
