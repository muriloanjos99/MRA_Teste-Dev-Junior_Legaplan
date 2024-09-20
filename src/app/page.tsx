"use client";

import { useEffect, useState } from "react";
import "./page.scss";
import TasksType from "@/types/tasksType";
import TaskType from "@/types/taskType";
import TaskItem from "@/components/taskItem/taskItem";
import NewTaskModal from "@/components/newTaskModal/newTaskModal";
import DeleteTaskModal from "@/components/deleteTaskModal/deleteTaskModal";

export default function Home() {
  const [tasks, setTasks] = useState<TasksType>({ open: [], completed: [] });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  useEffect(() => {
    const currentTasks: TasksType = {
      open: [...tasks.open],
      completed: [...tasks.completed],
    };

    const storedOpenTasks = localStorage.getItem('open_tasks');
    const storedCompletedTasks = localStorage.getItem('completed_tasks');

    if (storedOpenTasks) {
      currentTasks.open.push(...(JSON.parse(storedOpenTasks) as TaskType[]));
    }

    if (storedCompletedTasks) {
      currentTasks.completed.push(...(JSON.parse(storedCompletedTasks) as TaskType[]));
    }

    setTasks(currentTasks);
  }, []);

  const handleAddModalOpenClose = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const handleDelModalOpenClose = () => {
    setIsDelModalOpen(!isDelModalOpen);
  };

  return (
    <div className="page_container">
      <header className="header_container">
        <picture>
          <img src="logo.svg" alt="Logo da FocalPoint" />
        </picture>
        <h2 className="header_title">Bem-vindo de volta, Marcus</h2>
        <p className="header_date">Segunda, 01 de dezembro de 2025</p>
      </header>
      <main className="tasks_container">
        <p className="open_tasks_title">Suas tarefas de hoje</p>
        <ul className="open_tasks">
          {tasks.open.map((task, index) => (
            <TaskItem key={index} task={task} setSelectedTask={setSelectedTask} openDeleteModal={handleDelModalOpenClose} setTasks={setTasks} tasks={tasks} />
          ))}
        </ul>
        <p className="completed_tasks_title">Tarefas finalizadas</p>
        <ul className="completed_tasks">
          {tasks.completed.map((task, index) => (
            <TaskItem key={index} task={task} setSelectedTask={setSelectedTask} openDeleteModal={handleDelModalOpenClose} setTasks={setTasks} tasks={tasks} />
          ))}
        </ul>
      </main>
      <button className="new_task_button" onClick={handleAddModalOpenClose}>Adicionar nova tarefa</button>
      <NewTaskModal isModalOpen={isAddModalOpen} handleModalOpenClose={handleAddModalOpenClose} tasks={tasks} setTasks={setTasks} />
      <DeleteTaskModal isModalOpen={isDelModalOpen} handleModalOpenClose={handleDelModalOpenClose} tasks={tasks} setTasks={setTasks} selectedTask={selectedTask} setSelectedTask={setSelectedTask} />
    </div>
  );
}
