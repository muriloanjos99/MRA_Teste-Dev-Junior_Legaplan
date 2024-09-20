import { render, screen, fireEvent } from '@testing-library/react';
import NewTaskModal from '../components/newTaskModal/newTaskModal';
describe('O componente NewTaskModal', () => {
  const handleModalOpenClose = jest.fn();
  const setTasks = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Adiciona com sucesso uma nova tarefa', () => {
    const tasks = {
      open: [],
      completed: [],
    };

    render(
      <NewTaskModal
        isModalOpen={true}
        handleModalOpenClose={handleModalOpenClose}
        tasks={tasks}
        setTasks={setTasks}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Nova Tarefa' } });

    fireEvent.click(screen.getByText('Adicionar'));

    expect(setTasks).toHaveBeenCalledWith(expect.objectContaining({
      open: expect.arrayContaining([
        expect.objectContaining({ title: 'Nova Tarefa', done: false })
      ])
    }));

    expect(localStorage.getItem('open_tasks')).toContain('Nova Tarefa');
    expect(handleModalOpenClose).toHaveBeenCalled();
    expect(input.value).toBe('');
  });
});
