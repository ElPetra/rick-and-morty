import { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {


  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favoritesData");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });


  useEffect(() => {
    localStorage.setItem("favoritesData", JSON.stringify(favorites));
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
