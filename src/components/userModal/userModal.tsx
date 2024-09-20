import { Dispatch, SetStateAction, useState } from "react";
import "./userModal.scss";

type UserModalProps = {
  handleUserModalOpenClose: () => void;
  isModalOpen: boolean;
  setUser: Dispatch<SetStateAction<string | null>>;
  user: string | null;
};

export default function UserModal({
  isModalOpen,
  handleUserModalOpenClose,
  setUser,
  user
}: UserModalProps) {
  const [name, setName] = useState<string>("");

  const handleLogin = () => {
    setUser(name);
    localStorage.setItem("focalpoint_user", name);
    handleUserModalOpenClose();
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("focalpoint_user");
    handleUserModalOpenClose();
  }

  return (
    <>
      {isModalOpen && (
        <div className="user_modal_container">
          <div className="user_modal" tabIndex={-1}>
            <p className="user_modal_title">Olá, seja bem-vindo!</p>
            {
              user ? (
                <>
                  <div className="user_modal_content" style={{ justifyContent: "center" }}>
                    <p className="name_input_label">Deseja continuar como &quot;{user}&quot;?</p>
                  </div>
                  <div className="user_modal_footer">
                    <button type="button" className="deny_button" onClick={handleLogout}>
                      Mudar usuário
                    </button>
                    <button type="button" className="confirm_button" onClick={handleUserModalOpenClose}>
                      Confirmar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="user_modal_content">
                    <p className="name_input_label">Qual o seu nome?</p>
                    <input
                      type="text"
                      className="name_input"
                      placeholder="Digite"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="user_modal_footer">
                    <button type="button" className="cancel_button" onClick={handleUserModalOpenClose}>
                      Cancelar
                    </button>
                    <button type="button" className="confirm_button" onClick={handleLogin}>
                      Confirmar
                    </button>
                  </div>
                </>
              )
            }
          </div >
        </div >
      )
      }
    </>
  );
}
