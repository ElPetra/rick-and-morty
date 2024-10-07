import { Link } from "react-router-dom";
import { Container } from "../../layouts/Container/Container";
import s from "./Header.module.css";
import logo from "./images/logo.png";
import heart from "../../ui/ButtonLike/like.png";
import { AuthorizationModal } from "../AuthorizationModal/AuthorizationModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LogOutModal } from "../LogOutModal/LogOutModal";

export const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenLogOutModal, setIsOpenLogOutModal] = useState(false);

  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isOpenModal || isOpenLogOutModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isOpenModal, isOpenLogOutModal]);

  return (
    <header className={s.header}>
      <Container className={s.container}>
        <Link to="/Rick-and-Morty">
          <img className={s.logo} src={logo} alt="logo" />
        </Link>

        {!currentUser ? (
          <button
            className={s.btn}
            onClick={(e) => {
              setIsOpenModal(true);
            }}
          >
            Авторизация
          </button>
        ) : (
          <button
            className={s.currentUser}
            onClick={(e) => {
              setIsOpenLogOutModal(true);
            }}
          >
            {currentUser?.username}
          </button>
        )}

        {isOpenModal && <AuthorizationModal setIsOpenModal={setIsOpenModal} />}
        {isOpenLogOutModal && (
          <LogOutModal setIsOpenLogOutModal={setIsOpenLogOutModal} />
        )}

        {currentUser && (
          <Link className={s.favorits} to="/favorites">
            Favorites
            <img src={heart} className={s.heart} alt="heart" />
          </Link>
        )}
      </Container>
    </header>
  );
};
