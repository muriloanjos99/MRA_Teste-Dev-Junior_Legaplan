"use client";

import { useEffect, useState } from "react";
import TaskItem from "@/components/taskItem/taskItem";
import NewTaskModal from "@/components/newTaskModal/newTaskModal";
import DeleteTaskModal from "@/components/deleteTaskModal/deleteTaskModal";
import TasksType from "@/types/tasksType";
import TaskType from "@/types/taskType";
import "./page.scss";
import UserModal from "@/components/userModal/userModal";

export default function Home() {
  const [tasks, setTasks] = useState<TasksType>({ open: [], completed: [] });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [user, setUser] = useState<string | null>(null);

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

    handleUserModalOpenClose();

    setTasks(currentTasks);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('focalpoint_user');

    if (storedUser) {
      setUser(storedUser);
    } else {
      handleUserModalOpenClose();
    }

  }, [user]);

  const handleAddModalOpenClose = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const handleDelModalOpenClose = () => {
    setIsDelModalOpen(!isDelModalOpen);
  };

  const handleUserModalOpenClose = () => {
    setIsUserModalOpen(!isUserModalOpen);
  };

  return (
    <div className="page_container">
      <header className="header_container">
        <picture>
          <img src="logo.svg" alt="Logo da FocalPoint" />
        </picture>
        <h2 className="header_title">{user ? `Bem-vindo de volta, ${user}` : "Bem-vindo!"}</h2>
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
      <UserModal isModalOpen={isUserModalOpen} handleUserModalOpenClose={handleUserModalOpenClose} user={user} setUser={setUser} />
    </div>
  );
}
