import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const { currentUser } = useSelector((state) => state.auth);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    /* ЕСЛИ ПОЛЬЗОВАТЕЛЬ НЕ АВТОРИЗОВАН, СОСТОЯНИЕ FAVORITES = [] */
    if (!currentUser) {
      setFavorites([]);
    } else {
      /* ЕСЛИ ЮЗЕР АВТОРИЗОВАН, БЕРЕМ ИЗ LS */
      const favoritesDataFromLS = localStorage.getItem(
        `favoritesData|${currentUser.email}`
      );
      favoritesDataFromLS
        ? setFavorites(JSON.parse(favoritesDataFromLS))
        : setFavorites([]);
    }
  }, [currentUser]);

  /* СОХРАНЯЕМ В LS */
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        `favoritesData|${currentUser.email}`,
        JSON.stringify(favorites)
      );
    }
  }, [favorites]);

  const addToFavorites = (character) => {
    setFavorites([...favorites, character]);
  };

  const removeFromFavorites = (id) => {
    const filteredFavorites = favorites.filter(
      (character) => character.id !== id
    );
    setFavorites(filteredFavorites);
  };

  const toggleFavorite = (isFavorite, character, id) => {
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(character);
    }
  };

  const checkIsFavorite = (id) => {
    return favorites.some((character) => character.id === id);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    checkIsFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
