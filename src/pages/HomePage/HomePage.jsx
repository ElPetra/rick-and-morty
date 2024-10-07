import { useEffect, useState } from "react";
import { Layout } from "../../layouts/Layout/Layout";
import { Card } from "../../components/Card/Card";
import { SearchInput } from "../../ui/SearchInput/SearchInput";
import { Loader } from "../../ui/Loader/Loader";
import { useGetCharactersQuery } from "../../store/api/rickAndMortyApi";
import { useDebounce } from "../../hooks/useDebounce";
import s from "./HomePage.module.css";
import image from "./images/RaM.webp";
import imgError from "./images/rick-and-morty.png";

export const HomePage = () => {
  const [charactersData, setCharactersData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearchValue = useDebounce(searchValue, 300);

  /* ОТПРАВЛЯЕМ ЗАПРОС С QUERY */
  const { data, isError, isLoading, isFetching } = useGetCharactersQuery({
    name: debouncedSearchValue,
    species: speciesFilter,
    gender: genderFilter,
    status: statusFilter,
    page,
  });

  /*   console.log(data); */

  /* ПРИ ИЗМЕНИИ ФИЛЬТРОВ СБРАСЫВАЕМ МАССИВ С ДАННЫМИ, СТРАНИЦУ ПЕРЕВОДИМ В 1 */
  useEffect(() => {
    setCharactersData([]);
    setPage(1);
  }, [debouncedSearchValue, speciesFilter, genderFilter, statusFilter]);

  /* ПРИ ИЗМЕНЕНИИ ПОЛУЧАЕМЫХ ДАННЫХ, МЕНЯЕТ МАССИВ С ПЕРСОНАЖАМИ */
  useEffect(() => {
    if (data?.results) {
      setCharactersData((prevCharacters) => {
        return [...prevCharacters, ...data.results];
      });
    } else {
      setCharactersData([]);
    }
  }, [data]);

  /*   console.log(error); */

  /* ОБРАБОТКА ПАГИНАЦИИ */
  const handleLoadMore = () => {
    if (data.info.next) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <Layout className={s.container}>
        <button onClick={() => window.location.reload()}>
          <img className={s.image} src={image} alt="rick-and-morty" />
        </button>

        <div className={s.filters}>
          <SearchInput
            searchName={searchValue}
            changValue={(e) => setSearchValue(e.target.value)}
          ></SearchInput>

          <div className={s.selectStyle}>
            <select
              value={speciesFilter}
              onChange={(e) => setSpeciesFilter(e.target.value)}
            >
              <option value="">Species</option>
              <option value="human">Human</option>
              <option value="alien">Alien</option>
              <option value="Cronenberg">Cronenberg</option>
              <option value="Poopybutthole">Poopybutthole</option>
              <option value="Mythological Creature">
                Mythological Creature
              </option>
              <option value="Robot">Robot</option>
              <option value="Disease">Disease</option>
              <option value="Animal">Animal</option>
            </select>
          </div>
          <div className={s.selectStyle}>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              сlassName={s.selectStyle}
            >
              <option value="">Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div className={s.selectStyle}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              сlassName={s.select}
            >
              <option value="">Status</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>

        {isError && (
          <>
            <p className={s.error}>Ooops... Персонажи не найдены</p>
            <img src={imgError} className={s.imgError} alt="" />
          </>
        )}

        {isLoading ? (
          <div className={s.loader}>
            <Loader />
          </div>
        ) : (
          <div className={s.gridWrapper}>
            {charactersData?.map((character, index) => (
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
        )}
        {data?.info?.next && !isError && !isLoading && !isFetching && (
          <button className={s.button} onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </Layout>
    </>
  );
};
