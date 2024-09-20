import { render, screen, fireEvent } from '@testing-library/react';
import UserModal from '../components/userModal/userModal';

describe('O componente UserModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Salva o nome inserido pelo usuário', () => {
    const setUser = jest.fn();
    const handleUserModalOpenClose = jest.fn();

    render(
      <UserModal
        isModalOpen={true}
        setUser={setUser}
        handleUserModalOpenClose={handleUserModalOpenClose}
      />
    );

    const input = screen.getByPlaceholderText('Digite');
    fireEvent.change(input, { target: { value: 'Murilo' } });

    const loginButton = screen.getByText('Confirmar');
    fireEvent.click(loginButton);

    expect(setUser).toHaveBeenCalledWith('Murilo');
    expect(localStorage.getItem('focalpoint_user')).toBe('Murilo');
    expect(handleUserModalOpenClose).toHaveBeenCalled();
  });

  it('Remove o nome salvo pelo usuário caso este queira trocar', () => {
    const setUser = jest.fn();
    const handleUserModalOpenClose = jest.fn();

    render(
      <UserModal
        isModalOpen={true}
        user={"Murilo"}
        setUser={setUser}
        handleUserModalOpenClose={handleUserModalOpenClose}
      />
    );

    const changeUserButton = screen.getByText('Mudar usuário');
    fireEvent.click(changeUserButton);

    expect(setUser).toHaveBeenCalledWith(null);
    expect(localStorage.getItem('focalpoint_user')).toBe(null);
    expect(handleUserModalOpenClose).toHaveBeenCalled();
  });
});
