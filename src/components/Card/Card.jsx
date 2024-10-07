import { useContext, useEffect, useState } from "react";
import { ButtonUnLike } from "../../ui/ButtonUnLike/ButtonUnLike";
import s from "./Card.module.css";
import { FavoritesContext } from "../../app/providers/FavoritesProvider";
import { ButtonLike } from "../../ui/ButtonLike/ButtonLike";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";

export const Card = ({ img, name, species, id, character }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { checkIsFavorite, toggleFavorite } = useContext(FavoritesContext);

  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(checkIsFavorite(id));
  }, []);

  const buttonHandler = () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      setIsFavorite(!isFavorite);
      toggleFavorite(isFavorite, character, character.id);
    }
  };

  return (
    <div className={s.card}>
      {currentUser &&
        (isFavorite ? (
          <ButtonLike onClick={() => buttonHandler()} className={s.button} />
        ) : (
          <ButtonUnLike onClick={() => buttonHandler()} className={s.button} />
        ))}

      <Link
        to={`/character/${id}`}
        state={{ character: character, isLiked: isFavorite }}
      >
        <article className={s.article}>
          <img className={s.img} src={img} alt={img} />
          <div className={s.articleBottom}>
            <p className={s.name}>{name}</p>
            <p className={s.species}>{species}</p>
          </div>
        </article>
      </Link>
    </div>
  );
};

Card.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  species: PropTypes.string,
  id: PropTypes.number,
  character: PropTypes.object,
};
