import { useEffect } from "react";
import s from "./LogOutModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";

export const LogOutModal = ({ setIsOpenLogOutModal }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    const modalHandler = window.addEventListener("click", (e) => {
      if (e.target.className === s.modal) {
        setIsOpenLogOutModal(false);
      }
    });
    return () => {
      window.removeEventListener("click", modalHandler);
    };
  }, []);

  const handleClick = () => {
    dispatch(logout());
    setIsOpenLogOutModal(false);

    navigate("/Rick-and-Morty");
  };

  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <p className={s.text}>Вы действительно хотите выйти?</p>
        <button className={s.btn} onClick={handleClick}>
          Выйти
        </button>

        <button className={s.btn} onClick={() => setIsOpenLogOutModal(false)}>
          Назад
        </button>

        <button
          onClick={() => setIsOpenLogOutModal(false)}
          className={s.btnClose}
        >
          X
        </button>
      </div>
    </div>
  );
};
