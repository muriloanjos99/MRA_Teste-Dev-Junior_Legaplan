import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../components/taskItem/taskItem';

describe('O componente TaskItem', () => {
  const setTasks = jest.fn();
  const openDeleteModal = jest.fn();

  const task1 = { id: 1, title: 'Tarefa 1', done: false };
  const task2 = { id: 1, title: 'Tarefa 2', done: true };

  const tasksOpen = {
    open: [task1],
    completed: [],
  };
  const tasksCompleted = {
    open: [],
    completed: [task2],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Finaliza uma ação aberta quando a checkbox é clicada', () => {
    render(
      <TaskItem
        task={task1}
        tasks={tasksOpen}
        setTasks={setTasks}
        openDeleteModal={openDeleteModal}
        setSelectedTask={jest.fn()}
      />
    );

    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(setTasks).toHaveBeenCalledWith(expect.objectContaining({
      open: [],
      completed: expect.arrayContaining([
        expect.objectContaining({ title: 'Tarefa 1', done: true })
      ])
    }));

    expect(localStorage.getItem('completed_tasks')).toContain('Tarefa 1');

    fireEvent.click(checkbox);

    expect(setTasks).toHaveBeenCalledWith(expect.objectContaining({
      open: expect.arrayContaining([
        expect.objectContaining({ title: 'Tarefa 1', done: false })
      ]),
      completed: []
    }));

    expect(localStorage.getItem('open_tasks')).toContain('Tarefa 1');
  });

  it('Reabre uma ação finalizada quando a checkbox é clicada', () => {
    render(
      <TaskItem
        task={task2}
        tasks={tasksCompleted}
        setTasks={setTasks}
        openDeleteModal={openDeleteModal}
        setSelectedTask={jest.fn()}
      />
    );

    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(setTasks).toHaveBeenCalledWith(expect.objectContaining({
      open: expect.arrayContaining([
        expect.objectContaining({ title: 'Tarefa 2', done: false })
      ]),
      completed: []
    }));

    expect(localStorage.getItem('open_tasks')).toContain('Tarefa 2');

    fireEvent.click(checkbox);

    expect(setTasks).toHaveBeenCalledWith(expect.objectContaining({
      open: [],
      completed: expect.arrayContaining([
        expect.objectContaining({ title: 'Tarefa 2', done: true })
      ])
    }));

    expect(localStorage.getItem('completed_tasks')).toContain('Tarefa 2');
  });
});
