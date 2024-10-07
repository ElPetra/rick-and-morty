import { useContext, useState } from "react";
import { Layout } from "../../layouts/Layout/Layout";
import { FavoritesContext } from "../../app/providers/FavoritesProvider";
import s from "./FavoritesPage.module.css";
import { Card } from "../../components/Card/Card";
import { ButtonBack } from "../../ui/ButtonBack/ButtonBack";
import { useNavigate } from "react-router-dom";

const INITIAL_VISIBLE_ITEMS = 8;
const ADD_VISIBLE_ITEMS = 8;

export const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);
  const [visibleItems, setVisibleItems] = useState(INITIAL_VISIBLE_ITEMS);
  const naigate = useNavigate();

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + ADD_VISIBLE_ITEMS);
  };

  return (
    <Layout>
      <div className={s.btn}>
        <ButtonBack onClick={() => naigate(-1)}></ButtonBack>
      </div>

      <div className={s.gridWrapper}>
        {favorites?.slice(0, visibleItems).map((character, index) => (
          <Card
            key={character.id + index + character.name}
            className={s.card}
            character={character}
            img={character.image}
            name={character.name}
            species={character.species}
            id={character.id}
          />
        ))}
      </div>

      {favorites.length > visibleItems && (
        <button className={s.button} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </Layout>
  );
};

export default FavoritesPage;
