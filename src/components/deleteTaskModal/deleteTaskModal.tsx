import { Dispatch, SetStateAction } from "react";
import TasksType from "@/types/tasksType";
import TaskType from "@/types/taskType";
import "./deleteTaskModal.scss";

type DeleteTaskModalProps = {
  isModalOpen: boolean;
  handleModalOpenClose: () => void;
  tasks: TasksType;
  setTasks: Dispatch<SetStateAction<TasksType>>;
  selectedTask: TaskType | null;
  setSelectedTask: Dispatch<SetStateAction<TaskType | null>>
};

export default function DeleteTaskModal({
  isModalOpen,
  handleModalOpenClose,
  tasks,
  setTasks,
  selectedTask,
  setSelectedTask
}: DeleteTaskModalProps) {
  const handleDeleteTask = () => {
    if (!selectedTask) return;

    const currentTasks: TasksType = {
      open: [...tasks.open],
      completed: [...tasks.completed],
    };

    if (selectedTask.done) {
      const taskIndex = currentTasks.completed.findIndex((t) => t.title === selectedTask.title);
      currentTasks.completed.splice(taskIndex, 1);
      localStorage.setItem("completed_tasks", JSON.stringify(currentTasks.completed));
    } else {
      const taskIndex = currentTasks.open.findIndex((t) => t.title === selectedTask.title);
      currentTasks.open.splice(taskIndex, 1);
      localStorage.setItem("open_tasks", JSON.stringify(currentTasks.open));
    }

    setTasks(currentTasks);
    setSelectedTask(null);

    handleModalOpenClose();
  };

  return (
    <>
      {isModalOpen && (
        <div className="del_modal_container">
          <div className="del_modal" tabIndex={-1}>
            <p className="del_modal_title">Deletar tarefa</p>
            <div className="del_modal_content">
              <p className="delete_confirmation">Tem certeza que você deseja deletar essa tarefa?</p>
            </div>
            <div className="del_modal_footer">
              <button type="button" className="cancel_button" data-testid="del_cancel_btn" onClick={handleModalOpenClose}>
                Cancelar
              </button>
              <button type="button" className="delete_button" onClick={handleDeleteTask}>
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
