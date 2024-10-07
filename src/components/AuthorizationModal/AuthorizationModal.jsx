import { useNavigate } from "react-router-dom";
import s from "./AuthorizationModal.module.css";
import { useEffect } from "react";

export const AuthorizationModal = ({ setIsOpenModal }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const modalHandler = window.addEventListener("click", (e) => {
      if (e.target.className === s.modal) {
        setIsOpenModal(false);
      }
    });

    return () => {
      window.removeEventListener("click", modalHandler);
    };
  }, []);

  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <button onClick={() => navigate("/login")} className={s.btn}>
          Войти
        </button>
        <button onClick={() => navigate("/register")} className={s.btn}>
          Зарегистрироваться
        </button>

        <button onClick={() => setIsOpenModal(false)} className={s.btnClose}>
          X
        </button>
      </div>
    </div>
  );
};
