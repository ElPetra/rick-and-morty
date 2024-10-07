import s from "./CardInfoPage.module.css";
import { Layout } from "../../layouts/Layout/Layout";
import { ButtonBack } from "../../ui/ButtonBack/ButtonBack";
import { ItemInfo } from "../../ui/ItemInfo/ItemInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtonUnLike } from "../../ui/ButtonUnLike/ButtonUnLike";
import { ButtonLike } from "../../ui/ButtonLike/ButtonLike";
import { useContext, useState } from "react";
import { FavoritesContext } from "../../app/providers/FavoritesProvider";
import { useSelector } from "react-redux";
export const CardInfoPage = (props) => {
  const { currentUser } = useSelector((state) => state.auth);
  const {
    state: { character, isLiked },
  } = useLocation();

  const [isFavorite, setIsFavorite] = useState(isLiked);

  const { toggleFavorite, favorites } = useContext(FavoritesContext);

  /* console.log(favorites); */

  const buttonHandler = () => {
    setIsFavorite(!isFavorite);
    toggleFavorite(isFavorite, character, character.id);
  };

  const navigate = useNavigate();

  return (
    <Layout>
      <section className={s.section}>
        <ButtonBack className={s.btnBack} onClick={() => navigate(-1)} />

        {/* В ИЗБРАННОМ? ДИЗЛАЙК. НЕ В ИЗБРАННОМ? ЛАЙК */}
        {currentUser &&
          (!isFavorite ? (
            <ButtonUnLike
              onClick={() => buttonHandler()}
              className={s.btnHeart}
            ></ButtonUnLike>
          ) : (
            <ButtonLike
              className={s.btnHeart}
              onClick={() => buttonHandler()}
            ></ButtonLike>
          ))}
        <img className={s.img} src={character.image} alt={character.name} />
        <p className={s.title}>{character.name}</p>
        <div className={s.info}>
          <p className={s.blocktitle}>{"Informations"}</p>
          <div className={s.itemWrapper}>
            <ItemInfo itemtitle={"Gender"} meaning={character.gender} />
            <ItemInfo itemtitle={"Status"} meaning={character.status} />
            <ItemInfo itemtitle={"Specie"} meaning={character.species} />
            <ItemInfo itemtitle={"Origin"} meaning={character.origin.name} />
            <ItemInfo
              itemtitle={"Type"}
              meaning={!character.type ? "unknown" : character.type}
            />
            <ItemInfo
              itemtitle={"Location"}
              meaning={character.location.name}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};
