import s from "./SearchInput.module.css";
import { PropTypes } from "prop-types";

/* SearchInput */
export const SearchInput = ({ searchName, changValue }) => {
  return (
    <input
      type="text"
      className={s.input}
      placeholder="Filter by name..."
      onChange={changValue}
      value={searchName}
    ></input>
  );
};

SearchInput.propTypes = {
  searchName: PropTypes.string.isRequired,
  changValue: PropTypes.func.isRequired,
};
