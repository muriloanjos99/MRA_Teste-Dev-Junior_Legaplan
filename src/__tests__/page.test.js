import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../app/page.tsx';

describe('A página inicial', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Renderiza a mensagem "Bem-vindo!" caso o usuário não tenha inserido um nome', () => {
    render(<Home />);
    expect(screen.getByText('Bem-vindo!')).toBeInTheDocument();
  });

  test('Abre o modal de adição de tarefa quando o botão é clicado', () => {
    render(<Home />);
    fireEvent.click(screen.getByText('Adicionar nova tarefa'));
    expect(screen.getByText('Nova tarefa')).toBeInTheDocument();
  });

  test('Abre o modal para que o usuário insira seu nome se nenhum user foi inserido', () => {
    render(<Home />);
    expect(screen.getByText('Olá, seja bem-vindo!')).toBeInTheDocument();
  });

  test('Carrega as tarefas em aberto salvas no localStorage', () => {
    const tasks = [{ id: 1, title: 'Tarefa 1', done: false }];
    localStorage.setItem('open_tasks', JSON.stringify(tasks));

    render(<Home />);

    expect(screen.getByText(/Tarefa 1/i)).toBeInTheDocument();
  });

  test('Carrega as tarefas finalizadas salvas no localStorage', () => {
    const tasks = [{ id: 1, title: 'Tarefa 1', done: true }];
    localStorage.setItem('completed_tasks', JSON.stringify(tasks));

    render(<Home />);

    expect(screen.getByText(/Tarefa 1/i)).toBeInTheDocument();
  });

  it('Carrega o nome de usuário salvo no localStorage', () => {
    const user = 'Murilo';
    localStorage.setItem('focalpoint_user', user);

    render(<Home />);

    expect(screen.getByText(`Bem-vindo de volta, ${user}`)).toBeInTheDocument();
  });

  it('Abre e fecha o model de exclusão de tarefa quando o botão é clicado', () => {
    const tasks = [{ id: 1, title: 'Tarefa 1', done: false }];
    localStorage.setItem('open_tasks', JSON.stringify(tasks));

    render(<Home />);

    expect(screen.queryByText('Deletar tarefa')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('delete_icon'));
    expect(screen.getByText('Deletar tarefa')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('del_cancel_btn'));
    expect(screen.queryByText('Título')).not.toBeInTheDocument();
  });
});
