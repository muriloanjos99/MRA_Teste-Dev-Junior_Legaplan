import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeleteTaskModal from '../components/deleteTaskModal/deleteTaskModal';

describe('O componente DeleteTaskModal', () => {
  const setTasks = jest.fn();
  const setSelectedTask = jest.fn();
  const handleModalOpenClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Não deleta nenhuma tarefa se a tarefa selecionada for null', () => {
    render(<DeleteTaskModal isModalOpen={true} selectedTask={null} setTasks={setTasks} handleModalOpenClose={handleModalOpenClose} />);

    const deleteButton = screen.getByText('Deletar');

    fireEvent.click(deleteButton);
    expect(setTasks).not.toHaveBeenCalled();
    expect(handleModalOpenClose).toHaveBeenCalled();
  });

  it('Deleta uma tarefa finalizada', () => {
    const mockTasks = {
      open: [],
      completed: [{ id: 1, title: 'Tarefa 2', done: true }]
    };
    const selectedTask = mockTasks.completed[0];
    localStorage.setItem('completed_tasks', JSON.stringify(mockTasks.completed));

    render(<DeleteTaskModal isModalOpen={true} selectedTask={selectedTask} setSelectedTask={setSelectedTask} tasks={mockTasks} setTasks={setTasks} handleModalOpenClose={handleModalOpenClose} />);
    const deleteButton = screen.getByText('Deletar');
    fireEvent.click(deleteButton);

    waitFor(() => {
      expect(localStorage.getItem('completed_tasks')).toBe('[]');
      expect(setTasks).toHaveBeenCalledWith({ open: [], completed: [] });
      expect(handleModalOpenClose).toHaveBeenCalled();
    });
  });

  it('Deelta uma tarefa em aberto', () => {
    const mockTasks = {
      open: [{ id: 1, title: 'Tarefa 1', done: false }],
      completed: []
    };

    const selectedTask = mockTasks.open[0];
    localStorage.setItem('open_tasks', JSON.stringify(mockTasks.open));

    render(<DeleteTaskModal isModalOpen={true} selectedTask={selectedTask} setSelectedTask={setSelectedTask} tasks={mockTasks} setTasks={setTasks} handleModalOpenClose={handleModalOpenClose} />);

    const deleteButton = screen.getByText('Deletar');
    fireEvent.click(deleteButton);

    waitFor(() => {
      expect(setTasks).toHaveBeenCalledWith({ open: [], completed: [] });
      expect(localStorage.getItem('open_tasks')).toBe('[]');
      expect(handleModalOpenClose).toHaveBeenCalled();
    });
  });
});
